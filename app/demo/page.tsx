"use client"

import { useState } from "react"
import {
  Container,
  Title,
  Text,
  TextInput,
  NumberInput,
  Select,
  MultiSelect,
  Textarea,
  Button,
  Card,
  Stack,
  Group,
  Box,
  Stepper,
  ThemeIcon,
  Paper,
  Checkbox,
  Switch,
  rem,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import {
  IconBuilding,
  IconUser,
  IconChecklist,
  IconMessageDots,
  IconCheck,
  IconArrowRight,
  IconDeviceDesktop,
} from "@tabler/icons-react"
import Link from "next/link"

const ALGERIAN_WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annabi", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
  "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt",
  "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane"
]

const COMPANY_TYPES = [
  { value: "PME", label: "PME" },
  { value: "STARTUP", label: "Startup" },
  { value: "CABINET", label: "Cabinet Comptable" },
  { value: "ADMIN_PRIVEE", label: "Administration Privée" },
  { value: "GRAND_COMPTE", label: "Grande Entreprise" },
]

const SECTORS = [
  "Technologie", "Services", "Commerce", "Industrie", "Santé", "BTP", "Éducation", "Hôtellerie", "Autre"
]

const NEEDS_OPTIONS = [
  { value: "PAIE", label: "Gestion de la paie algérienne" },
  { value: "DECLARATIONS", label: "Déclarations CNAS / CASNOS" },
  { value: "CONGES", label: "Gestion des congés et absences" },
  { value: "CONTRATS", label: "Contrats et dossiers employés" },
  { value: "POINTAGE", label: "Suivi du temps et pointage" },
]

