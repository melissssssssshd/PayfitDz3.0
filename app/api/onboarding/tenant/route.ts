import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { hasPermission } from "@/lib/policies"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request) {
    try {
        const context = await getUniverseContext()
        
        if (!context) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (!context.tenantId) {
            return NextResponse.json({ error: "No tenant associated" }, { status: 400 })
        }

        // Vérifier la permission pour modifier le tenant
        if (!hasPermission(context, "tenants:write")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { status, modules, siret, rc, address, sector, size } = await req.json()

        const tenant = await prisma.tenant.update({
            where: { id: context.tenantId },
            data: {
                status,
                modules,
                siret,
                rc,
                address,
                sector,
                size,
            },
        })

        return NextResponse.json(tenant)
    } catch (error) {
        console.error("Update tenant error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
