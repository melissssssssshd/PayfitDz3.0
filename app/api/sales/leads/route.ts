import { NextRequest, NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { CrmLeadService } from "@/domains/crm/services/lead.service"
import { hasPermission } from "@/lib/policies"

export async function GET(req: NextRequest) {
    try {
        const context = await getUniverseContext()

        if (!context) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        if (!hasPermission(context, "leads:read:assigned")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { searchParams } = new URL(req.url)

        // Get filter parameters
        const status = searchParams.get("status") || undefined
        const wilaya = searchParams.get("wilaya") || undefined
        const minScore = searchParams.get("minScore")
            ? parseInt(searchParams.get("minScore")!)
            : undefined
        const maxScore = searchParams.get("maxScore")
            ? parseInt(searchParams.get("maxScore")!)
            : undefined
        const search = searchParams.get("search") || undefined

        const leads = await CrmLeadService.getAssignedLeads(context, {
            status,
            wilaya,
            minScore,
            maxScore,
            search,
        })

        return NextResponse.json(leads)
    } catch (error: any) {
        console.error("Error fetching leads:", error)
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: error.message }, { status: 403 })
        }
        return NextResponse.json(
            { error: "Erreur lors de la récupération des leads" },
            { status: 500 }
        )
    }
}
