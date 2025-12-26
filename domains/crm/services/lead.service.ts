/**
 * CRM Domain - Lead Service
 * 
 * Services métier pour la gestion des leads dans l'univers CRM
 */

import { prisma } from "@/lib/prisma"
import { PolicyContext } from "@/lib/policies"
import { Universe } from "@/lib/universe"

export class CrmLeadService {
    /**
     * Récupère les leads assignés au commercial
     */
    static async getAssignedLeads(context: PolicyContext, filters?: {
        status?: string
        wilaya?: string
        minScore?: number
        maxScore?: number
        search?: string
    }) {
        // Vérification que l'utilisateur est dans l'univers CRM
        if (context.universe !== Universe.CRM) {
            throw new Error("Unauthorized: CRM access required")
        }

        const where: any = {
            assignedToId: context.userId,
        }

        if (filters?.status && filters.status !== "ALL") {
            where.status = filters.status
        }

        if (filters?.wilaya) {
            where.wilaya = filters.wilaya
        }

        if (filters?.minScore || filters?.maxScore) {
            where.score = {}
            if (filters.minScore) where.score.gte = filters.minScore
            if (filters.maxScore) where.score.lte = filters.maxScore
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
                notes: {
                    orderBy: { createdAt: "desc" },
                    take: 3,
                    include: {
                        author: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
                interactions: {
                    orderBy: { createdAt: "desc" },
                    take: 5,
                    include: {
                        author: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })
    }

    /**
     * Récupère les statistiques du commercial
     */
    static async getStats(context: PolicyContext) {
        if (context.universe !== Universe.CRM) {
            throw new Error("Unauthorized: CRM access required")
        }

        const [total, newLeads, contacted, demoScheduled, demoDone, closed, lost] = await Promise.all([
            prisma.lead.count({
                where: { assignedToId: context.userId },
            }),
            prisma.lead.count({
                where: { assignedToId: context.userId, status: "NEW" },
            }),
            prisma.lead.count({
                where: { assignedToId: context.userId, status: "CONTACTED" },
            }),
            prisma.lead.count({
                where: { assignedToId: context.userId, status: "DEMO_SCHEDULED" as any },
            }),
            prisma.lead.count({
                where: { assignedToId: context.userId, status: "DEMO_DONE" },
            }),
            prisma.lead.count({
                where: { assignedToId: context.userId, status: "CLOSED" },
            }),
            prisma.lead.count({
                where: { assignedToId: context.userId, status: "LOST" as any },
            }),
        ])

        // Calcul du taux de conversion (CLOSED / total)
        const conversionRate = total > 0 ? ((closed / total) * 100).toFixed(1) : "0.0"

        // Calcul du délai moyen avant démo (pour les leads avec démo planifiée ou réalisée)
        const leadsWithDemo = await prisma.lead.findMany({
            where: {
                assignedToId: context.userId,
                demoDate: { not: null },
            },
            select: {
                createdAt: true,
                demoDate: true,
            },
        })

        let avgDaysToDemo = 0
        if (leadsWithDemo.length > 0) {
            const totalDays = leadsWithDemo.reduce((sum, lead) => {
                if (lead.demoDate) {
                    const days = Math.floor(
                        (new Date(lead.demoDate).getTime() - new Date(lead.createdAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                    )
                    return sum + days
                }
                return sum
            }, 0)
            avgDaysToDemo = Math.round(totalDays / leadsWithDemo.length)
        }

        // Nombre de démos réalisées ce mois
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const demosThisMonth = await prisma.lead.count({
            where: {
                assignedToId: context.userId,
                status: "DEMO_DONE",
                updatedAt: {
                    gte: startOfMonth,
                },
            },
        })

        return {
            total,
            newLeads,
            contacted,
            demoScheduled,
            demoDone,
            closed,
            lost,
            conversionRate,
            avgDaysToDemo,
            demosThisMonth,
        }
    }

    /**
     * Vérifie qu'un lead est assigné à l'utilisateur
     */
    static async verifyLeadAssignment(
        context: PolicyContext,
        leadId: string
    ) {
        if (context.universe !== Universe.CRM) {
            throw new Error("Unauthorized: CRM access required")
        }

        const lead = await prisma.lead.findFirst({
            where: {
                id: leadId,
                assignedToId: context.userId,
            },
        })

        if (!lead) {
            throw new Error("Lead non trouvé ou non assigné")
        }

        return lead
    }

    /**
     * Planifie une démo pour un lead
     */
    static async scheduleDemo(
        context: PolicyContext,
        leadId: string,
        demoDate: Date,
        meetingLink?: string
    ) {
        await this.verifyLeadAssignment(context, leadId)

        const updatedLead = await prisma.lead.update({
            where: { id: leadId },
            data: {
                demoDate,
                status: "DEMO_SCHEDULED",
                lastInteraction: new Date(),
                metadata: meetingLink ? { meetingLink } : undefined,
            } as any,
        })

        await prisma.leadInteraction.create({
            data: {
                leadId,
                type: "DEMO",
                content: `Démo planifiée pour le ${demoDate.toLocaleString("fr-FR")}${meetingLink ? ` - Lien: ${meetingLink}` : ""}`,
                createdBy: context.userId,
            },
        })

        return updatedLead
    }

    /**
     * Marque une démo comme réalisée
     */
    static async markDemoDone(
        context: PolicyContext,
        leadId: string,
        debrief: string
    ) {
        await this.verifyLeadAssignment(context, leadId)

        const updatedLead = await prisma.lead.update({
            where: { id: leadId },
            data: {
                status: "DEMO_DONE",
                lastInteraction: new Date(),
            },
        })

        await prisma.leadInteraction.create({
            data: {
                leadId,
                type: "DEMO",
                content: `Démo réalisée. Compte-rendu: ${debrief}`,
                createdBy: context.userId,
            },
        })

        return updatedLead
    }

    /**
     * Annule une démo
     */
    static async cancelDemo(context: PolicyContext, leadId: string) {
        await this.verifyLeadAssignment(context, leadId)

        const updatedLead = await prisma.lead.update({
            where: { id: leadId },
            data: {
                demoDate: null,
                lastInteraction: new Date(),
            },
        })

        await prisma.leadInteraction.create({
            data: {
                leadId,
                type: "DEMO",
                content: "Démo annulée",
                createdBy: context.userId,
            },
        })

        return updatedLead
    }

    /**
     * Met à jour le statut d'un lead
     */
    static async updateStatus(
        context: PolicyContext,
        leadId: string,
        newStatus: string
    ) {
        const lead = await this.verifyLeadAssignment(context, leadId)

        const updatedLead = await prisma.lead.update({
            where: { id: leadId },
            data: {
                status: newStatus as any,
                lastInteraction: new Date(),
            },
        })

        await prisma.leadInteraction.create({
            data: {
                leadId,
                type: "STATUS_CHANGE",
                content: `Statut changé de ${lead.status} à ${newStatus}`,
                createdBy: context.userId,
            },
        })

        return updatedLead
    }

    /**
     * Récupère les interactions d'un lead
     */
    static async getInteractions(context: PolicyContext, leadId: string) {
        await this.verifyLeadAssignment(context, leadId)

        return prisma.leadInteraction.findMany({
            where: { leadId },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        })
    }

    /**
     * Crée une interaction pour un lead
     */
    static async createInteraction(
        context: PolicyContext,
        leadId: string,
        type: string,
        content: string
    ) {
        await this.verifyLeadAssignment(context, leadId)

        const interaction = await prisma.leadInteraction.create({
            data: {
                leadId,
                type,
                content,
                createdBy: context.userId,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        })

        await prisma.lead.update({
            where: { id: leadId },
            data: { lastInteraction: new Date() },
        })

        return interaction
    }

    /**
     * Récupère les notes d'un lead
     */
    static async getNotes(context: PolicyContext, leadId: string) {
        await this.verifyLeadAssignment(context, leadId)

        return prisma.leadNote.findMany({
            where: { leadId },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        })
    }

    /**
     * Crée une note pour un lead
     */
    static async createNote(
        context: PolicyContext,
        leadId: string,
        content: string
    ) {
        await this.verifyLeadAssignment(context, leadId)

        const note = await prisma.leadNote.create({
            data: {
                leadId,
                content,
                createdBy: context.userId,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        })

        await prisma.leadInteraction.create({
            data: {
                leadId,
                type: "NOTE",
                content: `Note ajoutée: ${content.substring(0, 100)}${content.length > 100 ? "..." : ""}`,
                createdBy: context.userId,
            },
        })

        await prisma.lead.update({
            where: { id: leadId },
            data: { lastInteraction: new Date() },
        })

        return note
    }
}

