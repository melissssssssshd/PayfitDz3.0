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

        const notes = await CrmLeadService.getNotes(context, leadId)

        return NextResponse.json(notes)
    } catch (error: any) {
        console.error("Error fetching notes:", error)
        if (error.message?.includes("Unauthorized") || error.message?.includes("non trouvé")) {
            return NextResponse.json(
                { error: error.message },
                { status: error.message.includes("Unauthorized") ? 403 : 404 }
            )
        }
        return NextResponse.json(
            { error: "Erreur lors de la récupération des notes" },
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
        const { content } = await req.json()

        if (!content || content.trim() === "") {
            return NextResponse.json(
                { error: "Le contenu de la note est requis" },
                { status: 400 }
            )
        }

        const note = await CrmLeadService.createNote(context, leadId, content)

        return NextResponse.json(note)
    } catch (error: any) {
        console.error("Error creating note:", error)
        if (error.message?.includes("Unauthorized") || error.message?.includes("non trouvé")) {
            return NextResponse.json(
                { error: error.message },
                { status: error.message.includes("Unauthorized") ? 403 : 404 }
            )
        }
        return NextResponse.json(
            { error: "Erreur lors de la création de la note" },
            { status: 500 }
        )
    }
}
