/**
 * CRM Domain - Lead Routing Service
 * 
 * Routage automatique des leads selon leur score
 */

import { prisma } from "@/lib/prisma"
import { LeadScoringService } from "./lead-scoring.service"
import { Lead } from "@prisma/client"

export class LeadRoutingService {
    /**
     * Route un lead selon son score
     * - Chauds (>= 70) → assignés automatiquement à un commercial
     * - Tièdes (40-69) → nurturing automatique
     * - Froids (< 40) → réinvitation au prochain webinar
     */
    static async routeLead(leadId: string): Promise<{
        action: "ASSIGNED" | "NURTURING" | "REINVITE"
        assignedToId?: string
    }> {
        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
        })

        if (!lead) {
            throw new Error("Lead not found")
        }

        // Recalculer le score
        const score = LeadScoringService.calculateScore(lead)
        await prisma.lead.update({
            where: { id: leadId },
            data: { score },
        })

        // Routing selon le score
        if (LeadScoringService.isHotLead(lead)) {
            // Lead chaud → assigner à un commercial disponible
            const salesUser = await this.assignToAvailableSales()
            
            if (salesUser) {
                await prisma.lead.update({
                    where: { id: leadId },
                    data: {
                        assignedToId: salesUser.id,
                        status: "CONTACTED",
                    },
                })

                return {
                    action: "ASSIGNED",
                    assignedToId: salesUser.id,
                }
            }
        } else if (LeadScoringService.isWarmLead(lead)) {
            // Lead tiède → nurturing
            return {
                action: "NURTURING",
            }
        } else {
            // Lead froid → réinvitation
            return {
                action: "REINVITE",
            }
        }

        return {
            action: "NURTURING",
        }
    }

    /**
     * Assigne un lead à un commercial disponible (round-robin simple)
     */
    static async assignToAvailableSales() {
        const salesUsers = await prisma.user.findMany({
            where: {
                appRole: "SALES",
            },
            include: {
                assignedLeads: {
                    where: {
                        status: {
                            in: ["NEW", "CONTACTED", "DEMO_DONE"],
                        },
                    },
                },
            },
        })

        if (salesUsers.length === 0) {
            return null
        }

        // Trouver le commercial avec le moins de leads assignés
        const salesWithCounts = salesUsers.map((user) => ({
            user,
            leadCount: user.assignedLeads.length,
        }))

        salesWithCounts.sort((a, b) => a.leadCount - b.leadCount)

        return salesWithCounts[0].user
    }

    /**
     * Récupère les leads à réinviter au prochain webinar
     */
    static async getLeadsToReinvite(): Promise<Lead[]> {
        return prisma.lead.findMany({
            where: {
                status: "NEW",
                score: {
                    lt: 40,
                },
                webinarRegistration: null, // Pas encore inscrit
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 50,
        })
    }
}


