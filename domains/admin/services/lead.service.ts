/**
 * Admin Domain - Lead Service
 * 
 * Services métier pour la gestion des leads dans l'univers ADMIN_CORE
 */

import { prisma } from "@/lib/prisma"
import { PolicyContext } from "@/lib/policies"
import { Universe } from "@/lib/universe"

export class AdminLeadService {
    /**
     * Récupère tous les leads (vue globale admin)
     */
    static async getAllLeads(context: PolicyContext, filters?: {
        status?: string
        search?: string
    }) {
        // Vérification que l'utilisateur est dans l'univers ADMIN_CORE
        if (context.universe !== Universe.ADMIN_CORE) {
            throw new Error("Unauthorized: Admin access required")
        }

        const where: any = {}

        if (filters?.status && filters.status !== "ALL") {
            where.status = filters.status
        }

        if (filters?.search) {
            where.OR = [
                { firstName: { contains: filters.search, mode: "insensitive" } },
                { lastName: { contains: filters.search, mode: "insensitive" } },
                { companyName: { contains: filters.search, mode: "insensitive" } },
                { email: { contains: filters.search, mode: "insensitive" } },
            ]
        }

        return prisma.lead.findMany({
            where,
            include: {
                assignedTo: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                notes: {
                    orderBy: { createdAt: "desc" },
                    take: 3,
                },
                interactions: {
                    orderBy: { createdAt: "desc" },
                    take: 5,
                },
            },
            orderBy: { createdAt: "desc" },
        })
    }

    /**
     * Approuve un lead (action admin uniquement)
     */
    static async approveLead(context: PolicyContext, leadId: string) {
        if (context.universe !== Universe.ADMIN_CORE) {
            throw new Error("Unauthorized: Admin access required")
        }

        return prisma.lead.update({
            where: { id: leadId },
            data: {
                status: "CLOSED",
            },
        })
    }

    /**
     * Assigne un lead à un commercial
     */
    static async assignLead(
        context: PolicyContext,
        leadId: string,
        userId: string
    ) {
        if (context.universe !== Universe.ADMIN_CORE) {
            throw new Error("Unauthorized: Admin access required")
        }

        return prisma.lead.update({
            where: { id: leadId },
            data: {
                assignedToId: userId,
            },
        })
    }
}


