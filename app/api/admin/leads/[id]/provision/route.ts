import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { SupportLeadService } from "@/domains/support/services/lead.service"
import { hasPermission } from "@/lib/policies"
import { prisma } from "@/lib/prisma"

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const context = await getUniverseContext()
    const { id } = await params

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "leads:provision")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const lead = await prisma.lead.findUnique({
            where: { id },
        })

        if (!lead) {
            return NextResponse.json({ error: "Lead not found" }, { status: 404 })
        }

        if (lead.convertedTenantId) {
            return NextResponse.json({ error: "Lead already provisioned" }, { status: 400 })
        }

        const tenant = await SupportLeadService.provisionTenant(context, id, {
            name: lead.companyName,
            siret: undefined,
            domain: undefined,
        })

        return NextResponse.json({
            success: true,
            tenantId: tenant.id,
            adminEmail: lead.email,
        })
    } catch (error: any) {
        console.error("Provisioning error:", error)
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: error.message }, { status: 403 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
