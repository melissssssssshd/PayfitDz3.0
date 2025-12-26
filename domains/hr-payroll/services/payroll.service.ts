/**
 * HR & Payroll Domain - Payroll Service
 * 
 * Services métier pour la gestion de la paie dans l'univers HR_PAYROLL
 */

import { prisma } from "@/lib/prisma"
import { PolicyContext } from "@/lib/policies"
import { Universe } from "@/lib/universe"

export class PayrollService {
    /**
     * Récupère les informations du compte client
     */
    static async getClientAccount(context: PolicyContext) {
        if (context.universe !== Universe.HR_PAYROLL) {
            throw new Error("Unauthorized: HR_PAYROLL access required")
        }

        if (!context.tenantId) {
            throw new Error("Tenant ID required")
        }

        return prisma.clientAccount.findUnique({
            where: {
                userId: context.userId,
            },
            include: {
                lead: true,
            },
        })
    }

    /**
     * Récupère les informations du tenant
     */
    static async getTenant(context: PolicyContext) {
        if (context.universe !== Universe.HR_PAYROLL) {
            throw new Error("Unauthorized: HR_PAYROLL access required")
        }

        if (!context.tenantId) {
            throw new Error("Tenant ID required")
        }

        return prisma.tenant.findUnique({
            where: { id: context.tenantId },
            include: {
                subscriptions: true,
            },
        })
    }
}