export default function DemoRequestPage() {
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm({
    initialValues: {
      companyName: "",
      sector: "",
      wilaya: "",
      employees: 1,
      companyType: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      phone: "",
      needsPayroll: false,
      needsCNAS: false,
      needsLeaveManagement: false,
      currentSolution: "",
      // Champs spécifiques DZ
      employeeRange: "",
      payrollUrgency: "",
      preferredLanguage: "FR",
      // Legacy
      needs: [],
      problems: "",
    },
    validate: (values) => {
      if (active === 0) {
        return {
          companyName: values.companyName.length < 2 ? "Nom d'entreprise trop court" : null,
          sector: !values.sector ? "Veuillez choisir un secteur" : null,
          wilaya: !values.wilaya ? "Veuillez choisir une wilaya" : null,
          companyType: !values.companyType ? "Veuillez choisir un type" : null,
        }
      }
      if (active === 1) {
        return {
          firstName: values.firstName.length < 2 ? "Prénom requis" : null,
          lastName: values.lastName.length < 2 ? "Nom requis" : null,
          email: !/^\S+@\S+$/.test(values.email) ? "Email invalide" : null,
          phone: values.phone.length < 8 ? "Numéro de téléphone invalide" : null,
        }
      }
      return {}
    },
  })

  const nextStep = () => {
    const validation = form.validate()
    if (!validation.hasErrors) {
      setActive((current) => (current < 3 ? current + 1 : current))
    }
  }

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true)
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        setSubmitted(true)
        notifications.show({
          title: "Demande envoyée !",
          message: "Notre équipe commerciale vous contactera très prochainement.",
          color: "payfit",
        })
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      notifications.show({
        title: "Erreur",
        message: "Une erreur est survenue lors de l'envoi de votre demande.",
        color: "red",
      })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Container size="sm" py={100}>
        <Paper withBorder p={50} radius="lg" shadow="xl" style={{ textAlign: "center" }}>
          <ThemeIcon color="payfit" size={80} radius={80} mx="auto" mb="xl">
            <IconCheck size={40} />
          </ThemeIcon>
          <Title order={1} mb="md">Merci pour votre demande !</Title>
          <Text size="lg" c="dimmed" mb="xl">
            Votre demande de démo a bien été enregistrée. Un conseiller expert en paie algérienne
            va analyser vos besoins et vous contactera sous 24h ouvrées pour planifier
            une présentation personnalisée.
          </Text>
          <Button component={Link} href="/" color="payfit" size="lg" radius="md">
            Retour à l'accueil
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Box bg="gray.0" mih="100vh">
      <Container size="md" py={60}>
        <Stack gap={40}>
          <Box style={{ textAlign: "center" }}>
            <Group justify="center" mb="xl">
              <Box
                bg="payfit.6"
                p={8}
                style={{ borderRadius: "12px", display: "flex", alignItems: "center" }}
              >
                <IconDeviceDesktop size={32} color="white" />
              </Box>
            </Group>
            <Title order={1} fw={900} size={rem(42)} mb="xs" c="dark.9">
              Découvrez le futur de la paie en <Text span c="payfit.6" inherit>Algérie</Text>
            </Title>
            <Text size="lg" c="dimmed" maw={600} mx="auto">
              Rejoignez les entreprises qui modernisent leur gestion RH.
              Remplissez ce formulaire pour une démonstration personnalisée.
            </Text>
          </Box>

          <Card shadow="xl" radius="lg" p={0} withBorder style={{ overflow: "hidden" }}>
            <Group gap={0} grow align="stretch">
              <Box
                p={40}
                bg="payfit.6"
                visibleFrom="md"
                style={{
                  maxWidth: rem(320),
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <Title order={3} mb="xl" c="white">Pourquoi demander une démo ?</Title>
                <Stack gap="xl">
                  <Group wrap="nowrap" align="flex-start">
                    <ThemeIcon color="rgba(255,255,255,0.2)" radius="md">
                      <IconCheck size={18} />
                    </ThemeIcon>
                    <Text size="sm">Analyse de vos processus actuels</Text>
                  </Group>
                  <Group wrap="nowrap" align="flex-start">
                    <ThemeIcon color="rgba(255,255,255,0.2)" radius="md">
                      <IconCheck size={18} />
                    </ThemeIcon>
                    <Text size="sm">Présentation des modules paie & RH</Text>
                  </Group>
                  <Group wrap="nowrap" align="flex-start">
                    <ThemeIcon color="rgba(255,255,255,0.2)" radius="md">
                      <IconCheck size={18} />
                    </ThemeIcon>
                    <Text size="sm">Simulation sur vos cas spécifiques</Text>
                  </Group>
                  <Group wrap="nowrap" align="flex-start">
                    <ThemeIcon color="rgba(255,255,255,0.2)" radius="md">
                      <IconCheck size={18} />
                    </ThemeIcon>
                    <Text size="sm">Réponses à vos questions juridiques</Text>
                  </Group>
                </Stack>
              </Box>

              <Box p={{ base: 20, sm: 40 }} bg="white" style={{ flex: 1 }}>
                <Stepper active={active} onStepClick={setActive} color="payfit" size="sm" allowNextStepsSelect={false}>
                  <Stepper.Step icon={<IconBuilding size={18} />} label="Entreprise">
                    <Stack gap="md" mt="xl">
                      <TextInput
                        label="Nom de l'entreprise"
                        placeholder="Ex: SARL MaPaie"
                        required
                        {...form.getInputProps("companyName")}
                      />
                      <Group grow>
                        <Select
                          label="Secteur d'activité"
                          placeholder="Choisir..."
                          required
                          data={SECTORS}
                          {...form.getInputProps("sector")}
                        />
                        <Select
                          label="Wilaya"
                          placeholder="Choisir..."
                          required
                          searchable
                          data={ALGERIAN_WILAYAS}
                          {...form.getInputProps("wilaya")}
                        />
                      </Group>
                      <Group grow>
                        <Select
                          label="Type d'entreprise"
                          placeholder="Choisir..."
                          required
                          data={COMPANY_TYPES}
                          {...form.getInputProps("companyType")}
                        />
                        <NumberInput
                          label="Nombre d'employés"
                          placeholder="Ex: 25"
                          min={1}
                          {...form.getInputProps("employees")}
                        />
                      </Group>
                    </Stack>
                  </Stepper.Step>

                  <Stepper.Step icon={<IconUser size={18} />} label="Contact">
                    <Stack gap="md" mt="xl">
                      <Group grow>
                        <TextInput
                          label="Prénom"
                          placeholder="Ahmed"
                          required
                          {...form.getInputProps("firstName")}
                        />
                        <TextInput
                          label="Nom"
                          placeholder="Brahimi"
                          required
                          {...form.getInputProps("lastName")}
                        />
                      </Group>
                      <TextInput
                        label="Fonction / Poste"
                        placeholder="Responsable RH, Comptable..."
                        required
                        {...form.getInputProps("jobTitle")}
                      />
                      <TextInput
                        label="Email professionnel"
                        placeholder="ahmed@entreprise.dz"
                        required
                        {...form.getInputProps("email")}
                      />
                      <TextInput
                        label="Numéro de téléphone"
                        placeholder="0X XX XX XX XX"
                        required
                        {...form.getInputProps("phone")}
                      />
                      <Select
                        label="Langue préférée"
                        data={[
                          { value: "FR", label: "Français" },
                          { value: "AR", label: "العربية" },
                        ]}
                        {...form.getInputProps("preferredLanguage")}
                      />
                    </Stack>
                  </Stepper.Step>

                  <Stepper.Step icon={<IconChecklist size={18} />} label="Besoins">
                    <Stack gap="md" mt="xl">
                      <Text size="sm" fw={500}>Vos besoins prioritaires</Text>
                      <Switch
                        label="Gestion de la paie algérienne"
                        size="md"
                        color="payfit"
                        {...form.getInputProps("needsPayroll", { type: "checkbox" })}
                      />
                      <Switch
                        label="Déclarations CNAS / CASNOS"
                        size="md"
                        color="payfit"
                        {...form.getInputProps("needsCNAS", { type: "checkbox" })}
                      />
                      <Switch
                        label="Gestion des congés et absences"
                        size="md"
                        color="payfit"
                        {...form.getInputProps("needsLeaveManagement", { type: "checkbox" })}
                      />

                      <Select
                        label="Urgence de votre besoin"
                        placeholder="Choisir..."
                        data={[
                          { value: "END_OF_MONTH", label: "Fin de mois (urgent)" },
                          { value: "NEXT_MONTH", label: "Mois prochain" },
                          { value: "EXPLORATION", label: "Exploration (pas urgent)" },
                        ]}
                        {...form.getInputProps("payrollUrgency")}
                      />
                      <Textarea
                        label="Solution actuelle"
                        placeholder="Excel, cabinet externe, logiciel spécifique..."
                        description="Comment gérez-vous la paie aujourd'hui ?"
                        minRows={3}
                        {...form.getInputProps("currentSolution")}
                      />
                      <Text size="xs" c="dimmed">
                        En soumettant ce formulaire, vous acceptez que nos conseillers utilisent vos données pour vous recontacter dans le cadre de votre projet.
                      </Text>
                    </Stack>
                  </Stepper.Step>

                  <Stepper.Completed>
                    <Stack align="center" py="xl" gap="md">
                      <ThemeIcon size={60} radius={60} color="payfit" variant="light">
                        <IconMessageDots size={30} />
                      </ThemeIcon>
                      <Title order={3}>Prêt à envoyer ?</Title>
                      <Text c="dimmed" style={{ textAlign: "center" }} maw={400}>
                        Vérifiez vos informations une dernière fois. Cliquez sur le bouton ci-dessous pour confirmer votre demande de démo.
                      </Text>
                    </Stack>
                  </Stepper.Completed>
                </Stepper>

                <Group justify="space-between" mt="30">
                  {active !== 0 && (
                    <Button variant="default" onClick={prevStep}>
                      Précédent
                    </Button>
                  )}
                  {active < 3 ? (
                    <Button
                      color="payfit"
                      onClick={nextStep}
                      rightSection={<IconArrowRight size={16} />}
                      style={{ marginLeft: active === 0 ? "auto" : 0 }}
                    >
                      Suivant
                    </Button>
                  ) : (
                    <Button
                      color="payfit"
                      loading={loading}
                      onClick={() => handleSubmit(form.values)}
                      fullWidth
                    >
                      Confirmer ma demande de démo
                    </Button>
                  )}
                </Group>
              </Box>
            </Group>
          </Card>

          <Text size="xs" c="dimmed" style={{ textAlign: "center" }}>
            © 2025 PayFit Algérie. Tous droits réservés.
          </Text>
        </Stack>
      </Container>
    </Box>
  )
}
