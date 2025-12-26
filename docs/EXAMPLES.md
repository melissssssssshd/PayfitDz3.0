# Exemples d'utilisation de l'Architecture Multiverse

## Exemple 1 : Endpoint GET /api/leads avec comportement multiverse

### Avant (sans multiverse)
```typescript
// app/api/leads/route.ts
export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    
    if (session.user.role === "ADMIN") {
        // Retourner tous les leads
        return prisma.lead.findMany()
    } else if (session.user.role === "SALES") {
        // Retourner seulement les leads assignés
        return prisma.lead.findMany({
            where: { assignedToId: session.user.id }
        })
    }
    // ...
}
```

### Après (avec multiverse)
```typescript
// app/api/leads/route.ts
import { getUniverseContext } from "@/lib/universe-middleware"
import { buildLeadFilter } from "@/lib/policies"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
    const context = await getUniverseContext()
    
    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Le filtre est construit automatiquement selon l'univers
    const filter = buildLeadFilter(context)
    
    if (filter === null) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const leads = await prisma.lead.findMany({ where: filter })
    return NextResponse.json(leads)
}
```

## Exemple 2 : Utilisation d'un service domaine

### Service CRM
```typescript
// domains/crm/services/lead.service.ts
export class CrmLeadService {
    static async getAssignedLeads(context: PolicyContext, filters?: {...}) {
        // Vérification automatique de l'univers
        if (context.universe !== Universe.CRM) {
            throw new Error("Unauthorized: CRM access required")
        }

        // Logique métier spécifique CRM
        return prisma.lead.findMany({
            where: {
                assignedToId: context.userId, // Seulement les leads assignés
                ...filters,
            },
        })
    }
}
```

### Endpoint utilisant le service
```typescript
// app/api/sales/leads/route.ts
import { getUniverseContext } from "@/lib/universe-middleware"
import { CrmLeadService } from "@/domains/crm/services/lead.service"
import { hasPermission } from "@/lib/policies"

export async function GET(req: Request) {
    const context = await getUniverseContext()
    
    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "leads:read:assigned")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const leads = await CrmLeadService.getAssignedLeads(context, {
        status: searchParams.get("status") || undefined,
        search: searchParams.get("search") || undefined,
    })

    return NextResponse.json(leads)
}
```

## Exemple 3 : Vérification ABAC (relation aux données)

```typescript
// app/api/leads/[id]/route.ts
import { getUniverseContext } from "@/lib/universe-middleware"
import { canReadLead, canWriteLead } from "@/lib/policies"
import { prisma } from "@/lib/prisma"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const context = await getUniverseContext()
    const { id } = await params
    
    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Vérification ABAC : peut-il lire ce lead spécifique ?
    const canRead = await canReadLead(context, id, prisma)
    
    if (!canRead) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const lead = await prisma.lead.findUnique({ where: { id } })
    return NextResponse.json(lead)
}
```

## Exemple 4 : Frontend - Adapter l'UI selon l'univers

```typescript
// components/LeadList.tsx
import { useSession } from "next-auth/react"
import { Universe } from "@/lib/universe"

export function LeadList() {
    const { data: session } = useSession()
    const universe = session?.user?.universe

    if (universe === Universe.ADMIN_CORE) {
        // Afficher tous les leads avec options d'assignation
        return <AdminLeadList />
    }

    if (universe === Universe.CRM) {
        // Afficher seulement les leads assignés
        return <SalesLeadList />
    }

    if (universe === Universe.SUPPORT) {
        // Afficher les leads fermés pour onboarding
        return <SupportLeadList />
    }

    // HR_PAYROLL : pas d'accès aux leads
    return <div>Accès non autorisé</div>
}
```

## Exemple 5 : Ajout d'un nouvel univers

### 1. Ajouter l'univers
```typescript
// lib/universe.ts
export enum Universe {
    // ... existants
    ACCOUNTANT = "ACCOUNTANT",
}

export function resolveUniverse(role: string): Universe {
    switch (role) {
        // ... existants
        case "ACCOUNTANT":
            return Universe.ACCOUNTANT
    }
}
```

### 2. Définir les permissions
```typescript
// lib/policies.ts
const UNIVERSE_PERMISSIONS: Record<Universe, Permission[]> = {
    // ... existants
    [Universe.ACCOUNTANT]: [
        "payroll:read",
        "employees:read",
        "tenants:read",
    ],
}
```

### 3. Créer le service domaine
```typescript
// domains/accountant/services/payroll.service.ts
import { PolicyContext } from "@/lib/policies"
import { Universe } from "@/lib/universe"
import { prisma } from "@/lib/prisma"

export class AccountantPayrollService {
    static async getClientPayrolls(context: PolicyContext, tenantIds: string[]) {
        if (context.universe !== Universe.ACCOUNTANT) {
            throw new Error("Unauthorized: Accountant access required")
        }

        // Logique spécifique expert-comptable
        return prisma.tenant.findMany({
            where: {
                id: { in: tenantIds },
            },
            include: {
                subscriptions: true,
            },
        })
    }
}
```

### 4. Créer l'endpoint
```typescript
// app/api/accountant/payrolls/route.ts
import { getUniverseContext } from "@/lib/universe-middleware"
import { AccountantPayrollService } from "@/domains/accountant/services/payroll.service"
import { hasPermission } from "@/lib/policies"

export async function GET(req: Request) {
    const context = await getUniverseContext()
    
    if (!context || !hasPermission(context, "payroll:read")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const tenantIds = searchParams.get("tenantIds")?.split(",") || []

    const payrolls = await AccountantPayrollService.getClientPayrolls(
        context,
        tenantIds
    )

    return NextResponse.json(payrolls)
}
```

## Résumé des avantages

1. **Séparation claire** : Chaque univers a sa propre logique métier
2. **Réutilisabilité** : Les services peuvent être utilisés dans plusieurs endpoints
3. **Sécurité** : Les permissions sont centralisées et vérifiées automatiquement
4. **Maintenabilité** : Facile d'ajouter de nouveaux univers ou permissions
5. **Testabilité** : Les services peuvent être testés indépendamment


