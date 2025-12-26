import { NextResponse } from "next/server"
import { getUniverseContext } from "@/lib/universe-middleware"
import { PayrollService } from "@/domains/hr-payroll/services/payroll.service"
import { hasPermission } from "@/lib/policies"

export const dynamic = "force-dynamic"

// GET client account info for logged-in client
export async function GET(req: Request) {
    const context = await getUniverseContext()

    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "payroll:read")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const [clientAccount, tenant] = await Promise.all([
            PayrollService.getClientAccount(context),
            PayrollService.getTenant(context),
        ])

        return NextResponse.json({
            clientAccount,
            tenant,
        })
    } catch (error: any) {
        console.error("Failed to fetch client data:", error)
        if (error.message?.includes("Unauthorized") || error.message?.includes("Tenant ID required")) {
            return NextResponse.json({ error: error.message }, { status: 403 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
