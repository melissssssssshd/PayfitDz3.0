"use client"

import { useState } from "react"
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Box,
  Card,
  Text,
  Title,
  Stack,
  Container,
  SimpleGrid,
  ThemeIcon,
  Badge,
  rem,
  Select,
  Image,
  Checkbox,
  UnstyledButton,
} from "@mantine/core"
import {
  IconFileText,
  IconBriefcase,
  IconCheck,
  IconUsers,
  IconArrowRight,
  IconArrowLeft,
} from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const router = useRouter()
  const [active, setActive] = useState(0)
  const [formData, setFormData] = useState({
    payrollMethod: "",
    employeeCount: "",
    siret: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sector: "",
    location: "",
  })

  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  const handleFinish = () => {
    router.push("/dashboard")
  }

  return (
    <Box bg="gray.0" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Box component="header" py="md" bg="white" style={{ borderBottom: `1px solid var(--mantine-color-gray-2)` }}>
        <Container size="lg">
          <Group justify="space-between">
            <Group gap="sm">
              <ThemeIcon size={32} radius="md" color="payfit.6" variant="filled">
                <Text fw={800} size="sm">P</Text>
              </ThemeIcon>
              <Text fw={800} size="lg" c="dark.9">PayFit</Text>
            </Group>
            <Badge color="payfit" variant="light" visibleFrom="sm" size="lg">
              1er mois offert • Sans engagement
            </Badge>
          </Group>
        </Container>
      </Box>

      <Container size="md" py={60}>
        <Card shadow="sm" radius="lg" p={40} withBorder>
          <Stepper
            active={active}
            onStepClick={setActive}
            color="payfit.6"
            size="sm"
            allowNextStepsSelect={false}
          >
            <Stepper.Step
              label="Méthode de paie"
              description="Votre situation"
              icon={<IconFileText size={18} />}
            />
            <Stepper.Step
              label="Collaborateurs"
              description="Taille d'entreprise"
              icon={<IconUsers size={18} />}
            />
            <Stepper.Step
              label="Finalisation"
              description="Vos coordonnées"
              icon={<IconCheck size={18} />}
            />
          </Stepper>

          <Box mt={50}>
            {active === 0 && (
              <Stack gap="xl">
                <Stack gap={5} ta="center">
                  <Title order={2} fw={800}>Comment gérez-vous actuellement la paie ?</Title>
                  <Text c="dimmed">Bénéficiez d'un accompagnement sur mesure selon votre profil.</Text>
                </Stack>

                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                  <MethodCard
                    icon={IconFileText}
                    title="Pas de bulletins"
                    description="Mon entreprise n'a pas encore émis de fiches de paie."
                    active={formData.payrollMethod === "no-payslips"}
                    onClick={() => setFormData({ ...formData, payrollMethod: "no-payslips" })}
                  />
                  <MethodCard
                    icon={IconBriefcase}
                    title="Expert Comptable"
                    description="Je délègue ma paie à un cabinet externe."
                    active={formData.payrollMethod === "accountant"}
                    onClick={() => setFormData({ ...formData, payrollMethod: "accountant" })}
                  />
                  <MethodCard
                    icon={IconUsers}
                    title="Logiciel / Interne"
                    description="J'utilise déjà un outil ou je gère ça moi-même."
                    active={formData.payrollMethod === "software"}
                    onClick={() => setFormData({ ...formData, payrollMethod: "software" })}
                  />
                </SimpleGrid>

                <Card bg="payfit.0" p="lg" radius="md">
                  <Group wrap="nowrap">
                    <ThemeIcon color="payfit.6" variant="light" size="lg">
                      <IconCheck size={20} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700} size="sm">C'est votre toute première paie ?</Text>
                      <Text size="xs" c="payfit.9">Profitez de notre offre "Starter" conçue pour les jeunes entreprises.</Text>
                    </Box>
                  </Group>
                </Card>
              </Stack>
            )}

            {active === 1 && (
              <Stack gap="xl">
                <Stack gap={5} ta="center">
                  <Title order={2} fw={800}>Combien de collaborateurs employez-vous ?</Title>
                  <Text c="dimmed">Nous adaptons nos fonctionnalités à la taille de votre équipe.</Text>
                </Stack>

                <SimpleGrid cols={{ base: 2, sm: 5 }} spacing="md">
                  {["0-3", "4-9", "10-24", "25-99", "100+"].map((count) => (
                    <UnstyledButton
                      key={count}
                      onClick={() => setFormData({ ...formData, employeeCount: count })}
                      style={{
                        padding: '20px',
                        border: `2px solid ${formData.employeeCount === count ? 'var(--mantine-color-payfit-6)' : 'var(--mantine-color-gray-2)'}`,
                        borderRadius: '12px',
                        textAlign: 'center',
                        backgroundColor: formData.employeeCount === count ? 'var(--mantine-color-payfit-0)' : 'white',
                        transition: 'all 200ms ease'
                      }}
                    >
                      <Stack align="center" gap="xs">
                        <Text fw={formData.employeeCount === count ? 800 : 600} size="lg">{count}</Text>
                        <Text size="xs" c="dimmed">Salariés</Text>
                      </Stack>
                    </UnstyledButton>
                  ))}
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                  <Card p="lg" withBorder radius="md">
                    <Group mb="xs">
                      <ThemeIcon color="blue" variant="light">
                        <IconUsers size={16} />
                      </ThemeIcon>
                      <Text fw={700} size="sm">Déjà client ?</Text>
                    </Group>
                    <Text size="xs" c="dimmed" mb="md">Si vous avez déjà un espace, connectez-vous directement.</Text>
                    <Button variant="outline" color="blue" size="xs" fullWidth>Se connecter</Button>
                  </Card>
                  <Card p="lg" withBorder radius="md">
                    <Group mb="xs">
                      <ThemeIcon color="orange" variant="light">
                        <IconBriefcase size={16} />
                      </ThemeIcon>
                      <Text fw={700} size="sm">Dirigeant ?</Text>
                    </Group>
                    <Text size="xs" c="dimmed" mb="md">Rémunération mandataire ou TNS, tout est prévu.</Text>
                    <Button variant="outline" color="orange" size="xs" fullWidth>En savoir plus</Button>
                  </Card>
                </SimpleGrid>
              </Stack>
            )}

            {active === 2 && (
              <Stack gap="xl">
                <Stack gap={5} ta="center">
                  <Title order={2} fw={800}>Commençons par une démo personnalisée</Title>
                  <Text c="dimmed">Complétez vos coordonnées pour qu'un expert vous recontacte.</Text>
                </Stack>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                  <TextInput label="Nom ou SIRET" placeholder="Mon Entreprise SAS" required radius="md" />
                  <TextInput label="Secteur d'activité" placeholder="Technologie, Services..." radius="md" />
                  <TextInput label="Prénom" placeholder="Camille" required radius="md" />
                  <TextInput label="Nom" placeholder="Dupont" required radius="md" />
                  <TextInput label="E-mail professionnel" placeholder="camille@entreprise.fr" required radius="md" />
                  <TextInput label="Téléphone" placeholder="06 XX XX XX XX" required radius="md" />
                </SimpleGrid>

                <Checkbox
                  label="J'accepte que mes données soient traitées selon la politique de confidentialité de PayFit."
                  color="payfit.6"
                  size="xs"
                />

                <Card bg="gray.1" p="md" radius="md" withBorder>
                  <Group wrap="nowrap" align="flex-start">
                    <Image src="/landing/simplicity.jpg" radius="md" w={80} h={80} fit="cover" />
                    <Box>
                      <Text size="xs" fw={700}>"PayFit a divisé par 4 le temps passé sur ma paie."</Text>
                      <Text size="xs" c="dimmed">— Marc D., Fondateur de Bloom</Text>
                    </Box>
                  </Group>
                </Card>
              </Stack>
            )}
          </Box>

          <Group justify="space-between" mt={50}>
            <Button variant="default" onClick={prevStep} disabled={active === 0} leftSection={<IconArrowLeft size={16} />}>
              Retour
            </Button>
            {active < 2 ? (
              <Button color="payfit.6" onClick={nextStep} rightSection={<IconArrowRight size={16} />}>
                Suivant
              </Button>
            ) : (
              <Button color="payfit.6" onClick={handleFinish} rightSection={<IconCheck size={16} />}>
                Terminer
              </Button>
            )}
          </Group>
        </Card>
      </Container>
    </Box>
  )
}

function MethodCard({ icon: Icon, title, description, active, onClick }: any) {
  return (
    <UnstyledButton
      onClick={onClick}
      style={{
        padding: '24px',
        border: `2px solid ${active ? 'var(--mantine-color-payfit-6)' : 'var(--mantine-color-gray-2)'}`,
        borderRadius: '16px',
        backgroundColor: active ? 'var(--mantine-color-payfit-0)' : 'white',
        transition: 'all 200ms ease',
        height: '100%'
      }}
    >
      <Stack align="center" gap="sm" ta="center">
        <ThemeIcon size={50} radius="xl" color={active ? 'payfit.6' : 'gray.4'} variant={active ? 'filled' : 'light'}>
          <Icon size={24} />
        </ThemeIcon>
        <Text fw={700} size="sm">{title}</Text>
        <Text size="xs" c="dimmed">{description}</Text>
      </Stack>
    </UnstyledButton>
  )
}
