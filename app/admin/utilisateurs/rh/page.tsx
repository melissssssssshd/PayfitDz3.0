"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, TrendingUp } from "lucide-react"

export default function RHPage() {
  const rhManagers = [
    { id: 1, name: "Julie Moreau", company: "TechCorp", employees: 145, status: "Actif" },
    { id: 2, name: "Marc Petit", company: "Retail Plus", employees: 89, status: "Actif" },
    { id: 3, name: "Laura Blanc", company: "Services Inc", employees: 203, status: "Actif" },
  ]

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">Gestionnaires RH</h1>
        <p className="text-gray-600 dark:text-slate-400">{rhManagers.length} gestionnaires RH actifs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <Users className="h-8 w-8 text-payfit-600 dark:text-lime-500 mb-4" />
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Total gestionnaires</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{rhManagers.length}</p>
        </Card>
        <Card className="p-6">
          <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Entreprises gérées</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{rhManagers.length}</p>
        </Card>
        <Card className="p-6">
          <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-4" />
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Employés sous gestion</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {rhManagers.reduce((acc, r) => acc + r.employees, 0)}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {rhManagers.map((rh) => (
            <div
              key={rh.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {rh.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{rh.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400">{rh.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{rh.employees} employés</p>
                  <Badge variant="default" className="mt-1">
                    {rh.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
