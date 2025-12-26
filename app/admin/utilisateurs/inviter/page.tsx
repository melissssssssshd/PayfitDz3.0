"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Mail, Send, X, CheckCircle2, AlertCircle, Copy, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InviterUtilisateursPage() {
  const [invitations, setInvitations] = useState<
    Array<{
      email: string
      role: string
      entreprise: string
    }>
  >([{ email: "", role: "", entreprise: "" }])
  const [sentInvitations, setSentInvitations] = useState<
    Array<{
      email: string
      role: string
      statut: string
      dateEnvoi: string
    }>
  >([
    { email: "jean.dupont@example.com", role: "RH", statut: "Acceptée", dateEnvoi: "15/12/2024" },
    { email: "marie.martin@example.com", role: "Admin", statut: "En attente", dateEnvoi: "16/12/2024" },
    { email: "pierre.durand@example.com", role: "RH", statut: "En attente", dateEnvoi: "17/12/2024" },
  ])

  const addInvitation = () => {
    setInvitations([...invitations, { email: "", role: "", entreprise: "" }])
  }

  const removeInvitation = (index: number) => {
    setInvitations(invitations.filter((_, i) => i !== index))
  }

  const updateInvitation = (index: number, field: string, value: string) => {
    const updated = [...invitations]
    updated[index] = { ...updated[index], [field]: value }
    setInvitations(updated)
  }

  const sendInvitations = () => {
    // Logic to send invitations
    console.log("Sending invitations:", invitations)
  }

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Inviter des utilisateurs</h1>
        <p className="text-muted-foreground">Invitez de nouveaux utilisateurs à rejoindre la plateforme PayFit</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Nouvelles invitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {invitations.map((invitation, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">Invitation #{index + 1}</Label>
                    {invitations.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeInvitation(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label>Adresse email *</Label>
                      <Input
                        type="email"
                        placeholder="nom@entreprise.fr"
                        value={invitation.email}
                        onChange={(e) => updateInvitation(index, "email", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Rôle *</Label>
                      <Select value={invitation.role} onValueChange={(value) => updateInvitation(index, "role", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="rh">RH</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="employe">Employé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Entreprise *</Label>
                        <Link href="/admin/entreprises/nouveau" className="text-xs text-primary hover:underline">
                          + Créer une entreprise
                        </Link>
                      </div>
                      <Select
                        value={invitation.entreprise}
                        onValueChange={(value) => updateInvitation(index, "entreprise", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="techcorp">TechCorp International</SelectItem>
                          <SelectItem value="greenenergy">GreenEnergy Solutions</SelectItem>
                          <SelectItem value="digital">Digital Services Pro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={addInvitation} className="w-full bg-transparent">
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter une invitation
              </Button>

              <div className="pt-4 border-t flex gap-3">
                <Button onClick={sendInvitations} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer les invitations
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Invitations envoyées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sentInvitations.map((inv, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{inv.email}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-muted-foreground">Rôle: {inv.role}</p>
                        <span className="text-muted-foreground">•</span>
                        <p className="text-sm text-muted-foreground">Envoyé le {inv.dateEnvoi}</p>
                      </div>
                    </div>
                    <Badge
                      className={
                        inv.statut === "Acceptée"
                          ? "bg-primary/10 text-primary"
                          : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                      }
                    >
                      {inv.statut === "Acceptée" ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {inv.statut}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-mint-200 bg-mint-50/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Rôles disponibles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-foreground mb-1">Admin</p>
                <p className="text-muted-foreground">Accès complet à toutes les fonctionnalités</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">RH</p>
                <p className="text-muted-foreground">Gestion des employés, paie et absences</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Manager</p>
                <p className="text-muted-foreground">Validation des demandes de son équipe</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Employé</p>
                <p className="text-muted-foreground">Accès limité à son profil personnel</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sage-200 bg-sage-50/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Mail className="h-5 w-5 text-sage-600" />
                Modèle d'email
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <p className="text-muted-foreground">L'invitation contiendra :</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span>Lien d'activation unique</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span>Instructions de connexion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span>Informations sur son rôle</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span>Valide 7 jours</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-forest-200 bg-forest-50/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Copy className="h-5 w-5 text-forest-600" />
                Lien d'invitation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Vous pouvez aussi partager un lien générique :</p>
              <div className="flex gap-2">
                <Input value="https://payfit.app/invite/abc123" readOnly className="text-xs" />
                <Button size="sm" variant="outline" className="bg-transparent flex-shrink-0">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
