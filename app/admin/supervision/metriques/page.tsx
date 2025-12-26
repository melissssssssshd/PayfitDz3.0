import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Cpu, HardDrive, Network, Users, Zap } from "lucide-react"

export default function AdminMetriquesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#081C15]">Métriques Système</h1>
        <p className="text-[#2D6A4F] mt-1">Surveillance en temps réel des performances</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-white to-[#D8F3DC] border-[#B7E4C7]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#2D6A4F]">CPU Usage</CardTitle>
            <Cpu className="h-5 w-5 text-[#52B788]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#081C15]">45%</div>
            <div className="mt-3 w-full bg-[#D8F3DC] rounded-full h-2">
              <div className="bg-gradient-to-r from-[#52B788] to-[#40916C] h-2 rounded-full" style={{ width: "45%" }} />
            </div>
            <p className="text-xs text-[#2D6A4F] mt-2">8 cores actifs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-[#D8F3DC] border-[#B7E4C7]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#2D6A4F]">Mémoire RAM</CardTitle>
            <Activity className="h-5 w-5 text-[#52B788]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#081C15]">12.4 GB</div>
            <div className="mt-3 w-full bg-[#D8F3DC] rounded-full h-2">
              <div className="bg-gradient-to-r from-[#52B788] to-[#74C69D] h-2 rounded-full" style={{ width: "62%" }} />
            </div>
            <p className="text-xs text-[#2D6A4F] mt-2">62% de 20 GB utilisé</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-[#D8F3DC] border-[#B7E4C7]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#2D6A4F]">Stockage</CardTitle>
            <HardDrive className="h-5 w-5 text-[#52B788]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#081C15]">287 GB</div>
            <div className="mt-3 w-full bg-[#D8F3DC] rounded-full h-2">
              <div className="bg-gradient-to-r from-[#74C69D] to-[#95D5B2] h-2 rounded-full" style={{ width: "57%" }} />
            </div>
            <p className="text-xs text-[#2D6A4F] mt-2">57% de 500 GB utilisé</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-[#D8F3DC] border-[#B7E4C7]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#2D6A4F]">Bande Passante</CardTitle>
            <Network className="h-5 w-5 text-[#52B788]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#081C15]">124 MB/s</div>
            <div className="mt-3 flex gap-1 items-end h-12">
              {[45, 62, 38, 75, 58, 82, 67, 54, 71, 63].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#52B788] to-[#95D5B2] rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-[#D8F3DC] border-[#B7E4C7]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#2D6A4F]">Requêtes/seconde</CardTitle>
            <Zap className="h-5 w-5 text-[#52B788]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#081C15]">1,247</div>
            <div className="mt-3 flex gap-1 items-end h-12">
              {[52, 68, 45, 82, 71, 58, 64, 77, 53, 69].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#40916C] to-[#74C69D] rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-[#D8F3DC] border-[#B7E4C7]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#2D6A4F]">Utilisateurs Actifs</CardTitle>
            <Users className="h-5 w-5 text-[#52B788]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#081C15]">4,892</div>
            <div className="mt-3 flex gap-1 items-end h-12">
              {[38, 52, 48, 65, 58, 71, 62, 55, 68, 61].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#52B788] to-[#B7E4C7] rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-[#B7E4C7]">
        <CardHeader>
          <CardTitle className="text-[#081C15]">Services Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "API Gateway", status: "online", uptime: "99.9%", response: "45ms" },
              { name: "Database Primary", status: "online", uptime: "99.8%", response: "12ms" },
              { name: "Database Replica", status: "online", uptime: "99.7%", response: "15ms" },
              { name: "Cache Redis", status: "online", uptime: "100%", response: "3ms" },
              { name: "Email Service", status: "online", uptime: "99.5%", response: "125ms" },
              { name: "Storage S3", status: "online", uptime: "99.9%", response: "65ms" },
              { name: "CDN", status: "online", uptime: "100%", response: "22ms" },
              { name: "Analytics", status: "online", uptime: "99.6%", response: "88ms" },
            ].map((service, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg border border-[#B7E4C7] bg-gradient-to-r from-[#D8F3DC]/30 to-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#40916C]" />
                  <div>
                    <p className="font-medium text-[#081C15]">{service.name}</p>
                    <p className="text-xs text-[#2D6A4F]">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#52B788]">{service.response}</p>
                  <p className="text-xs text-[#2D6A4F]">latence</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
