import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { WebinarService } from "@/domains/crm/services/webinar.service"
import { hasPermission } from "@/lib/policies"

export const dynamic = "force-dynamic"

// GET - Liste des webinars à venir
export async function GET(req: Request) {
    try {
        const webinars = await WebinarService.getUpcomingWebinars()
        return NextResponse.json(webinars)
    } catch (error: any) {
        console.error("Error fetching webinars:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

// POST - Créer un nouveau webinar
export async function POST(req: Request) {
    const context = await getUniverseContext()

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "leads:write")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const body = await req.json()
        const { title, description, scheduledAt, duration, platform, meetingLink } = body

        if (!title || !scheduledAt || !platform) {
            return NextResponse.json(
                { error: "Title, scheduledAt and platform are required" },
                { status: 400 }
            )
        }

        const webinar = await WebinarService.createWebinar(context, {
            title,
            description,
            scheduledAt: new Date(scheduledAt),
            duration,
            platform,
            meetingLink,
        })

        return NextResponse.json(webinar, { status: 201 })
    } catch (error: any) {
        console.error("Error creating webinar:", error)
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: error.message }, { status: 403 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}


