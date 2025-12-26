# Migration Base de Données - DEMO_SCHEDULED et LOST

## 📋 Changements dans le schéma

Le schéma Prisma a été mis à jour pour ajouter deux nouveaux statuts :
- `DEMO_SCHEDULED` - Démo planifiée
- `LOST` - Lead perdu

## 🔧 Étapes de migration

### 1. Créer la migration

```bash
npx prisma migrate dev --name add_demo_scheduled_and_lost_status
```

### 2. Vérifier la migration

La migration devrait créer un fichier dans `prisma/migrations/` qui ajoute les nouveaux statuts à l'enum `LeadStatus`.

### 3. Régénérer le client Prisma

```bash
npx prisma generate
```

### 4. Vérifier que tout fonctionne

- Les endpoints API devraient fonctionner avec les nouveaux statuts
- Le dashboard commercial devrait afficher les nouvelles colonnes
- Les modals devraient permettre de sélectionner les nouveaux statuts

## ⚠️ Note importante

Si vous avez des données existantes avec des leads en statut `DEMO_DONE` qui avaient une `demoDate` mais pas de statut `DEMO_SCHEDULED`, vous pouvez les mettre à jour :

```sql
-- Optionnel : Mettre à jour les leads avec demoDate mais statut CONTACTED
UPDATE "Lead" 
SET status = 'DEMO_SCHEDULED' 
WHERE "demoDate" IS NOT NULL 
  AND status = 'CONTACTED';
```

## ✅ Vérification

Après la migration, vérifiez que :
- ✅ Les nouveaux statuts apparaissent dans les selects
- ✅ Le pipeline Kanban affiche la colonne "Démo planifiée"
- ✅ Les KPIs incluent `demoScheduledLeads`
- ✅ La planification de démo met le statut à `DEMO_SCHEDULED`


