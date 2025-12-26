# Dashboard Commercial - PayFit Algérie

## 🎯 Vue d'ensemble

Dashboard CRM interne inspiré de PayFit, permettant aux commerciaux de gérer efficacement leurs leads et leurs démonstrations, tandis que l'administrateur conserve une vision globale et un contrôle stratégique du pipeline.

## 📊 Fonctionnalités principales

### 1. Vue Pipeline Kanban (`/sales/leads`)

Vue visuelle type Kanban avec colonnes :
- **Nouveaux** (NEW) - Leads fraîchement assignés
- **Contactés** (CONTACTED) - Leads avec lesquels on a eu un premier contact
- **Démo planifiée** (DEMO_SCHEDULED) - Démo programmée avec date/heure
- **Démo effectuée** (DEMO_DONE) - Démo réalisée, en attente de suivi
- **Fermés** (CLOSED) - Leads convertis
- **Perdus** (LOST) - Leads perdus

Chaque carte affiche :
- Nom et entreprise
- Wilaya
- Nombre d'employés
- Score du lead
- Date de démo (si planifiée)
- Dernière interaction

### 2. Dashboard principal (`/sales`)

**KPIs affichés** :
- Total Leads assignés
- Taux de conversion (CLOSED / total)
- Délai moyen avant démo (jours)
- Démos réalisées ce mois

**Répartition par statut** :
- Nouveaux
- Contactés
- Démo planifiée
- Démo effectuée
- Fermés
- Perdus

**Graphique** : Distribution des leads par statut (camembert)

### 3. Gestion complète d'un lead

#### Fiche détaillée (Drawer)
- **Informations** : Contact, entreprise, wilaya, effectif, besoins
- **Historique** : Toutes les interactions (appel, email, WhatsApp, visio)
- **Notes** : Notes internes du commercial

#### Actions disponibles
- ✅ Changer le statut
- ✅ Planifier une démo (avec lien visio)
- ✅ Ajouter une interaction (appel, email, WhatsApp, visio)
- ✅ Marquer la démo comme réalisée (avec compte-rendu)
- ✅ Ajouter des notes

#### Restrictions
- ❌ Ne peut pas voir les leads d'autres commerciaux
- ❌ Ne peut pas réassigner un lead
- ❌ Ne peut pas modifier des données globales

## 🎥 Gestion des démos commerciales

### Processus complet

1. **Planification** (`ScheduleDemoModal`)
   - Date et heure
   - Plateforme (Google Meet, Zoom, Jitsi, Autre)
   - Lien de visio (optionnel, stocké dans metadata)
   - Le statut passe automatiquement à `DEMO_SCHEDULED`

2. **Réalisation**
   - Le commercial fait la visio live
   - Présente : paie, congés, conformité CNAS, dashboard RH

3. **Compte-rendu** (`DemoDebriefModal`)
   - Marquer comme `DEMO_DONE`
   - Rédiger un compte-rendu
   - Points abordés, réactions, prochaines étapes

### Outils supportés

- **Google Meet** : Lien stocké dans metadata
- **Zoom** : Lien stocké dans metadata
- **Jitsi Meet** : Lien stocké dans metadata
- **Autre** : Lien personnalisé

## 📞 Gestion des interactions

### Types d'interactions

1. **Appel téléphonique** (CALL)
2. **Email** (EMAIL)
3. **WhatsApp** (WHATSAPP)
4. **Visio** (VIDEO)

### Enregistrement

Chaque interaction enregistre :
- Type
- Contenu/détails
- Date et heure
- Auteur (commercial)
- Mise à jour automatique de `lastInteraction`

## 🔐 Règles multiverse

### Commercial (CRM Universe)
- ✅ Voit uniquement ses leads assignés
- ✅ Peut gérer ses leads (statut, notes, interactions, démos)
- ❌ Ne peut pas voir les leads d'autres commerciaux
- ❌ Ne peut pas réassigner
- ❌ N'accède pas aux endpoints admin

### Admin (ADMIN_CORE Universe)
- ✅ Voit tous les leads
- ✅ Voit tous les commerciaux
- ✅ Peut assigner/réassigner les leads
- ✅ Suit les performances commerciales
- ✅ Accès à tous les endpoints

## 📈 KPIs calculés

### Pour le commercial
- **Total Leads** : Nombre de leads assignés
- **Taux de conversion** : (CLOSED / total) × 100
- **Délai moyen avant démo** : Jours entre création et planification
- **Démos ce mois** : Nombre de démos réalisées ce mois
- **Répartition par statut** : Breakdown visuel

### Pour l'admin (à implémenter)
- Performance par commercial
- Délai moyen avant démo (global)
- Taux de closing global
- Répartition des leads

## 🛠️ Endpoints API utilisés

### Commercial
- `GET /api/sales/leads` - Liste des leads assignés (filtrée automatiquement)
- `GET /api/sales/stats` - Statistiques du commercial
- `PATCH /api/sales/leads/[id]/status` - Mettre à jour le statut
- `POST /api/sales/leads/[id]/demo` - Planifier une démo
- `DELETE /api/sales/leads/[id]/demo` - Annuler une démo
- `POST /api/sales/leads/[id]/demo/done` - Marquer démo comme réalisée
- `POST /api/sales/leads/[id]/interactions` - Ajouter une interaction
- `GET /api/sales/leads/[id]/interactions` - Liste des interactions
- `POST /api/sales/leads/[id]/notes` - Ajouter une note
- `GET /api/sales/leads/[id]/notes` - Liste des notes

### Admin
- `GET /api/admin/leads` - Tous les leads
- `PATCH /api/admin/leads/[id]/assign` - Assigner/réassigner
- `GET /api/admin/sales-users` - Liste des commerciaux

## 🎨 Composants créés

1. **LeadDetailDrawer** - Fiche détaillée avec onglets
2. **ScheduleDemoModal** - Planification de démo avec lien visio
3. **AddInteractionModal** - Ajout d'interaction (appel, email, WhatsApp, visio)
4. **DemoDebriefModal** - Compte-rendu de démo
5. **Pipeline Kanban** - Vue pipeline visuelle (`/sales/leads`)

## 🔄 Workflow type

```
Lead assigné par Admin
     ↓
Commercial contacte (appel/email/WhatsApp)
     ↓
Statut → CONTACTED
     ↓
Planification démo (avec lien visio)
     ↓
Statut → DEMO_SCHEDULED
     ↓
Réalisation démo (visio live)
     ↓
Compte-rendu démo
     ↓
Statut → DEMO_DONE
     ↓
Suivi et closing
     ↓
Statut → CLOSED ou LOST
```

## ✅ Résultat

- ✅ CRM simple mais professionnel
- ✅ Processus commercial réaliste pour l'Algérie
- ✅ Expérience proche de PayFit
- ✅ Aucune sur-ingénierie
- ✅ Base solide pour intégrer plus tard (automatisation, IA, paiement)

---

**Le dashboard commercial est conçu comme un CRM interne inspiré de PayFit, permettant aux commerciaux de gérer efficacement leurs leads et leurs démonstrations, tandis que l'administrateur conserve une vision globale et un contrôle stratégique du pipeline.**


