import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users2, Plus, ArrowRight } from "lucide-react"

const meetings = [
  {
    id: 1,
    type: "one-on-one",
    title: "Emma / Franck - 1:1",
    date: "15/03/2022",
    status: "En attente de vos réponses",
    initials: "EF",
  },
]

const campaigns = [
  {
    id: 1,
    type: "annual",
    title: "S1 2022 - entretien annuel",
    date: "10/03/2022",
    icon: Users2,
  },
]

const previousMeetings = [
  {
    id: 1,
    title: "Emma / Franck - 1:1",
    date: "15/02/2022",
    initials: "EF",
  },
  {
    id: 2,
    title: "Emma / Franck - 1:1",
    date: "15/01/2022",
    initials: "EF",
  },
]

export default function EntretiensPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Mes 1:1 et entretiens</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Créer un 1:1
          </Button>
          <Button className="bg-mint-600 text-white hover:bg-mint-600/90">
            <Plus className="mr-2 h-4 w-4" />
            Créer une campagne
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-mint-100 text-mint-700">JM</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-sage-100 text-sage-700">SA</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-forest-100 text-forest-700">TL</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-transparent">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>À remplir</CardTitle>
        </CardHeader>
        <CardContent>
          {meetings.map((meeting) => (
            <div key={meeting.id} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/30">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-mint-100 text-mint-700">{meeting.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{meeting.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{meeting.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-mint-100 text-mint-700">{meeting.status}</Badge>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5 text-mint-600" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campagnes d'entretiens</CardTitle>
        </CardHeader>
        <CardContent>
          {campaigns.map((campaign) => {
            const Icon = campaign.icon
            return (
              <div
                key={campaign.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint-100">
                    <Icon className="h-5 w-5 text-mint-600" />
                  </div>
                  <div>
                    <p className="font-medium">{campaign.title}</p>
                    <p className="text-sm text-muted-foreground">{campaign.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5 text-mint-600" />
                </Button>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Réunions 1:1</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {previousMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/30"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-mint-100 text-mint-700">{meeting.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{meeting.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{meeting.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5 text-mint-600" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-mint-200 bg-mint-50">
        <CardContent className="p-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-mint-100">
            <img src="/clipboard-with-checkmark.jpg" alt="Review icon" className="h-10 w-10" />
          </div>
          <h3 className="mb-2 text-xl font-bold">Revue des objectifs</h3>
          <CardDescription className="mb-4">
            Demandez à vos collaborateurs de mettre à jour leurs objectifs.
          </CardDescription>
          <div className="mb-4 rounded-lg bg-white p-4">
            <p className="mb-2 text-sm font-medium">Module complémentaire</p>
            <div className="flex items-center justify-between">
              <p className="text-sm">Activé</p>
              <div className="h-6 w-10 rounded-full bg-mint-600"></div>
            </div>
          </div>
          <Button variant="ghost" className="text-mint-600 hover:text-mint-700">
            En savoir plus
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
