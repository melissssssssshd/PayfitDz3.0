/**
 * Universe Resolver - Architecture Multiverse
 * 
 * Mappe les rôles utilisateurs vers des univers métier distincts.
 * Chaque univers a ses propres règles, permissions et comportements.
 */

export enum Universe {
    ADMIN_CORE = "ADMIN_CORE",
    CRM = "CRM",
    SUPPORT = "SUPPORT",
    HR_PAYROLL = "HR_PAYROLL",
}

export enum UserRole {
    ADMIN = "ADMIN",
    SALES = "SALES",
    CUSTOMER_SUCCESS = "CUSTOMER_SUCCESS",
    CLIENT = "CLIENT",
}

/**
 * Mappe un rôle utilisateur vers son univers métier
 */
export function resolveUniverse(role: string | null | undefined): Universe {
    switch (role) {
        case UserRole.ADMIN:
            return Universe.ADMIN_CORE
        case UserRole.SALES:
            return Universe.CRM
        case UserRole.CUSTOMER_SUCCESS:
            return Universe.SUPPORT
        case UserRole.CLIENT:
            return Universe.HR_PAYROLL
        default:
            // Par défaut, si le rôle n'est pas reconnu, on retourne HR_PAYROLL
            // pour éviter les erreurs, mais cela devrait être géré en amont
            return Universe.HR_PAYROLL
    }
}

/**
 * Vérifie si un utilisateur a accès à un univers spécifique
 */
export function hasUniverseAccess(userUniverse: Universe, targetUniverse: Universe): boolean {
    // Les admins ont accès à tous les univers
    if (userUniverse === Universe.ADMIN_CORE) {
        return true
    }
    return userUniverse === targetUniverse
}

/**
 * Retourne la description d'un univers
 */
export function getUniverseDescription(universe: Universe): string {
    const descriptions: Record<Universe, string> = {
        [Universe.ADMIN_CORE]: "Administration centrale - Vue globale de la plateforme",
        [Universe.CRM]: "Gestion de la relation client - Pipeline commercial",
        [Universe.SUPPORT]: "Support client - Onboarding et assistance",
        [Universe.HR_PAYROLL]: "RH & Paie - Espace client",
    }
    return descriptions[universe]
}


