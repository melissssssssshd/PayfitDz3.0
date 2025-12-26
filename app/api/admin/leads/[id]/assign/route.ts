import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { AdminLeadService } from "@/domains/admin/services/lead.service"
import { hasPermission } from "@/lib/policies"

export const dynamic = "force-dynamic"

// PATCH to assign lead to sales user
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const context = await getUniverseContext()
    const { id } = await params

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "leads:assign")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const body = await req.json()
        const { assignedToId } = body

        const updatedLead = await AdminLeadService.assignLead(
            context,
            id,
            assignedToId
        )

        return NextResponse.json(updatedLead)
    } catch (error: any) {
        console.error("Failed to assign lead:", error)
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: error.message }, { status: 403 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
