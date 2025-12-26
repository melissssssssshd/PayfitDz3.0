/**
 * Policies System - RBAC + ABAC
 * 
 * Système de règles d'accès basé sur :
 * - RBAC (Role-Based Access Control) : basé sur le rôle
 * - ABAC (Attribute-Based Access Control) : basé sur les relations aux données
 */

import { Universe } from "./universe"
import { UserRole } from "./universe"
import { PrismaClient } from "@prisma/client"

export type Permission = 
    | "leads:read"
    | "leads:read:all"
    | "leads:read:assigned"
    | "leads:write"
    | "leads:assign"
    | "leads:approve"
    | "leads:provision"
    | "users:read"
    | "users:write"
    | "tenants:read"
    | "tenants:write"
    | "payroll:read"
    | "payroll:write"
    | "employees:read"
    | "employees:write"

export interface PolicyContext {
    universe: Universe
    userId: string
    tenantId?: string | null
    isMainAdmin: boolean
}

/**
 * Définit les permissions par univers
 */
const UNIVERSE_PERMISSIONS: Record<Universe, Permission[]> = {
    [Universe.ADMIN_CORE]: [
        "leads:read:all",
        "leads:write",
        "leads:assign",
        "leads:approve",
        "leads:provision",
        "users:read",
        "users:write",
        "tenants:read",
        "tenants:write",
    ],
    [Universe.CRM]: [
        "leads:read:assigned",
        "leads:write",
    ],
    [Universe.SUPPORT]: [
        "leads:read:all",
        "leads:write",
        "leads:provision",
        "tenants:read",
        "tenants:write",
    ],
    [Universe.HR_PAYROLL]: [
        "payroll:read",
        "payroll:write",
        "employees:read",
        "employees:write",
    ],
}

/**
 * Vérifie si un utilisateur a une permission dans son univers
 */
export function hasPermission(context: PolicyContext, permission: Permission): boolean {
    const universePermissions = UNIVERSE_PERMISSIONS[context.universe] || []
    return universePermissions.includes(permission)
}

/**
 * Vérifie si un utilisateur peut lire un lead spécifique
 * Utilise ABAC : vérifie la relation aux données
 */
export async function canReadLead(
    context: PolicyContext,
    leadId: string,
    prisma: PrismaClient
): Promise<boolean> {
    // Admin peut tout lire
    if (context.universe === Universe.ADMIN_CORE) {
        return true
    }

    // Support peut lire tous les leads
    if (context.universe === Universe.SUPPORT) {
        return true
    }

    // CRM : peut seulement lire ses leads assignés
    if (context.universe === Universe.CRM) {
        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
            select: { assignedToId: true },
        })
        return lead?.assignedToId === context.userId
    }

    // HR_PAYROLL : pas d'accès aux leads
    if (context.universe === Universe.HR_PAYROLL) {
        return false
    }

    return false
}

/**
 * Vérifie si un utilisateur peut modifier un lead spécifique
 */
export async function canWriteLead(
    context: PolicyContext,
    leadId: string,
    prisma: PrismaClient
): Promise<boolean> {
    // Admin peut tout modifier
    if (context.universe === Universe.ADMIN_CORE) {
        return true
    }

    // Support peut modifier tous les leads
    if (context.universe === Universe.SUPPORT) {
        return true
    }

    // CRM : peut seulement modifier ses leads assignés
    if (context.universe === Universe.CRM) {
        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
            select: { assignedToId: true },
        })
        return lead?.assignedToId === context.userId
    }

    // HR_PAYROLL : pas d'accès aux leads
    return false
}

/**
 * Construit un filtre Prisma pour les leads selon l'univers
 */
export function buildLeadFilter(context: PolicyContext): any {
    switch (context.universe) {
        case Universe.ADMIN_CORE:
            // Admin voit tous les leads
            return {}
        
        case Universe.CRM:
            // CRM voit seulement ses leads assignés
            return {
                assignedToId: context.userId,
            }
        
        case Universe.SUPPORT:
            // Support voit tous les leads (pour onboarding)
            return {}
        
        case Universe.HR_PAYROLL:
            // HR_PAYROLL n'a pas accès aux leads
            return null // null signifie pas d'accès
        
        default:
            return null
    }
}


