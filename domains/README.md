# Domain Services

Cette structure organise la logique métier par domaine fonctionnel, en cohérence avec l'architecture multiverse.

## Structure

```
domains/
  ├── admin/          # ADMIN_CORE universe
  │   └── services/
  │       └── lead.service.ts
  ├── crm/            # CRM universe
  │   └── services/
  │       └── lead.service.ts
  ├── support/        # SUPPORT universe
  │   └── services/
  │       └── lead.service.ts
  └── hr-payroll/     # HR_PAYROLL universe
      └── services/
          └── payroll.service.ts
```

## Principes

1. **Séparation par univers** : Chaque domaine correspond à un univers métier
2. **Services métier** : Encapsulent la logique spécifique à chaque univers
3. **Vérification d'univers** : Chaque service vérifie que l'utilisateur est dans le bon univers
4. **Réutilisabilité** : Les services peuvent être utilisés dans plusieurs endpoints

## Exemple d'utilisation

```typescript
// Dans un endpoint API
import { getUniverseContext } from "@/lib/universe-middleware"
import { CrmLeadService } from "@/domains/crm/services/lead.service"

export async function GET(req: Request) {
    const context = await getUniverseContext()
    
    if (!context) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const leads = await CrmLeadService.getAssignedLeads(context, {
            status: "NEW",
            search: "example",
        })
        
        return NextResponse.json(leads)
    } catch (error) {
        // Gestion d'erreur
    }
}
```

## Ajout d'un nouveau service

1. Créer le fichier dans le domaine approprié
2. Exporter une classe avec des méthodes statiques
3. Vérifier l'univers dans chaque méthode
4. Implémenter la logique métier spécifique


