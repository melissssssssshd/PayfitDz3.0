"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Download, FileSpreadsheet, AlertCircle } from "lucide-react"

export default function ImportEntreprisesPage() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Import massif d'entreprises
        </h1>
        <p className="text-gray-600 dark:text-slate-400">
          Importez plusieurs entreprises en une seule fois via un fichier CSV ou Excel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Télécharger le modèle</h2>
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
            Utilisez notre modèle pour préparer vos données correctement
          </p>
          <Button variant="outline" className="w-full bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Télécharger le modèle CSV
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Instructions</h2>
          <ul className="text-sm text-gray-600 dark:text-slate-400 space-y-2">
            <li>• Nom, SIRET et effectif sont obligatoires</li>
            <li>• Format de date: JJ/MM/AAAA</li>
            <li>• Maximum 1000 entreprises par import</li>
            <li>• Encodage UTF-8 requis</li>
          </ul>
        </Card>
      </div>

      <Card className="p-6 lg:p-8">
        <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg p-12 text-center">
          <FileSpreadsheet className="h-16 w-16 text-gray-400 dark:text-slate-500 mx-auto mb-4" />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Glissez-déposez votre fichier ici
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">ou cliquez pour sélectionner</p>

          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            id="file-upload"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Sélectionner un fichier
              </span>
            </Button>
          </label>

          {file && (
            <div className="mt-4 p-3 bg-payfit-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-payfit-600 dark:text-lime-400">Fichier sélectionné: {file.name}</p>
            </div>
          )}
        </div>

        {file && (
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setFile(null)}>
              Annuler
            </Button>
            <Button className="bg-payfit-600 hover:bg-payfit-700 dark:bg-lime-500 dark:hover:bg-lime-600">
              Lancer l'import
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-6 mt-6 bg-amber-50 dark:bg-slate-800/50 border-amber-200 dark:border-slate-700">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-900 dark:text-amber-400 mb-1">Attention</h3>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              L'import peut prendre plusieurs minutes selon la taille du fichier. Vous recevrez une notification quand
              le traitement sera terminé.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
