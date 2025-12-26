"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Calendar, Mail, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function DemoConfirmationPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-background to-sage-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <Card className="p-8 lg:p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-foreground">Demande envoyée avec succès !</h1>

            <p className="mb-8 text-lg text-muted-foreground">
              Merci pour votre intérêt. Un conseiller PayFit vous contactera sous 24h pour organiser votre démonstration
              personnalisée.
            </p>

            <div className="mb-8 space-y-4">
              <Card className="border-mint-200 bg-mint-50/50 p-6">
                <div className="flex items-start gap-4">
                  <Calendar className="h-6 w-6 text-primary mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-1">Prochaines étapes</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Analyse de vos besoins spécifiques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Présentation des fonctionnalités adaptées</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Proposition tarifaire personnalisée</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-sage-200 bg-sage-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-sage-600" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Email de confirmation</p>
                      <p className="text-xs text-muted-foreground">Envoyé à votre adresse</p>
                    </div>
                  </div>
                </Card>

                <Card className="border-forest-200 bg-forest-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-forest-600" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Appel téléphonique</p>
                      <p className="text-xs text-muted-foreground">Dans les 24 heures</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Retour à l'accueil
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Se connecter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {countdown > 0 && (
              <p className="mt-6 text-sm text-muted-foreground">Redirection automatique dans {countdown}s...</p>
            )}
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">Des questions ? Contactez-nous</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="tel:0145234567" className="text-primary hover:underline">
                📞 01 45 23 45 67
              </a>
              <a href="mailto:contact@payfit.com" className="text-primary hover:underline">
                ✉️ contact@payfit.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
