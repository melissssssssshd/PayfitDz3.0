import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { SupportLeadService } from "@/domains/support/services/lead.service"
import { hasPermission } from "@/lib/policies"

export const dynamic = "force-dynamic"

// GET closed leads ready for onboarding
export async function GET(req: Request) {
    const context = await getUniverseContext()

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "leads:read:all")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const leads = await SupportLeadService.getLeadsForOnboarding(context)
        return NextResponse.json(leads)
    } catch (error: any) {
        console.error("Failed to fetch closed leads:", error)
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: error.message }, { status: 403 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
