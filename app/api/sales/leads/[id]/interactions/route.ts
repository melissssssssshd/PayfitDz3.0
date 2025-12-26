import { NextRequest, NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { CrmLeadService } from "@/domains/crm/services/lead.service"
import { hasPermission } from "@/lib/policies"

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const context = await getUniverseContext()

        if (!context) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        if (!hasPermission(context, "leads:read:assigned")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { id: leadId } = await params

        const interactions = await CrmLeadService.getInteractions(context, leadId)

        return NextResponse.json(interactions)
    } catch (error: any) {
        console.error("Error fetching interactions:", error)
        if (error.message?.includes("Unauthorized") || error.message?.includes("non trouvé")) {
            return NextResponse.json(
                { error: error.message },
                { status: error.message.includes("Unauthorized") ? 403 : 404 }
            )
        }
        return NextResponse.json(
            { error: "Erreur lors de la récupération des interactions" },
            { status: 500 }
        )
    }
}

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
        const { type, content } = await req.json()

        if (!type || !content) {
            return NextResponse.json(
                { error: "Le type et le contenu sont requis" },
                { status: 400 }
            )
        }

        const interaction = await CrmLeadService.createInteraction(
            context,
            leadId,
            type,
            content
        )

        return NextResponse.json(interaction)
    } catch (error: any) {
        console.error("Error creating interaction:", error)
        if (error.message?.includes("Unauthorized") || error.message?.includes("non trouvé")) {
            return NextResponse.json(
                { error: error.message },
                { status: error.message.includes("Unauthorized") ? 403 : 404 }
            )
        }
        return NextResponse.json(
            { error: "Erreur lors de la création de l'interaction" },
            { status: 500 }
        )
    }
}
