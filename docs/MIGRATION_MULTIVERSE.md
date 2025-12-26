# Migration vers l'Architecture Multiverse

## ✅ Changements effectués

### 1. Création des types et enums
- ✅ `lib/universe.ts` : Définition des univers et du resolver
- ✅ `types/next-auth.d.ts` : Enrichissement des types avec `universe`

### 2. Système de permissions (RBAC + ABAC)
- ✅ `lib/policies.ts` : Définition des permissions par univers
- ✅ Fonctions de vérification : `hasPermission()`, `canReadLead()`, `canWriteLead()`
- ✅ Filtres Prisma dynamiques selon l'univers

### 3. Enrichissement de l'authentification
- ✅ `lib/auth.ts` : Ajout de l'univers dans le JWT et la session
- ✅ L'univers est résolu automatiquement lors du login
- ✅ Disponible dans `session.user.universe` et `token.universe`

### 4. Structure par domaines métier
- ✅ `domains/admin/services/lead.service.ts` : Services Admin
- ✅ `domains/crm/services/lead.service.ts` : Services CRM
- ✅ `domains/support/services/lead.service.ts` : Services Support
- ✅ `domains/hr-payroll/services/payroll.service.ts` : Services HR & Paie

### 5. Adaptation des endpoints
- ✅ `app/api/admin/leads/route.ts` : Utilise `AdminLeadService`
- ✅ `app/api/admin/leads/[id]/approve/route.ts` : Utilise `AdminLeadService`
- ✅ `app/api/admin/leads/[id]/assign/route.ts` : Utilise `AdminLeadService`
- ✅ `app/api/admin/leads/[id]/provision/route.ts` : Utilise `SupportLeadService`
- ✅ `app/api/sales/leads/route.ts` : Utilise `CrmLeadService`
- ✅ `app/api/sales/stats/route.ts` : Utilise `CrmLeadService`
- ✅ `app/api/cs/leads/route.ts` : Utilise `SupportLeadService`
- ✅ `app/api/client/account/route.ts` : Utilise `PayrollService`

### 6. Helpers et middleware
- ✅ `lib/universe-middleware.ts` : Helper `getUniverseContext()` pour les routes API

## 📋 Endpoints à adapter (optionnel)

Les endpoints suivants utilisent encore l'ancienne méthode `getServerSession` mais fonctionnent toujours. Ils peuvent être adaptés progressivement :

- `app/api/sales/leads/[id]/demo/route.ts`
- `app/api/sales/leads/[id]/status/route.ts`
- `app/api/sales/leads/[id]/interactions/route.ts`
- `app/api/sales/leads/[id]/notes/route.ts`
- `app/api/cs/onboard/route.ts`
- `app/api/admin/sales-users/route.ts`
- `app/api/billing/checkout/route.ts`
- `app/api/onboarding/tenant/route.ts`

## 🎯 Utilisation

### Dans un endpoint API

```typescript
import { getUniverseContext } from "@/lib/universe-middleware"
import { hasPermission } from "@/lib/policies"
import { CrmLeadService } from "@/domains/crm/services/lead.service"

export async function GET(req: Request) {
    // 1. Récupérer le contexte d'univers
    const context = await getUniverseContext()
    
    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Vérifier les permissions
    if (!hasPermission(context, "leads:read:assigned")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // 3. Utiliser le service domaine
    const leads = await CrmLeadService.getAssignedLeads(context, filters)
    
    return NextResponse.json(leads)
}
```

### Dans un composant frontend

```typescript
import { useSession } from "next-auth/react"

export function MyComponent() {
    const { data: session } = useSession()
    
    // L'univers est disponible dans la session
    const universe = session?.user?.universe
    
    // Utiliser l'univers pour adapter l'UI
    if (universe === "CRM") {
        // Afficher l'interface CRM
    }
}
```

## 🔍 Vérification

Pour vérifier que tout fonctionne :

1. **Tester l'authentification** : L'univers doit être présent dans la session
2. **Tester les endpoints** : Les comportements doivent différer selon l'univers
3. **Vérifier les permissions** : Les accès doivent être correctement restreints

## 📚 Documentation

- `docs/ARCHITECTURE_MULTIVERSE.md` : Documentation complète de l'architecture
- `domains/README.md` : Guide d'utilisation des services domaine


