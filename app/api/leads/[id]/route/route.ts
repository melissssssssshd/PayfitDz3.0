import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { LeadRoutingService } from "@/domains/crm/services/lead-routing.service"
import { hasPermission } from "@/lib/policies"

export const dynamic = "force-dynamic"

// POST - Router un lead automatiquement
export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const context = await getUniverseContext()

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "leads:assign")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const { id: leadId } = await params

        const result = await LeadRoutingService.routeLead(leadId)

        return NextResponse.json(result)
    } catch (error: any) {
        console.error("Error routing lead:", error)
        if (error.message?.includes("not found")) {
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}


