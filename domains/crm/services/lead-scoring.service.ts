/**
 * CRM Domain - Lead Scoring Service (DZ)
 * 
 * Système de scoring adapté aux réalités algériennes
 */

import { prisma } from "@/lib/prisma"
import { Lead } from "@prisma/client"

export class LeadScoringService {
    /**
     * Calcule le score d'un lead selon les critères DZ
     */
    static calculateScore(lead: Lead): number {
        let score = 0

        // 1. Taille entreprise (poids fort) - 40 points max
        if (lead.employeeRange) {
            switch (lead.employeeRange) {
                case "51-250":
                    score += 40
                    break
                case "11-50":
                    score += 30
                    break
                case "1-10":
                    score += 20
                    break
            }
        } else if (lead.employees) {
            if (lead.employees >= 51 && lead.employees <= 250) {
                score += 40
            } else if (lead.employees >= 11 && lead.employees <= 50) {
                score += 30
            } else if (lead.employees >= 1 && lead.employees <= 10) {
                score += 20
            }
        }

        // 2. Secteur prioritaire - 20 points max
        const prioritySectors = ["Technologie", "Services", "Commerce", "Industrie"]
        if (lead.sector && prioritySectors.includes(lead.sector)) {
            score += 20
        } else if (lead.sector) {
            score += 10
        }

        // 3. Urgence paie - 25 points max
        if (lead.payrollUrgency === "END_OF_MONTH") {
            score += 25 // Très urgent
        } else if (lead.payrollUrgency === "NEXT_MONTH") {
            score += 15 // Urgent
        } else if (lead.payrollUrgency === "EXPLORATION") {
            score += 5 // Pas urgent
        }

        // 4. Besoins spécifiques - 15 points max
        if (lead.needsCNAS) score += 8 // Conformité CNAS importante
        if (lead.needsPayroll) score += 5
        if (lead.needsLeaveManagement) score += 2

        // 5. Solution actuelle - 10 points max
        if (lead.currentSolution) {
            const legacySolutions = ["Excel", "Manuel", "Papier"]
            if (legacySolutions.some(s => lead.currentSolution?.toLowerCase().includes(s.toLowerCase()))) {
                score += 10 // Forte motivation de changement
            } else if (lead.currentSolution) {
                score += 5 // Solution existante mais peut-être insatisfaisante
            }
        }

        // 6. Participation webinar - 20 points max (ajouté après webinar)
        // Sera mis à jour lors de la participation

        // Score max théorique : 130 points
        return Math.min(score, 130)
    }

    /**
     * Met à jour le score d'un lead
     */
    static async updateLeadScore(leadId: string): Promise<number> {
        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
        })

        if (!lead) {
            throw new Error("Lead not found")
        }

        const score = this.calculateScore(lead)

        await prisma.lead.update({
            where: { id: leadId },
            data: { score },
        })

        return score
    }

    /**
     * Augmente le score après participation au webinar
     */
    static async addWebinarScore(leadId: string, attended: boolean, engagement: number): Promise<void> {
        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
        })

        if (!lead) {
            throw new Error("Lead not found")
        }

        let additionalScore = 0

        if (attended) {
            additionalScore += 15 // Présence au webinar
            additionalScore += Math.min(engagement * 2, 5) // Engagement (questions, sondages)
        }

        const newScore = Math.min(lead.score + additionalScore, 130)

        await prisma.lead.update({
            where: { id: leadId },
            data: { score: newScore },
        })
    }

    /**
     * Détermine si un lead est "chaud" (score >= 70)
     */
    static isHotLead(lead: Lead): boolean {
        return lead.score >= 70
    }

    /**
     * Détermine si un lead est "tiède" (score entre 40 et 69)
     */
    static isWarmLead(lead: Lead): boolean {
        return lead.score >= 40 && lead.score < 70
    }

    /**
     * Détermine si un lead est "froid" (score < 40)
     */
    static isColdLead(lead: Lead): boolean {
        return lead.score < 40
    }
}


