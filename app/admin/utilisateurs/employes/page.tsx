"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Users, UserCheck, UserX } from "lucide-react"

export default function EmployesPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">Employés</h1>
        <p className="text-gray-600 dark:text-slate-400">Vue d'ensemble de tous les employés</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <Users className="h-8 w-8 text-payfit-600 dark:text-lime-500 mb-4" />
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Total employés</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">45,892</p>
        </Card>
        <Card className="p-6">
          <UserCheck className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" />
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Actifs</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">44,201</p>
        </Card>
        <Card className="p-6">
          <UserX className="h-8 w-8 text-red-600 dark:text-red-400 mb-4" />
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Inactifs</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">1,691</p>
        </Card>
        <Card className="p-6">
          <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Croissance</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">+8%</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Répartition par entreprise</h2>
        <div className="space-y-4">
          {[
            { name: "TechCorp", count: 8234, percent: 18 },
            { name: "Retail Plus", count: 6891, percent: 15 },
            { name: "Services Inc", count: 5432, percent: 12 },
            { name: "Design Studio", count: 4123, percent: 9 },
          ].map((item) => (
            <div key={item.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-slate-300">{item.name}</span>
                <span className="font-medium text-gray-900 dark:text-white">{item.count} employés</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-payfit-600 dark:bg-lime-500" style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
