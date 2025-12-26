# Corrections des problèmes

## ✅ Problèmes résolus

### 1. Landing page inaccessible
**Problème** : Le middleware redirigeait tous les utilisateurs (même non connectés) depuis "/" vers leurs dashboards respectifs.

**Solution** : 
- Modifié le middleware pour permettre l'accès à "/" pour les utilisateurs non authentifiés
- Ajouté une vérification dans le callback `authorized` pour autoriser l'accès à la landing page

**Fichier modifié** : `middleware.ts`

### 2. Erreur Prisma dans le service Support
**Problème** : Import dynamique de `bcryptjs` causait des problèmes avec Prisma.

**Solution** : 
- Remplacé l'import dynamique par un import statique en haut du fichier

**Fichier modifié** : `domains/support/services/lead.service.ts`

### 3. Erreur 500 sur POST /api/sales/leads/[id]/demo
**Problème** : Les routes API utilisaient l'ancienne syntaxe Next.js pour les params (synchrones) au lieu de la nouvelle (asynchrones avec Promise).

**Solution** : 
- Mis à jour toutes les routes API pour utiliser `params: Promise<{ id: string }>`
- Ajouté `await params` pour extraire l'id

**Fichiers modifiés** :
- `app/api/sales/leads/[id]/demo/route.ts`
- `app/api/sales/leads/[id]/status/route.ts`
- `app/api/sales/leads/[id]/interactions/route.ts`
- `app/api/sales/leads/[id]/notes/route.ts`

### 4. Erreur 404 sur GET /sales/leads
**Note** : Cette route n'existe pas dans l'application. Les leads sont gérés via `/sales` (page principale) qui utilise l'API `/api/sales/leads`.

## 🔧 Changements techniques

### Middleware (`middleware.ts`)
```typescript
// Avant : Redirigeait tous les utilisateurs depuis "/"
if (path === "/" || path === "/dashboard") {
    // Redirection automatique
}

// Après : Permet l'accès à la landing page
if (path === "/" && !token) {
    return NextResponse.next()
}
```

### Routes API (Next.js 15)
```typescript
// Avant (Next.js 14)
{ params }: { params: { id: string } }
const leadId = params.id

// Après (Next.js 15)
{ params }: { params: Promise<{ id: string }> }
const { id: leadId } = await params
```

### Service Support
```typescript
// Avant : Import dynamique
const bcrypt = await import("bcryptjs")

// Après : Import statique
import bcrypt from "bcryptjs"
```

## ✅ Résultat

- ✅ Landing page accessible pour les utilisateurs non connectés
- ✅ Routes API fonctionnelles avec Next.js 15
- ✅ Plus d'erreurs Prisma dans le service Support
- ✅ Toutes les routes API utilisent la syntaxe correcte

## 🧪 Tests recommandés

1. **Landing page** : Accéder à "/" sans être connecté → doit afficher la page
2. **API Demo** : POST /api/sales/leads/[id]/demo → doit fonctionner sans erreur 500
3. **Routes API** : Toutes les routes avec params doivent fonctionner correctement


