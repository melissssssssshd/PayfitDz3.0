/**
 * CRM Domain - Webinar Service
 * 
 * Gestion des webinars collectifs de pré-qualification
 */

import { prisma } from "@/lib/prisma"
import { PolicyContext } from "@/lib/policies"
import { Universe } from "@/lib/universe"
import { LeadScoringService } from "./lead-scoring.service"

export class WebinarService {
    /**
     * Crée un nouveau webinar
     */
    static async createWebinar(
        context: PolicyContext,
        data: {
            title: string
            description?: string
            scheduledAt: Date
            duration?: number
            platform: "ZOOM" | "GOOGLE_MEET"
            meetingLink?: string
        }
    ) {
        if (context.universe !== Universe.CRM && context.universe !== Universe.ADMIN_CORE) {
            throw new Error("Unauthorized: CRM or Admin access required")
        }

        return prisma.webinar.create({
            data: {
                title: data.title,
                description: data.description,
                scheduledAt: data.scheduledAt,
                duration: data.duration || 45,
                platform: data.platform,
                meetingLink: data.meetingLink,
                status: "SCHEDULED",
            },
        })
    }

    /**
     * Inscrit un lead à un webinar
     */
    static async registerLeadToWebinar(
        leadId: string,
        webinarId: string
    ) {
        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
        })

        if (!lead) {
            throw new Error("Lead not found")
        }

        const webinar = await prisma.webinar.findUnique({
            where: { id: webinarId },
        })

        if (!webinar) {
            throw new Error("Webinar not found")
        }

        // Vérifier si déjà inscrit
        const existing = await prisma.webinarRegistration.findUnique({
            where: { leadId },
        })

        if (existing) {
            throw new Error("Lead already registered to a webinar")
        }

        // Créer l'inscription
        const registration = await prisma.webinarRegistration.create({
            data: {
                webinarId,
                leadId,
                email: lead.email,
                firstName: lead.firstName,
                lastName: lead.lastName,
                phone: lead.phone,
                companyName: lead.companyName,
                status: "REGISTERED",
            },
        })

        // Mettre à jour le compteur du webinar
        await prisma.webinar.update({
            where: { id: webinarId },
            data: {
                totalRegistrations: {
                    increment: 1,
                },
            },
        })

        return registration
    }

    /**
     * Marque un participant comme présent au webinar
     */
    static async markAttendance(
        registrationId: string,
        engagement: {
            questionsAsked?: number
            pollResponses?: any
        }
    ) {
        const registration = await prisma.webinarRegistration.findUnique({
            where: { id: registrationId },
            include: { lead: true },
        })

        if (!registration) {
            throw new Error("Registration not found")
        }

        // Mettre à jour le statut
        await prisma.webinarRegistration.update({
            where: { id: registrationId },
            data: {
                status: "ATTENDED",
                attendedAt: new Date(),
                questionsAsked: engagement.questionsAsked || 0,
                pollResponses: engagement.pollResponses,
            },
        })

        // Mettre à jour le compteur du webinar
        await prisma.webinar.update({
            where: { id: registration.webinarId },
            data: {
                totalAttendees: {
                    increment: 1,
                },
            },
        })

        // Mettre à jour le score du lead si présent
        if (registration.leadId) {
            const engagementScore = (engagement.questionsAsked || 0) + (engagement.pollResponses ? 1 : 0)
            await LeadScoringService.addWebinarScore(
                registration.leadId,
                true,
                engagementScore
            )

            // Marquer le lead comme qualifié si score élevé
            const lead = await prisma.lead.findUnique({
                where: { id: registration.leadId },
            })

            if (lead && LeadScoringService.isHotLead(lead)) {
                await prisma.lead.update({
                    where: { id: registration.leadId },
                    data: {
                        status: "CONTACTED", // Qualifié après webinar
                    },
                })
            }
        }

        return registration
    }

    /**
     * Récupère les webinars à venir
     */
    static async getUpcomingWebinars() {
        return prisma.webinar.findMany({
            where: {
                status: "SCHEDULED",
                scheduledAt: {
                    gte: new Date(),
                },
            },
            orderBy: {
                scheduledAt: "asc",
            },
            include: {
                registrations: {
                    where: {
                        status: "REGISTERED",
                    },
                    take: 5,
                },
            },
        })
    }

    /**
     * Récupère les leads qualifiés après webinar (chauds)
     */
    static async getQualifiedLeadsAfterWebinar(webinarId: string) {
        const registrations = await prisma.webinarRegistration.findMany({
            where: {
                webinarId,
                status: "ATTENDED",
            },
            include: {
                lead: true,
            },
        })

        return registrations
            .filter((reg) => reg.lead && LeadScoringService.isHotLead(reg.lead))
            .map((reg) => reg.lead)
    }
}


