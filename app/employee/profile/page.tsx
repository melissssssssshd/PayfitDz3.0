"use client"

import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#FAFCFB] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-[#1E3A2A] md:text-3xl">Mon profil</h1>
          <Button className="bg-[#7ED957] hover:bg-[#6BC847] text-[#1E3A2A]">
            <Edit className="mr-2 h-4 w-4" />
            Modifier le profil
          </Button>
        </div>

        {/* Profile card */}
        <Card className="mb-6 border-[#E0EDE5]">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-[#7ED957] text-2xl font-bold text-white">CD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="mb-2 text-2xl font-bold text-[#1E3A2A]">Catherine Dupont</h2>
                <p className="mb-3 text-lg text-[#5A7D6F]">Employée</p>
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge className="bg-[#7ED957] text-[#1E3A2A]">Temps plein</Badge>
                  <Badge variant="outline" className="border-[#2D5F3F] text-[#2D5F3F]">
                    CDI
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact information */}
        <Card className="mb-6 border-[#E0EDE5]">
          <CardHeader>
            <CardTitle className="text-lg text-[#1E3A2A]">Informations de contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 flex-shrink-0 text-[#5A7D6F]" />
              <div>
                <p className="text-sm text-[#5A7D6F]">Email</p>
                <p className="font-medium text-[#1E3A2A]">catherine.dupont@acmestudio.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 flex-shrink-0 text-[#5A7D6F]" />
              <div>
                <p className="text-sm text-[#5A7D6F]">Téléphone</p>
                <p className="font-medium text-[#1E3A2A]">+33 6 12 34 56 78</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 flex-shrink-0 text-[#5A7D6F]" />
              <div>
                <p className="text-sm text-[#5A7D6F]">Adresse</p>
                <p className="font-medium text-[#1E3A2A]">45 Rue de la République, 75011 Paris</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional information */}
        <Card className="border-[#E0EDE5]">
          <CardHeader>
            <CardTitle className="text-lg text-[#1E3A2A]">Informations professionnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 flex-shrink-0 text-[#5A7D6F]" />
              <div>
                <p className="text-sm text-[#5A7D6F]">Poste</p>
                <p className="font-medium text-[#1E3A2A]">Employée</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 flex-shrink-0 text-[#5A7D6F]" />
              <div>
                <p className="text-sm text-[#5A7D6F]">Manager</p>
                <p className="font-medium text-[#1E3A2A]">Emma Dupont</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 flex-shrink-0 text-[#5A7D6F]" />
              <div>
                <p className="text-sm text-[#5A7D6F]">Date d'entrée</p>
                <p className="font-medium text-[#1E3A2A]">15 janvier 2022</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 flex-shrink-0 text-[#5A7D6F]" />
              <div>
                <p className="text-sm text-[#5A7D6F]">Équipe</p>
                <p className="font-medium text-[#1E3A2A]">Marketing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
