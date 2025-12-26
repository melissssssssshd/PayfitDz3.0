import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { AdminLeadService } from "@/domains/admin/services/lead.service"
import { hasPermission } from "@/lib/policies"

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const context = await getUniverseContext()
    const { id } = await params

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "leads:approve")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const lead = await AdminLeadService.approveLead(context, id)
        return NextResponse.json({
            message: "Lead approved successfully",
            lead,
        })
    } catch (error: any) {
        console.error("Lead approval error:", error)
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: error.message }, { status: 403 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
