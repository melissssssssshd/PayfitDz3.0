import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { hasPermission } from "@/lib/policies"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

// GET all sales users for assignment dropdown
export async function GET(req: Request) {
    const context = await getUniverseContext()

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "users:read")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const salesUsers = await prisma.user.findMany({
            where: {
                appRole: "SALES",
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                name: "asc",
            },
        })

        return NextResponse.json(salesUsers)
    } catch (error) {
        console.error("Failed to fetch sales users:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
