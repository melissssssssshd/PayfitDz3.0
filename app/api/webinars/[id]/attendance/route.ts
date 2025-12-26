import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { WebinarService } from "@/domains/crm/services/webinar.service"
import { hasPermission } from "@/lib/policies"

export const dynamic = "force-dynamic"

// POST - Marquer la présence d'un participant
export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const context = await getUniverseContext()

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "leads:write")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const { id: registrationId } = await params
        const body = await req.json()
        const { questionsAsked, pollResponses } = body

        const registration = await WebinarService.markAttendance(registrationId, {
            questionsAsked,
            pollResponses,
        })

        return NextResponse.json(registration)
    } catch (error: any) {
        console.error("Error marking attendance:", error)
        if (error.message?.includes("not found")) {
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}


