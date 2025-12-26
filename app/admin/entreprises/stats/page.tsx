"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Building2, Users, Euro, Activity } from "lucide-react"

export default function EntreprisesStatsPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Statistiques des entreprises
        </h1>
        <p className="text-gray-600 dark:text-slate-400">Vue d'ensemble détaillée des entreprises clientes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Building2 className="h-8 w-8 text-payfit-600 dark:text-lime-500" />
            <span className="flex items-center text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12%
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Total entreprises</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">1,247</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="flex items-center text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              +8%
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Employés totaux</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">45,892</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Euro className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <span className="flex items-center text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              +15%
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">MRR</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">€124K</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <span className="flex items-center text-sm text-red-600 dark:text-red-400">
              <TrendingDown className="h-4 w-4 mr-1" />
              -2%
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Taux de churn</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">3.2%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Par secteur d'activité</h2>
          <div className="space-y-4">
            {[
              { secteur: "Technologie", count: 342, percent: 27.4 },
              { secteur: "Services", count: 298, percent: 23.9 },
              { secteur: "Commerce", count: 245, percent: 19.6 },
              { secteur: "Industrie", count: 189, percent: 15.2 },
              { secteur: "Santé", count: 173, percent: 13.9 },
            ].map((item) => (
              <div key={item.secteur}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-slate-300">{item.secteur}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.count}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-payfit-600 dark:bg-lime-500" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Par taille d'entreprise</h2>
          <div className="space-y-4">
            {[
              { taille: "1-10 employés", count: 487, percent: 39.1 },
              { taille: "11-50 employés", count: 398, percent: 31.9 },
              { taille: "51-200 employés", count: 234, percent: 18.8 },
              { taille: "201-500 employés", count: 89, percent: 7.1 },
              { taille: "500+ employés", count: 39, percent: 3.1 },
            ].map((item) => (
              <div key={item.taille}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-slate-300">{item.taille}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.count}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-payfit-600 dark:bg-lime-500" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tendances mensuelles</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {[65, 72, 68, 78, 85, 92, 88, 95, 102, 108, 115, 124].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-payfit-600 dark:bg-lime-500 rounded-t"
                style={{ height: `${(value / 124) * 100}%` }}
              />
              <span className="text-xs text-gray-600 dark:text-slate-400 mt-2">
                {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
