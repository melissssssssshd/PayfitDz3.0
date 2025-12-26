"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Euro, Edit, Save, X, FileText } from "lucide-react"
import { useState } from "react"

export default function EmployeDetailPage() {
  const params = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nom: "Émilie Lambert",
    prenom: "Émilie",
    email: "emilie.lambert@example.com",
    telephone: "06 12 34 56 78",
    adresse: "12 rue de la Paix, 75002 Paris",
    dateNaissance: "15/03/1990",
    dateEmbauche: "28/09/2022",
    poste: "Cheffe de Projet",
    service: "Marketing",
    manager: "Sarah Dupont",
    typeContrat: "CDI",
    salaireBrut: "3500",
    salaireNet: "2625",
    soldeConges: "12",
  })

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-100 text-xl font-bold text-mint-700">
            EL
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{formData.nom}</h1>
            <p className="text-muted-foreground">{formData.poste}</p>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-primary/10 text-primary">Actif</Badge>
              <Badge variant="outline" className="bg-transparent">
                {formData.typeContrat}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
              <Button onClick={() => setIsEditing(false)}>
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

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="contrat">Contrat</TabsTrigger>
          <TabsTrigger value="absences">Absences</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Prénom</Label>
                    <Input value={formData.prenom} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Nom</Label>
                    <Input value={formData.nom} disabled={!isEditing} />
                  </div>
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input type="email" value={formData.email} disabled={!isEditing} />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Téléphone
                  </Label>
                  <Input value={formData.telephone} disabled={!isEditing} />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Adresse
                  </Label>
                  <Input value={formData.adresse} disabled={!isEditing} />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date de naissance
                  </Label>
                  <Input value={formData.dateNaissance} disabled={!isEditing} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Informations professionnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Poste</Label>
                  <Input value={formData.poste} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Service</Label>
                  <Input value={formData.service} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Manager</Label>
                  <Input value={formData.manager} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Date d'embauche</Label>
                  <Input value={formData.dateEmbauche} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Type de contrat</Label>
                  <Input value={formData.typeContrat} disabled={!isEditing} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contrat" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Euro className="h-5 w-5 text-primary" />
                  Rémunération
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Salaire brut mensuel</Label>
                  <Input value={formData.salaireBrut + " €"} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Salaire net mensuel (estimé)</Label>
                  <Input value={formData.salaireNet + " €"} disabled={!isEditing} />
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Éléments variables</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Prime d'objectifs</span>
                      <span className="font-semibold">200 €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Tickets restaurant</span>
                      <span className="font-semibold">9 €/jour</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Détails du contrat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Type</Label>
                    <p className="font-semibold">{formData.typeContrat}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Durée hebdomadaire</Label>
                    <p className="font-semibold">35 heures</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Date de début</Label>
                    <p className="font-semibold">{formData.dateEmbauche}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Ancienneté</Label>
                    <p className="font-semibold">2 ans 3 mois</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="absences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Solde de congés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 rounded-lg bg-mint-50">
                  <p className="text-3xl font-bold text-foreground">{formData.soldeConges}</p>
                  <p className="text-sm text-muted-foreground">Jours restants</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-sage-50">
                  <p className="text-3xl font-bold text-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Jours pris</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-forest-50">
                  <p className="text-3xl font-bold text-foreground">25</p>
                  <p className="text-sm text-muted-foreground">Total annuel</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Historique des absences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "Congé payé", dates: "15-20 juillet 2024", duree: "6 jours", statut: "Validée" },
                  { type: "RTT", dates: "12-14 août 2024", duree: "3 jours", statut: "Validée" },
                  { type: "Maladie", dates: "3 septembre 2024", duree: "1 jour", statut: "Validée" },
                ].map((absence, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{absence.type}</p>
                        <p className="text-sm text-muted-foreground">{absence.dates}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{absence.duree}</p>
                      <Badge className="bg-primary/10 text-primary mt-1">{absence.statut}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Documents de l'employé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { nom: "Contrat de travail CDI", date: "28/09/2022", taille: "245 KB" },
                  { nom: "Avenant salaire 2024", date: "01/01/2024", taille: "128 KB" },
                  { nom: "Attestation employeur", date: "15/11/2024", taille: "89 KB" },
                  { nom: "Fiche de poste", date: "28/09/2022", taille: "156 KB" },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-mint-50 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-mint-600" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.nom}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.date} • {doc.taille}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Télécharger
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Ajouter un document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
