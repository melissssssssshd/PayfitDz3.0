"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, UserPlus, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function NouveauCollaborateurPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    adresse: "",
    ville: "",
    codePostal: "",
    poste: "",
    service: "",
    manager: "",
    dateEmbauche: "",
    typeContrat: "",
    salaireBrut: "",
    dureeHebdo: "35",
  })

  const handleSubmit = () => {
    console.log("Nouveau collaborateur:", formData)
    router.push("/dashboard/collaborateurs")
  }

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/collaborateurs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ajouter un collaborateur</h1>
          <p className="text-muted-foreground">Créez une nouvelle fiche employé</p>
        </div>
      </div>

      <div className="flex items-center justify-between max-w-2xl mx-auto mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
            </div>
            {s < 3 && <div className={`h-1 flex-1 mx-2 ${step > s ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Informations personnelles"}
            {step === 2 && "Informations professionnelles"}
            {step === 3 && "Contrat et rémunération"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Prénom *</Label>
                  <Input
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <Label>Nom *</Label>
                  <Input
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Email professionnel *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean.dupont@entreprise.fr"
                  />
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <Input
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <Label>Date de naissance *</Label>
                <Input
                  type="date"
                  value={formData.dateNaissance}
                  onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                />
              </div>

              <div>
                <Label>Adresse</Label>
                <Input
                  value={formData.adresse}
                  onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                  placeholder="12 rue de la Paix"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Ville</Label>
                  <Input
                    value={formData.ville}
                    onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                    placeholder="Paris"
                  />
                </div>
                <div>
                  <Label>Code postal</Label>
                  <Input
                    value={formData.codePostal}
                    onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
                    placeholder="75001"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label>Poste *</Label>
                <Input
                  value={formData.poste}
                  onChange={(e) => setFormData({ ...formData, poste: e.target.value })}
                  placeholder="Ex: Développeur Full Stack"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Service *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technique</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="rh">Ressources Humaines</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Manager</Label>
                  <Select
                    value={formData.manager}
                    onValueChange={(value) => setFormData({ ...formData, manager: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Dupont</SelectItem>
                      <SelectItem value="marie">Marie Martin</SelectItem>
                      <SelectItem value="julien">Julien Caron</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Date d'embauche *</Label>
                <Input
                  type="date"
                  value={formData.dateEmbauche}
                  onChange={(e) => setFormData({ ...formData, dateEmbauche: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Type de contrat *</Label>
                  <Select
                    value={formData.typeContrat}
                    onValueChange={(value) => setFormData({ ...formData, typeContrat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cdi">CDI</SelectItem>
                      <SelectItem value="cdd">CDD</SelectItem>
                      <SelectItem value="interim">Intérim</SelectItem>
                      <SelectItem value="stage">Stage</SelectItem>
                      <SelectItem value="alternance">Alternance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Durée hebdomadaire (heures) *</Label>
                  <Input
                    type="number"
                    value={formData.dureeHebdo}
                    onChange={(e) => setFormData({ ...formData, dureeHebdo: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Salaire brut mensuel (€) *</Label>
                <Input
                  type="number"
                  value={formData.salaireBrut}
                  onChange={(e) => setFormData({ ...formData, salaireBrut: e.target.value })}
                  placeholder="3500"
                />
              </div>

              <Card className="border-mint-200 bg-mint-50/50 mt-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-foreground">Ce qui sera créé automatiquement :</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Compte utilisateur avec accès employé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Email d'invitation avec identifiants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Solde de congés initial calculé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Fiche de paie prête pour le mois en cours</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
          Précédent
        </Button>

        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)}>Suivant</Button>
        ) : (
          <Button onClick={handleSubmit}>
            <UserPlus className="h-4 w-4 mr-2" />
            Créer le collaborateur
          </Button>
        )}
      </div>
    </div>
  )
}
