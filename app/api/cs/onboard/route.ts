import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { SupportLeadService } from "@/domains/support/services/lead.service"
import { hasPermission } from "@/lib/policies"

export const dynamic = "force-dynamic"

// POST to create client account from onboarding
export async function POST(req: Request) {
    const context = await getUniverseContext()

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "tenants:write")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const body = await req.json()
        const {
            companyName,
            siret,
            rc,
            address,
            wilaya,
            sector,
            size,
            adminName,
            adminEmail,
            adminPassword,
            leadId,
        } = body

        const result = await SupportLeadService.onboardClient(context, {
            companyName,
            siret,
            rc,
            address,
            wilaya,
            sector,
            size,
            adminName,
            adminEmail,
            adminPassword,
            leadId,
        })

        return NextResponse.json({
            success: true,
            ...result,
        })
    } catch (error: any) {
        console.error("Failed to onboard client:", error)
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: error.message }, { status: 403 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
