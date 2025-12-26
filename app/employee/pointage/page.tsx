"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, LogIn, LogOut, Calendar, CheckCircle2, AlertTriangle } from "lucide-react"

export default function EmployeePointagePage() {
  const [isWorking, setIsWorking] = useState(false)
  const [todayEntry, setTodayEntry] = useState<string | null>(null)
  const [todayExit, setTodayExit] = useState<string | null>(null)

  const handlePointage = () => {
    const now = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })

    if (!isWorking) {
      setTodayEntry(now)
      setIsWorking(true)
    } else {
      setTodayExit(now)
      setIsWorking(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mon pointage</h1>
        <p className="text-muted-foreground">Gérez vos heures de travail</p>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-center">Pointage du jour</CardTitle>
          <p className="text-center text-sm text-muted-foreground">{new Date().toLocaleDateString("fr-FR")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-foreground mb-2">
              {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </div>
            <p className="text-sm text-muted-foreground">Heure actuelle</p>
          </div>

          <Button
            onClick={handlePointage}
            size="lg"
            className={`w-full h-16 text-lg ${
              isWorking ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isWorking ? (
              <>
                <LogOut className="h-6 w-6 mr-2" />
                Pointer la sortie
              </>
            ) : (
              <>
                <LogIn className="h-6 w-6 mr-2" />
                Pointer l'entrée
              </>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center p-4 rounded-lg bg-mint-50">
              <p className="text-sm text-muted-foreground mb-1">Entrée</p>
              <p className="text-2xl font-bold text-foreground">{todayEntry || "-"}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-sage-50">
              <p className="text-sm text-muted-foreground mb-1">Sortie</p>
              <p className="text-2xl font-bold text-foreground">{todayExit || "-"}</p>
            </div>
          </div>

          {isWorking && todayEntry && (
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <p className="text-sm text-muted-foreground mb-1">Temps de travail en cours</p>
              <p className="text-xl font-bold text-primary">7h 30min</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Historique de la semaine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { jour: "Lundi 16/12", entree: "08:55", sortie: "17:15", total: "7h20", statut: "normal" },
              { jour: "Mardi 17/12", entree: "09:05", sortie: "17:10", total: "7h05", statut: "normal" },
              { jour: "Mercredi 18/12", entree: "08:45", sortie: "17:00", total: "7h15", statut: "normal" },
              { jour: "Jeudi 19/12", entree: "09:20", sortie: "17:30", total: "7h10", statut: "retard" },
              {
                jour: "Vendredi 20/12",
                entree: todayEntry || "-",
                sortie: todayExit || "-",
                total: "-",
                statut: "en_cours",
              },
            ].map((jour, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{jour.jour}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <LogIn className="h-3 w-3" />
                      {jour.entree}
                    </span>
                    <span className="flex items-center gap-1">
                      <LogOut className="h-3 w-3" />
                      {jour.sortie}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{jour.total}</p>
                  </div>
                  {jour.statut === "normal" && (
                    <Badge className="bg-primary/10 text-primary">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Normal
                    </Badge>
                  )}
                  {jour.statut === "retard" && (
                    <Badge className="bg-orange-100 text-orange-700">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Retard
                    </Badge>
                  )}
                  {jour.statut === "en_cours" && (
                    <Badge className="bg-blue-100 text-blue-700">
                      <Clock className="h-3 w-3 mr-1" />
                      En cours
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Récapitulatif du mois
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-mint-50">
              <p className="text-3xl font-bold text-foreground">140h</p>
              <p className="text-sm text-muted-foreground mt-1">Heures travaillées</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-sage-50">
              <p className="text-3xl font-bold text-foreground">18</p>
              <p className="text-sm text-muted-foreground mt-1">Jours de présence</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-forest-50">
              <p className="text-3xl font-bold text-foreground">2</p>
              <p className="text-sm text-muted-foreground mt-1">Retards ce mois</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
