# Processus Hybride de Gestion des Demandes de Démo - PayFit DZ

## 🎯 Vue d'ensemble

Processus hybride combinant formulaire web localisé, webinars collectifs de pré-qualification et suivi CRM léger, optimisé pour les TPE/PME algériennes (1-250 employés).

## 📋 Workflow complet

```
Formulaire Web (/demo)
     ↓
Création Lead + Scoring automatique
     ↓
Notification (Email + WhatsApp)
     ↓
Invitation Webinar (si disponible)
     ↓
Webinar Collectif
     ↓
Présent ?
  ↙        ↘
Oui        Non
 ↓          ↓
Scoring+    Réinvitation
Qualification
 ↓
Routing automatique
  ↙        ↘        ↘
Chaud      Tiède    Froid
(≥70)      (40-69)  (<40)
 ↓          ↓        ↓
Assigné    Nurturing Réinvite
Sales      Auto     Webinar
 ↓
Démo 1:1
 ↓
Closing / Nurturing
```

## 🏗️ Architecture implémentée

### Services créés

#### 1. Lead Scoring Service (`domains/crm/services/lead-scoring.service.ts`)
- **Calcul du score** selon critères DZ :
  - Taille entreprise (40 pts max)
  - Secteur prioritaire (20 pts max)
  - Urgence paie (25 pts max)
  - Besoins spécifiques (15 pts max)
  - Solution actuelle (10 pts max)
  - Participation webinar (20 pts max)
- **Score max** : 130 points
- **Catégories** :
  - Chaud (≥70) : Assigné automatiquement
  - Tiède (40-69) : Nurturing
  - Froid (<40) : Réinvitation

#### 2. Webinar Service (`domains/crm/services/webinar.service.ts`)
- Création de webinars
- Inscription de leads
- Suivi de présence
- Mise à jour du score après participation
- Qualification automatique des leads chauds

#### 3. Lead Routing Service (`domains/crm/services/lead-routing.service.ts`)
- Routing automatique selon le score
- Assignation round-robin aux commerciaux
- Gestion des leads à réinviter

#### 4. Notification Service (`lib/notifications.ts`)
- Envoi WhatsApp (à intégrer avec API Business)
- Envoi Email (à intégrer avec service email)
- Envoi SMS (à intégrer avec service SMS)
- Support multilingue (FR/AR)

### Endpoints API créés

#### Leads
- `POST /api/leads` - Création avec scoring et routing automatique
- `POST /api/leads/[id]/route` - Routing manuel d'un lead

#### Webinars
- `GET /api/webinars` - Liste des webinars à venir
- `POST /api/webinars` - Créer un webinar
- `POST /api/webinars/[id]/register` - Inscrire un lead
- `POST /api/webinars/[id]/attendance` - Marquer la présence

### Formulaire de démo adapté

**Nouveaux champs DZ** :
- `employeeRange` : Tranche d'effectif (1-10, 11-50, 51-250)
- `payrollUrgency` : Urgence (END_OF_MONTH, NEXT_MONTH, EXPLORATION)
- `preferredLanguage` : Langue (FR, AR)

**Workflow** :
1. **Entreprise** : Nom, secteur, wilaya, type, tranche d'effectif
2. **Contact** : Prénom, nom, fonction, email, téléphone, langue
3. **Besoins** : Paie, CNAS, congés, urgence, solution actuelle
4. **Confirmation** : Envoi avec scoring automatique

## 🔄 Processus automatique

### 1. Soumission du formulaire
```typescript
POST /api/leads
→ Création du lead
→ Calcul du score initial
→ Routing automatique
→ Notification (Email + WhatsApp)
→ Invitation webinar (si disponible)
```

### 2. Inscription au webinar
```typescript
POST /api/webinars/[id]/register
→ Création de l'inscription
→ Mise à jour du compteur
```

### 3. Participation au webinar
```typescript
POST /api/webinars/[id]/attendance
→ Marquer comme présent
→ Augmenter le score (+15 à +20 pts)
→ Qualifier si score ≥ 70
→ Assigner automatiquement si chaud
```

### 4. Routing automatique
```typescript
POST /api/leads/[id]/route
→ Recalculer le score
→ Router selon catégorie :
  - Chaud → Assigner à commercial
  - Tiède → Nurturing
  - Froid → Réinvitation
```

## 📊 KPIs à suivre

1. **Taux de conversion formulaire → webinar** : % inscrits
2. **Taux de participation webinar** : Objectif 60-70%
3. **% leads qualifiés après webinar** : Score ≥ 70
4. **Délai moyen demande → démo 1:1** : Jours
5. **Taux de closing TPE/PME** : %

## 🔧 Intégrations à compléter

### WhatsApp Business API
- Intégrer avec API WhatsApp Business
- Configurer les templates de messages
- Gérer les réponses automatiques

### Service Email
- Intégrer Resend, SendGrid ou équivalent
- Créer les templates multilingues
- Configurer les webhooks

### Service SMS
- Intégrer Twilio ou équivalent
- Configurer les templates SMS
- Gérer les rappels de RDV

### CRM externe (optionnel)
- Synchronisation avec Zoho CRM / HubSpot
- Export des leads qualifiés
- Import des interactions

## 🎨 Différences clés vs. France

- ✅ **Priorité mobile** : WhatsApp en premier
- ✅ **Webinars plus petits** : 40-60 inscrits
- ✅ **Processus semi-automatisé** : Adapté à petite équipe
- ✅ **Argumentaire local** : Prix, simplicité, conformité CNAS
- ✅ **Cycle court** : Dépendant du timing paie

## 📝 Prochaines étapes

1. **Intégrer les APIs de notification** (WhatsApp, Email, SMS)
2. **Créer les templates multilingues** (FR/AR)
3. **Configurer les webhooks** pour automatisations
4. **Développer le dashboard de KPIs**
5. **Ajouter les rappels automatiques** (SMS, WhatsApp)

---

**Processus opérationnel et prêt pour l'intégration des services externes !** 🚀


