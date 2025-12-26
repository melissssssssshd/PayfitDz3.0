"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar,
  CreditCard,
  Edit,
  Save,
  X,
  CheckCircle2,
  TrendingUp,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EntrepriseProfilPage() {
  const params = useParams()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nom: "TechCorp International",
    siret: "123 456 789 01234",
    effectif: "245",
    secteur: "Technologie",
    email: "contact@techcorp.fr",
    telephone: "01 45 67 89 01",
    adresse: "123 Avenue des Champs-Élysées",
    ville: "Paris",
    codePostal: "75008",
    plan: "Enterprise",
    dateCreation: "15/01/2023",
    statut: "Actif",
  })

  const handleSave = () => {
    // Save logic
    setIsEditing(false)
  }

  return (
    <div className="space-y-6 p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{formData.nom}</h1>
              <p className="text-sm text-muted-foreground">SIRET: {formData.siret}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {formData.statut}
            </Badge>
            <Badge variant="outline" className="bg-transparent">
              {formData.plan}
            </Badge>
            <Badge variant="outline" className="bg-transparent">
              {formData.effectif} employés
            </Badge>
          </div>
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="subscription">Abonnement</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Informations de l'entreprise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Nom de l'entreprise</Label>
                  <Input
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>SIRET</Label>
                  <Input value={formData.siret} disabled={!isEditing} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Effectif</Label>
                    <Input value={formData.effectif} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Secteur</Label>
                    <Input value={formData.secteur} disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Coordonnées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input value={formData.email} disabled={!isEditing} type="email" />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Téléphone
                  </Label>
                  <Input value={formData.telephone} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Adresse</Label>
                  <Input value={formData.adresse} disabled={!isEditing} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Ville</Label>
                    <Input value={formData.ville} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Code postal</Label>
                    <Input value={formData.codePostal} disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Informations complémentaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <Label className="text-sm text-muted-foreground">Date de création</Label>
                  <p className="text-lg font-semibold text-foreground mt-1">{formData.dateCreation}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Statut du compte</Label>
                  <p className="text-lg font-semibold text-foreground mt-1 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {formData.statut}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Dernière connexion</Label>
                  <p className="text-lg font-semibold text-foreground mt-1">Aujourd'hui, 14:23</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Plan actuel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm text-muted-foreground">Formule</Label>
                    <Badge className="bg-primary/10 text-primary">Enterprise</Badge>
                  </div>
                  <p className="text-3xl font-bold text-foreground">
                    199€<span className="text-base font-normal text-muted-foreground">/mois</span>
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <Label className="text-sm text-muted-foreground">Modules inclus</Label>
                  <ul className="mt-2 space-y-2">
                    {[
                      "Paie automatisée",
                      "Gestion des absences",
                      "Notes de frais",
                      "Entretiens annuels",
                      "Gestion documentaire",
                      "Support prioritaire",
                    ].map((module) => (
                      <li key={module} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{module}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Facturation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Prochaine facture</Label>
                  <p className="text-lg font-semibold text-foreground mt-1">15 janvier 2025</p>
                  <p className="text-2xl font-bold text-foreground mt-2">199,00 €</p>
                </div>
                <div className="pt-4 border-t">
                  <Label className="text-sm text-muted-foreground">Historique des paiements</Label>
                  <div className="mt-3 space-y-3">
                    {[
                      { date: "15/12/2024", montant: "199,00 €", statut: "Payé" },
                      { date: "15/11/2024", montant: "199,00 €", statut: "Payé" },
                      { date: "15/10/2024", montant: "199,00 €", statut: "Payé" },
                    ].map((paiement, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="text-sm font-medium">{paiement.date}</p>
                          <p className="text-xs text-muted-foreground">{paiement.statut}</p>
                        </div>
                        <p className="font-semibold">{paiement.montant}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="mt-3 p-0">
                    Voir tout l'historique →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Utilisateurs actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    nom: "Jean Dupont",
                    email: "jean.dupont@techcorp.fr",
                    role: "Admin",
                    lastLogin: "Aujourd'hui, 14:23",
                  },
                  {
                    nom: "Marie Martin",
                    email: "marie.martin@techcorp.fr",
                    role: "RH",
                    lastLogin: "Aujourd'hui, 11:45",
                  },
                  { nom: "Pierre Durand", email: "pierre.durand@techcorp.fr", role: "RH", lastLogin: "Hier, 16:30" },
                  {
                    nom: "Sophie Bernard",
                    email: "sophie.bernard@techcorp.fr",
                    role: "Manager",
                    lastLogin: "Hier, 09:15",
                  },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {user.nom
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.nom}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-transparent mb-1">
                        {user.role}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{user.lastLogin}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Bulletins générés</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">2,940</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-primary">+12%</span> vs mois dernier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Demandes d'absence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-primary">+8%</span> ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Notes de frais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">89</p>
                <p className="text-sm text-muted-foreground mt-2">Ce mois-ci</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "Bulletin de paie généré", user: "Système", time: "Il y a 2h", type: "success" },
                  { action: "Nouvel employé ajouté", user: "Marie Martin", time: "Il y a 5h", type: "info" },
                  { action: "Demande d'absence validée", user: "Sophie Bernard", time: "Hier", type: "info" },
                  { action: "Note de frais approuvée", user: "Jean Dupont", time: "Hier", type: "success" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "success" ? "bg-primary" : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
