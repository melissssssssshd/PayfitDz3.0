import { Check, X, Mail, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Incident critique détecté",
      message: "Le serveur API-01 ne répond plus. Intervention immédiate requise.",
      time: "Il y a 5 min",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "info",
      title: "Nouvelle entreprise inscrite",
      message: "TechCorp SAS vient de compléter son inscription (Plan Premium).",
      time: "Il y a 15 min",
      read: false,
      priority: "normal",
    },
    {
      id: 3,
      type: "success",
      title: "Backup complété",
      message: "La sauvegarde automatique quotidienne s'est terminée avec succès (2.4GB).",
      time: "Il y a 1h",
      read: true,
      priority: "low",
    },
    {
      id: 4,
      type: "warning",
      title: "Limite de stockage approchée",
      message: "Le stockage atteint 85% de sa capacité. Envisagez une extension.",
      time: "Il y a 2h",
      read: false,
      priority: "normal",
    },
    {
      id: 5,
      type: "info",
      title: "Mise à jour système disponible",
      message: "Une nouvelle version de PayFit (v3.2.5) est disponible.",
      time: "Il y a 3h",
      read: true,
      priority: "low",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "normal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">Notifications</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">Gérez toutes les notifications système</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-300 dark:border-slate-600 bg-transparent">
            <Check className="h-4 w-4 mr-2" />
            Tout marquer lu
          </Button>
          <Button variant="outline" className="border-gray-300 dark:border-slate-600 bg-transparent">
            <Mail className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-slate-300">Non lues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-slate-50">3</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-slate-300">Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-slate-50">12</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-slate-300">Critiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">1</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-slate-300">Cette semaine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-slate-50">47</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-gray-100 dark:bg-slate-800">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="unread">Non lues (3)</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-3">
            {notifications.map((notif) => (
              <Card
                key={notif.id}
                className={`bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 ${!notif.read ? "border-l-4 border-l-payfit-600 dark:border-l-lime-400" : ""
                  }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-slate-50">{notif.title}</h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge className={getBadgeColor(notif.priority)}>{notif.priority}</Badge>
                          {!notif.read && <div className="w-2 h-2 rounded-full bg-payfit-600 dark:bg-lime-400" />}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">{notif.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-slate-500">{notif.time}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-payfit-600 dark:text-lime-400 hover:text-payfit-700 dark:hover:text-lime-300"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Marquer lu
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                            <X className="h-3 w-3 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          <div className="space-y-3">
            {notifications
              .filter((n) => !n.read)
              .map((notif) => (
                <Card
                  key={notif.id}
                  className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 border-l-4 border-l-payfit-600 dark:border-l-lime-400"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getIcon(notif.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-slate-50 mb-1">{notif.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">{notif.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
