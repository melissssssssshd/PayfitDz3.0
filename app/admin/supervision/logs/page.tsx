import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, CheckCircle, XCircle, Info, Search, Filter, Download } from "lucide-react"

export default function AdminLogsPage() {
  const logs = [
    {
      id: "LOG-001",
      timestamp: "2024-01-15 14:32:18",
      level: "info",
      user: "admin@payfit.com",
      action: "Création entreprise",
      details: "Nouvelle entreprise créée: TechCorp SAS",
      ip: "192.168.1.100",
    },
    {
      id: "LOG-002",
      timestamp: "2024-01-15 14:28:45",
      level: "warning",
      user: "system",
      action: "Performance",
      details: "Charge CPU élevée détectée: 85%",
      ip: "127.0.0.1",
    },
    {
      id: "LOG-003",
      timestamp: "2024-01-15 14:25:12",
      level: "success",
      user: "rh@example.com",
      action: "Validation congés",
      details: "15 demandes de congés validées",
      ip: "192.168.1.150",
    },
    {
      id: "LOG-004",
      timestamp: "2024-01-15 14:20:33",
      level: "error",
      user: "api@service.com",
      action: "API Request",
      details: "Échec connexion base de données - timeout",
      ip: "10.0.0.25",
    },
    {
      id: "LOG-005",
      timestamp: "2024-01-15 14:15:08",
      level: "info",
      user: "admin@payfit.com",
      action: "Backup",
      details: "Sauvegarde automatique complétée (2.4GB)",
      ip: "127.0.0.1",
    },
  ]

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "error":
        return <Badge variant="destructive">Erreur</Badge>
      case "warning":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Avertissement</Badge>
      case "success":
        return <Badge className="bg-[#D8F3DC] text-[#40916C] border-[#95D5B2]">Succès</Badge>
      case "info":
      default:
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-[#40916C]" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#081C15]">Logs d'Audit</h1>
        <p className="text-[#2D6A4F] mt-1">Consultation et analyse des logs système</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2D6A4F]" />
          <Input placeholder="Rechercher dans les logs..." className="pl-10 border-[#B7E4C7] focus:ring-[#52B788]" />
        </div>
        <Button variant="outline" className="border-[#B7E4C7] text-[#1B4332] bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filtrer
        </Button>
        <Button className="bg-[#52B788] hover:bg-[#40916C] text-white">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-white border-[#B7E4C7]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Info className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-[#081C15]">1,245</p>
                <p className="text-xs text-[#2D6A4F]">Info</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#B7E4C7]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-[#40916C]" />
              <div>
                <p className="text-2xl font-bold text-[#081C15]">892</p>
                <p className="text-xs text-[#2D6A4F]">Succès</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#B7E4C7]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-[#081C15]">34</p>
                <p className="text-xs text-[#2D6A4F]">Avertissements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#B7E4C7]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-[#081C15]">12</p>
                <p className="text-xs text-[#2D6A4F]">Erreurs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-[#B7E4C7]">
        <CardHeader>
          <CardTitle className="text-[#081C15]">Journal d'Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-[#B7E4C7] hover:bg-[#D8F3DC]/30 transition-colors"
              >
                <div className="mt-1">{getLevelIcon(log.level)}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getLevelBadge(log.level)}
                        <span className="text-xs text-[#2D6A4F]">{log.timestamp}</span>
                      </div>
                      <p className="font-medium text-[#081C15]">{log.action}</p>
                      <p className="text-sm text-[#2D6A4F] mt-1">{log.details}</p>
                    </div>
                    <Badge variant="outline" className="border-[#B7E4C7] text-[#2D6A4F] whitespace-nowrap">
                      {log.id}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#2D6A4F]">
                    <span>Utilisateur: {log.user}</span>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
