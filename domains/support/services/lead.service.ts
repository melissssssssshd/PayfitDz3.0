/**
 * Support Domain - Lead Service
 * 
 * Services métier pour la gestion des leads dans l'univers SUPPORT
 */

import { prisma } from "@/lib/prisma"
import { PolicyContext } from "@/lib/policies"
import { Universe } from "@/lib/universe"
import bcrypt from "bcryptjs"

export class SupportLeadService {
    /**
     * Récupère les leads fermés prêts pour l'onboarding
     */
    static async getLeadsForOnboarding(context: PolicyContext) {
        if (context.universe !== Universe.SUPPORT) {
            throw new Error("Unauthorized: Support access required")
        }

        return prisma.lead.findMany({
            where: {
                status: "CLOSED",
            },
            include: {
                convertedTenant: true,
            },
            orderBy: { createdAt: "desc" },
        })
    }

    /**
     * Provisionne un tenant depuis un lead
     */
    static async provisionTenant(
        context: PolicyContext,
        leadId: string,
        tenantData: {
            name: string
            siret?: string
            domain?: string
        }
    ) {
        if (context.universe !== Universe.SUPPORT) {
            throw new Error("Unauthorized: Support access required")
        }

        // Créer le tenant
        const tenant = await prisma.tenant.create({
            data: {
                name: tenantData.name,
                siret: tenantData.siret,
                domain: tenantData.domain,
                status: "ONBOARDING",
            },
        })

        // Lier le lead au tenant
        await prisma.lead.update({
            where: { id: leadId },
            data: {
                convertedTenantId: tenant.id,
            },
        })

        return tenant
    }

    /**
     * Crée un compte client depuis l'onboarding
     */
    static async onboardClient(
        context: PolicyContext,
        data: {
            companyName: string
            siret?: string
            rc?: string
            address?: string
            wilaya?: string
            sector?: string
            size?: string
            adminName: string
            adminEmail: string
            adminPassword: string
            leadId?: string
        }
    ) {
        if (context.universe !== Universe.SUPPORT) {
            throw new Error("Unauthorized: Support access required")
        }

        const passwordHash = await bcrypt.hash(data.adminPassword, 10)

        // Créer le tenant
        const tenant = await prisma.tenant.create({
            data: {
                name: data.companyName,
                siret: data.siret,
                rc: data.rc,
                address: data.address,
                sector: data.sector,
                size: data.size,
                status: "ACTIVE",
            },
        })

        // Créer l'utilisateur admin
        const user = await prisma.user.create({
            data: {
                email: data.adminEmail,
                name: data.adminName,
                passwordHash,
                appRole: "CLIENT" as any,
                userType: "ENTERPRISE",
                isMainAdmin: true,
                tenantId: tenant.id,
            },
        })

        // Créer le ClientAccount
        await (prisma as any).clientAccount.create({
            data: {
                companyName: data.companyName,
                userId: user.id,
                leadId: data.leadId || undefined,
            },
        })

        // Mettre à jour le lead si fourni
        if (data.leadId) {
            await prisma.lead.update({
                where: { id: data.leadId },
                data: {
                    convertedTenantId: tenant.id,
                },
            })
        }

        return {
            tenantId: tenant.id,
            userId: user.id,
        }
    }
}

