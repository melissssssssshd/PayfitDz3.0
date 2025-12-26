import { NextRequest, NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { CrmLeadService } from "@/domains/crm/services/lead.service"
import { hasPermission } from "@/lib/policies"

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const context = await getUniverseContext()

        if (!context) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        if (!hasPermission(context, "leads:write")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { id: leadId } = await params
        const { status } = await req.json()

        if (!status) {
            return NextResponse.json(
                { error: "Le statut est requis" },
                { status: 400 }
            )
        }

        const updatedLead = await CrmLeadService.updateStatus(
            context,
            leadId,
            status
        )

        return NextResponse.json(updatedLead)
    } catch (error: any) {
        console.error("Error updating lead status:", error)
        if (error.message?.includes("Unauthorized") || error.message?.includes("non trouvé")) {
            return NextResponse.json(
                { error: error.message },
                { status: error.message.includes("Unauthorized") ? 403 : 404 }
            )
        }
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour du statut" },
            { status: 500 }
        )
    }
}
