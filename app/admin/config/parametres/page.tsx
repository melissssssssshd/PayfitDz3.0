import { Save, RefreshCw, Shield, Globe, Mail, Database, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ParametresPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">Paramètres Globaux</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">Configuration système de la plateforme</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-300 dark:border-slate-600 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
          <Button className="bg-payfit-600 dark:bg-lime-400 text-white dark:text-slate-900 hover:bg-payfit-700 dark:hover:bg-lime-500">
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-gray-100 dark:bg-slate-800">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="database">Base de données</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-payfit-600 dark:text-lime-400" />
                <CardTitle className="text-gray-900 dark:text-slate-50">Configuration Générale</CardTitle>
              </div>
              <CardDescription className="text-gray-600 dark:text-slate-400">
                Paramètres de base de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="appName" className="text-gray-700 dark:text-slate-300">
                    Nom de l'application
                  </Label>
                  <Input
                    id="appName"
                    defaultValue="PayFit"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appUrl" className="text-gray-700 dark:text-slate-300">
                    URL de base
                  </Label>
                  <Input
                    id="appUrl"
                    defaultValue="https://app.payfit.com"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-gray-700 dark:text-slate-300">
                    Fuseau horaire
                  </Label>
                  <Input
                    id="timezone"
                    defaultValue="Europe/Paris"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-700 dark:text-slate-300">
                    Langue par défaut
                  </Label>
                  <Input
                    id="language"
                    defaultValue="Français"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-slate-50">Mode maintenance</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      Activer le mode maintenance pour les utilisateurs
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-slate-50">Inscriptions publiques</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Autoriser les nouvelles inscriptions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-slate-50">Analytics</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Activer le suivi analytics</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-payfit-600 dark:text-lime-400" />
                <CardTitle className="text-gray-900 dark:text-slate-50">Sécurité</CardTitle>
              </div>
              <CardDescription className="text-gray-600 dark:text-slate-400">
                Gérez les paramètres de sécurité de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-gray-700 dark:text-slate-300">
                    Timeout de session (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    defaultValue="30"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts" className="text-gray-700 dark:text-slate-300">
                    Tentatives de connexion max
                  </Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    defaultValue="5"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength" className="text-gray-700 dark:text-slate-300">
                    Longueur minimale mot de passe
                  </Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    defaultValue="8"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry" className="text-gray-700 dark:text-slate-300">
                    Expiration mot de passe (jours)
                  </Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    defaultValue="90"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-slate-50">Authentification à deux facteurs</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      Exiger 2FA pour tous les administrateurs
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-slate-50">Force HTTPS</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Rediriger tout le trafic vers HTTPS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-slate-50">Audit logs</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      Enregistrer toutes les actions administratives
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-payfit-600 dark:text-lime-400" />
                <CardTitle className="text-gray-900 dark:text-slate-50">Configuration Email</CardTitle>
              </div>
              <CardDescription className="text-gray-600 dark:text-slate-400">
                Paramètres SMTP et notifications email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost" className="text-gray-700 dark:text-slate-300">
                    Serveur SMTP
                  </Label>
                  <Input
                    id="smtpHost"
                    defaultValue="smtp.payfit.com"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort" className="text-gray-700 dark:text-slate-300">
                    Port SMTP
                  </Label>
                  <Input
                    id="smtpPort"
                    defaultValue="587"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser" className="text-gray-700 dark:text-slate-300">
                    Utilisateur SMTP
                  </Label>
                  <Input
                    id="smtpUser"
                    defaultValue="noreply@payfit.com"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword" className="text-gray-700 dark:text-slate-300">
                    Mot de passe SMTP
                  </Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    defaultValue="••••••••"
                    className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-payfit-600 dark:text-lime-400" />
                <CardTitle className="text-gray-900 dark:text-slate-50">Base de données</CardTitle>
              </div>
              <CardDescription className="text-gray-600 dark:text-slate-400">
                Configuration et maintenance de la base de données
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                  <div>
                    <Label className="text-gray-900 dark:text-slate-50">Backup automatique quotidien</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Sauvegarde à 2:00 AM UTC</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                  <div>
                    <Label className="text-gray-900 dark:text-slate-50">Optimisation automatique</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Optimiser les tables chaque semaine</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                  <div>
                    <Label className="text-gray-900 dark:text-slate-50">Réplication</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Activer la réplication multi-région</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-payfit-600 dark:text-lime-400" />
                <CardTitle className="text-gray-900 dark:text-slate-50">Notifications Système</CardTitle>
              </div>
              <CardDescription className="text-gray-600 dark:text-slate-400">
                Gérez les alertes et notifications automatiques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Incidents critiques", description: "Alertes pour pannes système" },
                { label: "Nouvelle inscription", description: "Notifications nouvelles entreprises" },
                { label: "Paiements", description: "Alertes transactions et factures" },
                { label: "Rapports hebdomadaires", description: "Statistiques d'utilisation" },
                { label: "Mises à jour système", description: "Nouvelles versions disponibles" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50"
                >
                  <div>
                    <Label className="text-gray-900 dark:text-slate-50">{item.label}</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{item.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
