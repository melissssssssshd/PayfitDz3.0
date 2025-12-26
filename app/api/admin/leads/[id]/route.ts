import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    try {
        const { status } = await req.json()
        const lead = await prisma.lead.update({
            where: { id },
            data: { status },
        })
        return NextResponse.json(lead)
    } catch (error) {
        console.error("Update lead error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
