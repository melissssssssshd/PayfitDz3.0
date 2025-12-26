import { NextRequest, NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { CrmLeadService } from "@/domains/crm/services/lead.service"

export async function GET(req: NextRequest) {
    try {
        const context = await getUniverseContext()

        if (!context) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        const stats = await CrmLeadService.getStats(context)

        return NextResponse.json({
            totalLeads: stats.total,
            newLeads: stats.newLeads,
            contactedLeads: stats.contacted,
            demoScheduledLeads: stats.demoScheduled,
            demoDoneLeads: stats.demoDone,
            closedLeads: stats.closed,
            lostLeads: stats.lost,
            conversionRate: stats.conversionRate,
            avgDaysToDemo: stats.avgDaysToDemo,
            demosThisMonth: stats.demosThisMonth,
        })
    } catch (error: any) {
        console.error("Error fetching sales stats:", error)
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: error.message }, { status: 403 })
        }
        return NextResponse.json(
            { error: "Erreur lors de la récupération des statistiques" },
            { status: 500 }
        )
    }
}
