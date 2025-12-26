/**
 * Universe Middleware Helper
 * 
 * Fournit des helpers pour injecter req.universe dans les routes API Next.js
 */

import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { resolveUniverse, Universe } from "./universe"
import { PolicyContext } from "./policies"

export interface UniverseRequest extends NextRequest {
    universe?: Universe
    policyContext?: PolicyContext
}

/**
 * Récupère le contexte d'univers depuis la session
 * À utiliser dans les routes API
 */
export async function getUniverseContext(): Promise<PolicyContext | null> {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
        return null
    }

    const role = session.user.role || session.user.appRole
    const universe = resolveUniverse(role)

    return {
        universe,
        userId: session.user.id,
        tenantId: session.user.tenantId || null,
        isMainAdmin: session.user.isMainAdmin || false,
    }
}

/**
 * Type helper pour les handlers API avec contexte d'univers
 */
export type UniverseApiHandler = (
    req: NextRequest,
    context?: any
) => Promise<Response>


