"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Check } from "lucide-react"

export default function NewEntreprisePage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nom: "",
    siret: "",
    effectif: "",
    secteur: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    codePostal: "",
  })

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Créer une nouvelle entreprise
        </h1>
        <p className="text-gray-600 dark:text-slate-400">Ajoutez une nouvelle entreprise cliente au système</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s
                  ? "bg-payfit-600 dark:bg-lime-500 text-white"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-400"
                  }`}
              >
                {step > s ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 ${step > s ? "bg-payfit-600 dark:bg-lime-500" : "bg-gray-200 dark:bg-slate-700"
                    }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="p-6 lg:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Informations générales</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Nom de l'entreprise *</Label>
                <Input
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Ex: Tech Solutions SAS"
                />
              </div>

              <div>
                <Label>SIRET *</Label>
                <Input
                  value={formData.siret}
                  onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                  placeholder="000 000 000 00000"
                />
              </div>

              <div>
                <Label>Effectif *</Label>
                <select
                  value={formData.effectif}
                  onChange={(e) => setFormData({ ...formData, effectif: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Sélectionner...</option>
                  <option value="1-10">1-10 employés</option>
                  <option value="11-50">11-50 employés</option>
                  <option value="51-200">51-200 employés</option>
                  <option value="201-500">201-500 employés</option>
                  <option value="500+">500+ employés</option>
                </select>
              </div>

              <div>
                <Label>Secteur d'activité *</Label>
                <select
                  value={formData.secteur}
                  onChange={(e) => setFormData({ ...formData, secteur: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Sélectionner...</option>
                  <option value="tech">Technologie</option>
                  <option value="retail">Commerce</option>
                  <option value="services">Services</option>
                  <option value="industry">Industrie</option>
                  <option value="health">Santé</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Coordonnées</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@entreprise.fr"
                />
              </div>

              <div>
                <Label>Téléphone *</Label>
                <Input
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  placeholder="01 23 45 67 89"
                />
              </div>

              <div className="md:col-span-2">
                <Label>Adresse *</Label>
                <Input
                  value={formData.adresse}
                  onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                  placeholder="123 rue de la Paix"
                />
              </div>

              <div>
                <Label>Ville *</Label>
                <Input
                  value={formData.ville}
                  onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                  placeholder="Paris"
                />
              </div>

              <div>
                <Label>Code postal *</Label>
                <Input
                  value={formData.codePostal}
                  onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
                  placeholder="75001"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Configuration</h2>

            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Plan tarifaire</h3>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-800 dark:text-white">
                  <option>Starter - 29€/mois</option>
                  <option>Business - 79€/mois</option>
                  <option>Enterprise - 199€/mois</option>
                </select>
              </div>

              <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Modules activés</h3>
                <div className="space-y-2">
                  {["Paie", "Absences", "Notes de frais", "Entretiens", "Documents"].map((module) => (
                    <label key={module} className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm text-gray-700 dark:text-slate-300">{module}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
          <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
            Précédent
          </Button>

          <div className="flex items-center gap-4">
            {step === 3 && (
              <Link href="/admin/utilisateurs/inviter" className="text-sm text-muted-foreground hover:text-primary">
                Inviter des utilisateurs d'abord ?
              </Link>
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                className="bg-payfit-600 hover:bg-payfit-700 dark:bg-lime-500 dark:hover:bg-lime-600"
              >
                Suivant
              </Button>
            ) : (
              <Button className="bg-payfit-600 hover:bg-payfit-700 dark:bg-lime-500 dark:hover:bg-lime-600">
                <Building2 className="h-4 w-4 mr-2" />
                Créer l'entreprise
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
