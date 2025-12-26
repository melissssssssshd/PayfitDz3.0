"use client"

import {
  IconCheck,
  IconClock,
  IconChevronRight,
  IconArrowRight,
  IconRefresh,
  IconAlertCircle,
} from "@tabler/icons-react"
import Link from "next/link"
import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
  ThemeIcon,
  Box,
  SimpleGrid,
  Divider,
  Progress,
  Badge,
} from "@mantine/core"

const preparationSteps = [
  {
    id: 1,
    title: "Mouvements de personnel",
    subtitle: "Entrées, sorties et fins de périodes d'essai",
    status: "completed",
    description: "Aucun changement détecté ce mois-ci.",
  },
  {
    id: 2,
    title: "Notifications collaborateurs",
    subtitle: "Mode de mise à disposition des bulletins",
    status: "pending",
    description: "Vérifiez les accès au coffre-fort numérique.",
  },
  {
    id: 3,
    title: "Virements SEPA",
    subtitle: "Bénéficiaires et dates de valeur",
    status: "pending",
    description: "2 nouveaux RIB à valider avant export.",
  },
  {
    id: 4,
    title: "Génération des bulletins",
    subtitle: "Preview et vérification des bases",
    status: "pending",
    description: "25 bulletins prêts pour relecture.",
  },
  {
    id: 5,
    title: "Analyse Masse Salariale",
    subtitle: "Comparaison M-1 et budget",
    status: "pending",
    description: "Écart de +5% sur l'équipe Marketing.",
  },
]

export default function PreparerPaiePage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-start">
        <div>
          <Title order={2} c="dark.8">Préparer la paie</Title>
          <Text c="dimmed" size="sm">
            Suivez ces étapes de vérification pour vous assurer de la conformité de vos données avant la clôture définitive.
          </Text>
        </div>
        <Box ta="right">
          <Text size="xs" fw={700} c="dimmed">AVANCEMENT</Text>
          <Group gap="xs" mt={4}>
            <Progress value={20} color="payfit" w={150} size="sm" radius="xl" />
            <Text fw={800} size="sm">20%</Text>
          </Group>
        </Box>
      </Group>

      <Card shadow="sm" radius="md" padding="xl" withBorder>
        <Stack gap="md">
          {preparationSteps.map((step) => (
            <Box
              key={step.id}
              p="md"
              style={{
                border: '1px solid var(--mantine-color-gray-1)',
                borderRadius: 12,
                backgroundColor: step.status === 'completed' ? 'var(--mantine-color-payfit-0)' : 'white'
              }}
            >
              <Group justify="space-between" wrap="nowrap">
                <Group gap="md">
                  <ThemeIcon
                    color={step.status === 'completed' ? 'payfit' : 'gray.3'}
                    variant={step.status === 'completed' ? 'filled' : 'light'}
                    radius="xl"
                  >
                    {step.status === 'completed' ? <IconCheck size={18} /> : <IconClock size={18} />}
                  </ThemeIcon>
                  <Box>
                    <Text fw={700} size="sm">{step.title}</Text>
                    <Text size="xs" c="dimmed">{step.subtitle}</Text>
                    <Divider my={8} variant="dashed" />
                    <Text size="xs" fw={600} c={step.status === 'completed' ? 'payfit.9' : 'gray.6'}>
                      {step.description}
                    </Text>
                  </Box>
                </Group>
                <Button variant="subtle" color="gray" rightSection={<IconChevronRight size={14} />}>Vérifier</Button>
              </Group>
            </Box>
          ))}
        </Stack>
      </Card>

      <Box p="lg" bg="payfit.7" style={{ borderRadius: 12 }}>
        <Group justify="space-between">
          <Box>
            <Text fw={800} c="white">Prêt pour la clôture ?</Text>
            <Text size="xs" c="payfit.0">Une fois validée, la paie ne pourra plus être modifiée sans intervention.</Text>
          </Box>
          <Group>
            <Button variant="white" color="payfit">Enregistrer</Button>
            <Button component={Link} href="/dashboard/cloturer-paie" rightSection={<IconArrowRight size={16} />} color="payfit" bg="white" c="payfit.7">
              Aller à la clôture
            </Button>
          </Group>
        </Group>
      </Box>
    </Stack>
  )
}
