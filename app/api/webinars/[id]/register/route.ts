import { NextResponse } from "next/server"
import { WebinarService } from "@/domains/crm/services/webinar.service"

export const dynamic = "force-dynamic"

// POST - Inscrire un lead à un webinar
export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: webinarId } = await params
        const body = await req.json()
        const { leadId } = body

        if (!leadId) {
            return NextResponse.json(
                { error: "leadId is required" },
                { status: 400 }
            )
        }

        const registration = await WebinarService.registerLeadToWebinar(leadId, webinarId)

        return NextResponse.json(registration, { status: 201 })
    } catch (error: any) {
        console.error("Error registering lead to webinar:", error)
        if (error.message?.includes("not found") || error.message?.includes("already registered")) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}


