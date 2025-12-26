import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get("Stripe-Signature") as string

    let event: any

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    const session = event.data.object as any

    if (event.type === "checkout.session.completed") {
        const tenantId = session.metadata.tenantId
        const subscriptionId = session.subscription as string
        const customerId = session.customer as string

        // Update Subscription in DB
        const subscription = (await stripe.subscriptions.retrieve(subscriptionId)) as any

        await prisma.subscription.create({
            data: {
                tenantId: tenantId,
                stripeSubscriptionId: subscriptionId,
                stripeCustomerId: customerId,
                planType: (subscription.items.data[0].price as any).nickname || "UNKNOWN",
                status: "ACTIVE",
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            }
        })

        // Update Tenant Status
        await prisma.tenant.update({
            where: { id: tenantId },
            data: { status: "ACTIVE" }
        })
    }

    return NextResponse.json({ received: true })
}
