import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { hasPermission } from "@/lib/policies"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    const context = await getUniverseContext()

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Seuls les clients peuvent créer un checkout
    if (!hasPermission(context, "payroll:read")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const { planId } = await req.json() // e.g., 'price_starter_monthly'

        const tenantId = context.tenantId
        if (!tenantId) {
            return NextResponse.json({ error: "No tenant found for user" }, { status: 400 })
        }

        const tenant = await prisma.tenant.findUnique({
            where: { id: tenantId },
            include: { subscriptions: true }
        })

        if (!tenant) {
            return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
        }

        // Récupérer l'email depuis la session (nécessite getServerSession pour l'email)
        const { getServerSession } = await import("next-auth")
        const { authOptions } = await import("@/lib/auth")
        const session = await getServerSession(authOptions)

        // Create Stripe Checkout Session
        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer_email: session?.user?.email || undefined,
            line_items: [
                {
                    price: planId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXTAUTH_URL}/dashboard/abonnement/confirmation?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/abonnement`,
            metadata: {
                tenantId: tenantId,
            },
        })

        return NextResponse.json({ url: checkoutSession.url })
    } catch (error) {
        console.error("Stripe Checkout Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
