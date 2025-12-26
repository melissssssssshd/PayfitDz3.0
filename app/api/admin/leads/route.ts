import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { AdminLeadService } from "@/domains/admin/services/lead.service"
import { hasPermission } from "@/lib/policies"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
    try {
        const context = await getUniverseContext()
        
        if (!context) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Vérifier la permission
        if (!hasPermission(context, "leads:read:all")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { searchParams } = new URL(req.url)
        const status = searchParams.get("status") || undefined
        const search = searchParams.get("search") || undefined

        const leads = await AdminLeadService.getAllLeads(context, {
            status,
            search,
        })

        return NextResponse.json(leads)
    } catch (error: any) {
        console.error("Fetch leads error:", error)
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: error.message }, { status: 403 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
