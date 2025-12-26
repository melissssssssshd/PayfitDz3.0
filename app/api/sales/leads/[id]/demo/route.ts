import { NextRequest, NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { CrmLeadService } from "@/domains/crm/services/lead.service"
import { hasPermission } from "@/lib/policies"

export async function POST(
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
        const { demoDate, meetingLink } = await req.json()

        if (!demoDate) {
            return NextResponse.json(
                { error: "La date de démo est requise" },
                { status: 400 }
            )
        }

        const updatedLead = await CrmLeadService.scheduleDemo(
            context,
            leadId,
            new Date(demoDate),
            meetingLink
        )

        return NextResponse.json(updatedLead)
    } catch (error: any) {
        console.error("Error scheduling demo:", error)
        if (error.message?.includes("Unauthorized") || error.message?.includes("non trouvé")) {
            return NextResponse.json(
                { error: error.message },
                { status: error.message.includes("Unauthorized") ? 403 : 404 }
            )
        }
        return NextResponse.json(
            { error: "Erreur lors de la planification de la démo" },
            { status: 500 }
        )
    }
}

export async function DELETE(
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

        const updatedLead = await CrmLeadService.cancelDemo(context, leadId)

        return NextResponse.json(updatedLead)
    } catch (error: any) {
        console.error("Error canceling demo:", error)
        if (error.message?.includes("Unauthorized") || error.message?.includes("non trouvé")) {
            return NextResponse.json(
                { error: error.message },
                { status: error.message.includes("Unauthorized") ? 403 : 404 }
            )
        }
        return NextResponse.json(
            { error: "Erreur lors de l'annulation de la démo" },
            { status: 500 }
        )
    }
}
