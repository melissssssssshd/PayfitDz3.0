"use client"

import {
  IconReceipt,
  IconPhoto,
  IconCheck,
  IconX,
  IconSearch,
  IconFilter,
  IconFileText,
  IconTrendingUp,
  IconAlertCircle,
} from "@tabler/icons-react"
import {
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  ThemeIcon,
  Badge,
  ActionIcon,
  rem,
  TextInput,
  Box,
  Avatar,
  Divider,
  Progress,
} from "@mantine/core"
import { DonutChart } from "@mantine/charts"

const expenseReports = [
  {
    id: 1,
    employee: "Sylvie Lessage",
    initials: "SL",
    category: "Transport",
    name: "Train Lyon-Paris",
    date: "18 Décembre 2024",
    amount: "51,75 €",
    hasReceipt: true,
  },
  {
    id: 2,
    employee: "Lucas Fontaine",
    initials: "LF",
    category: "Restauration",
    name: "Déjeuner client",
    date: "17 Décembre 2024",
    amount: "68,50 €",
    hasReceipt: true,
  },
  {
    id: 3,
    employee: "Émilie Lambert",
    initials: "EL",
    category: "Matériel",
    name: "Câble HDMI + Adaptateur",
    date: "15 Décembre 2024",
    amount: "45,00 €",
    hasReceipt: false,
  },
]

const expenseStats = [
  { name: 'Transport', value: 1250, color: 'payfit.6' },
  { name: 'Repas', value: 850, color: 'blue.6' },
  { name: 'Logement', value: 340, color: 'indigo.6' },
  { name: 'Autre', value: 210, color: 'gray.6' },
]

export default function NoteFraisPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Notes de frais</Title>
          <Text c="dimmed" size="sm">Contrôlez et approuvez les dépenses professionnelles.</Text>
        </div>
        <Button variant="outline" color="gray" leftSection={<IconFileText size={18} />} radius="md">Synthèse mensuelle</Button>
      </Group>

      {/* Analytics Summary */}
      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder style={{ gridColumn: 'span 2' }}>
          <Group justify="space-between" mb="lg">
            <Box>
              <Text fw={700} size="md">Répartition des dépenses</Text>
              <Text size="xs" c="dimmed">Cumul sur le mois en cours</Text>
            </Box>
            <Group gap="xs">
              <Text fw={800} size="xl" c="payfit.8">2 650,00 €</Text>
              <Badge variant="light" color="payfit">+12%</Badge>
            </Group>
          </Group>
          <Group>
            <DonutChart
              data={expenseStats}
              withLabelsLine
              labelsType="percent"
              withLabels
              thickness={20}
              size={140}
            />
            <SimpleGrid cols={2} flex={1} spacing="xs">
              {expenseStats.map(s => (
                <Group key={s.name} gap="xs">
                  <ThemeIcon color={s.color} size={8} radius="xl" />
                  <Text size="xs" fw={500}>{s.name}: {s.value}€</Text>
                </Group>
              ))}
            </SimpleGrid>
          </Group>
        </Card>

        <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
          <Text fw={700} size="md" mb="md" c="payfit.9">Alerte Plafond</Text>
          <Text size="xs" c="payfit.7" mb="lg">Le budget "Restauration" a atteint 85% du plafond défini pour ce mois.</Text>
          <Box mb="md">
            <Group justify="space-between" mb={4}>
              <Text size="xs" fw={700} c="payfit.8">Budget Restauration</Text>
              <Text size="xs" fw={700} c="payfit.9">85%</Text>
            </Group>
            <Progress value={85} color="payfit" size="sm" radius="xl" />
          </Box>
          <Button variant="light" color="payfit" fullWidth size="xs">Ajuster les plafonds</Button>
        </Card>
      </SimpleGrid>

      {/* Expense List */}
      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={700} size="lg">En attente de validation</Text>
            <Group gap="xs">
              <TextInput
                placeholder="Filtrer..."
                leftSection={<IconSearch size={16} />}
                radius="md"
                size="xs"
              />
              <Button variant="light" color="gray" size="xs" leftSection={<IconFilter size={14} />}>Filtres</Button>
            </Group>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, xl: 3 }} spacing="md">
            {expenseReports.map((expense) => (
              <Card key={expense.id} padding="md" radius="md" withBorder className="hover:shadow-md transition-shadow">
                <Group justify="space-between" align="flex-start" mb="md">
                  <Group gap="sm">
                    <Avatar color="payfit" radius="md">{expense.initials}</Avatar>
                    <Box>
                      <Text fw={700} size="sm">{expense.employee}</Text>
                      <Text size="10px" c="dimmed">{expense.date}</Text>
                    </Box>
                  </Group>
                  <Text fw={800} size="lg" c="payfit.8">{expense.amount}</Text>
                </Group>

                <Box p="sm" bg="gray.0" style={{ borderRadius: 8 }} mb="md">
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" c="dimmed">Catégorie</Text>
                    <Badge variant="dot" color="payfit" size="xs">{expense.category}</Badge>
                  </Group>
                  <Text fw={600} size="xs" lineClamp={1}>{expense.name}</Text>
                </Box>

                {expense.hasReceipt ? (
                  <Group gap="xs" mb="lg">
                    <IconPhoto size={14} color="var(--mantine-color-payfit-6)" />
                    <Text size="xs" c="payfit.7" fw={600} style={{ cursor: 'pointer' }}>Voir le justificatif</Text>
                  </Group>
                ) : (
                  <Group gap="xs" mb="lg">
                    <IconAlertCircle size={14} color="var(--mantine-color-red-6)" />
                    <Text size="xs" c="red.6" fw={600}>Justificatif manquant</Text>
                  </Group>
                )}

                <Group grow>
                  <ActionIcon variant="light" color="red" size="lg" radius="md"><IconX size={18} /></ActionIcon>
                  <Button color="payfit" variant="filled" radius="md" fullWidth>Approuver</Button>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Card>
    </Stack>
  )
}
