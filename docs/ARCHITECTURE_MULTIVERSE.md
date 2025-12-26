# Architecture Multiverse

## 🎯 Vue d'ensemble

L'architecture multiverse permet de séparer les responsabilités métier (CRM, Admin, Paie, RH) sans réécrire l'authentification ni casser l'existant. Les mêmes utilisateurs, les mêmes données et les mêmes endpoints API produisent des comportements différents selon l'univers métier.

## 🧩 Principe clé

L'architecture multiverse repose sur une **couche de résolution de contexte (Universe Resolver)** ajoutée après l'authentification.

- ✅ L'authentification EXISTANTE reste inchangée
- ✅ Le changement est structurel, pas destructif
- ✅ Les endpoints REST restent identiques, mais leur comportement dépend du contexte

## 🏗️ Structure

### Mapping des rôles vers les univers

| Rôle | Univers | Description |
|------|---------|-------------|
| `ADMIN` | `ADMIN_CORE` | Administration centrale - Vue globale de la plateforme |
| `SALES` | `CRM` | Gestion de la relation client - Pipeline commercial |
| `CUSTOMER_SUCCESS` | `SUPPORT` | Support client - Onboarding et assistance |
| `CLIENT` | `HR_PAYROLL` | RH & Paie - Espace client |

### Fichiers clés

```
lib/
  ├── universe.ts              # Universe Resolver et types
  ├── policies.ts              # Système RBAC + ABAC
  └── universe-middleware.ts   # Helpers pour les routes API

domains/
  ├── admin/
  │   └── services/
  │       └── lead.service.ts
  ├── crm/
  │   └── services/
  │       └── lead.service.ts
  ├── support/
  │   └── services/
  │       └── lead.service.ts
  └── hr-payroll/
      └── services/
          └── payroll.service.ts
```

## 🔐 Authentification enrichie

L'authentification existante a été enrichie pour inclure l'univers dans le JWT et la session :

```typescript
// Le token JWT contient maintenant :
{
  id: string
  role: string
  appRole: string
  universe: Universe  // ← Nouveau
  tenantId?: string
  isMainAdmin: boolean
  userType: string
}
```

## 📊 Système de permissions (RBAC + ABAC)

### Permissions par univers

#### ADMIN_CORE
- `leads:read:all` - Voir tous les leads
- `leads:write` - Modifier les leads
- `leads:assign` - Assigner des leads
- `leads:approve` - Approuver des leads
- `leads:provision` - Provisionner des leads
- `users:read`, `users:write`
- `tenants:read`, `tenants:write`

#### CRM
- `leads:read:assigned` - Voir ses leads assignés
- `leads:write` - Modifier ses leads assignés

#### SUPPORT
- `leads:read:all` - Voir tous les leads
- `leads:write` - Modifier les leads
- `leads:provision` - Provisionner des leads
- `tenants:read`, `tenants:write`

#### HR_PAYROLL
- `payroll:read`, `payroll:write`
- `employees:read`, `employees:write`

### Utilisation dans les endpoints

```typescript
import { getUniverseContext } from "@/lib/universe-middleware"
import { hasPermission } from "@/lib/policies"

export async function GET(req: Request) {
    const context = await getUniverseContext()
    
    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!hasPermission(context, "leads:read:all")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Logique métier...
}
```

## 🎨 Services par domaine

Chaque domaine a ses propres services métier qui encapsulent la logique spécifique à l'univers.

### Exemple : Service CRM

```typescript
// domains/crm/services/lead.service.ts
export class CrmLeadService {
    static async getAssignedLeads(context: PolicyContext, filters?: {...}) {
        // Vérification de l'univers
        if (context.universe !== Universe.CRM) {
            throw new Error("Unauthorized: CRM access required")
        }

        // Logique spécifique CRM : seulement les leads assignés
        return prisma.lead.findMany({
            where: {
                assignedToId: context.userId,
                // ... filtres
            },
        })
    }
}
```

### Utilisation dans les endpoints

```typescript
import { CrmLeadService } from "@/domains/crm/services/lead.service"

export async function GET(req: Request) {
    const context = await getUniverseContext()
    // ... vérifications

    const leads = await CrmLeadService.getAssignedLeads(context, filters)
    return NextResponse.json(leads)
}
```

## 🔄 Comportement des endpoints selon l'univers

### Exemple : GET /api/leads

| Univers | Comportement |
|---------|--------------|
| `ADMIN_CORE` | Retourne **tous** les leads |
| `CRM` | Retourne uniquement les leads **assignés** au commercial |
| `SUPPORT` | Retourne **tous** les leads (pour onboarding) |
| `HR_PAYROLL` | **Aucun accès** (403 Forbidden) |

## 🚀 Ajout d'un nouvel univers

Pour ajouter un nouvel univers (ex: expert-comptable, auditeur) :

1. **Ajouter l'univers dans `lib/universe.ts`** :
```typescript
export enum Universe {
    // ... existants
    ACCOUNTANT = "ACCOUNTANT",
}
```

2. **Mettre à jour le mapping** :
```typescript
export function resolveUniverse(role: string): Universe {
    switch (role) {
        // ... existants
        case "ACCOUNTANT":
            return Universe.ACCOUNTANT
    }
}
```

3. **Définir les permissions dans `lib/policies.ts`** :
```typescript
const UNIVERSE_PERMISSIONS: Record<Universe, Permission[]> = {
    // ... existants
    [Universe.ACCOUNTANT]: [
        "payroll:read",
        "employees:read",
    ],
}
```

4. **Créer le service domaine** :
```typescript
// domains/accountant/services/payroll.service.ts
export class AccountantPayrollService {
    // Logique spécifique
}
```

## ✅ Résultat

- ✅ Architecture scalable
- ✅ Séparation claire des responsabilités
- ✅ Aucun refactoring destructif
- ✅ Facilité d'ajout de nouveaux univers
- ✅ Même base de données, plusieurs réalités fonctionnelles

## 📝 Notes importantes

- L'authentification existante reste **inchangée**
- Les endpoints REST restent **identiques** (même URL, même méthode)
- Le comportement change selon l'**univers** de l'utilisateur
- Les **policies** garantissent la sécurité et la cohérence


