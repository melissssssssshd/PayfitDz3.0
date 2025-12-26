"use client"

import {
  IconSearch,
  IconChevronDown,
  IconDownload,
  IconClock,
  IconCheck,
  IconAlertCircle,
  IconHistory,
} from "@tabler/icons-react"
import {
  Avatar,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Text,
  TextInput,
  Title,
  rem,
  Stack,
  Badge,
  ThemeIcon,
  ActionIcon,
  Progress,
  Divider,
} from "@mantine/core"

const timesheets = [
  {
    id: 1,
    name: "Sylvie Lessage",
    initials: "SL",
    hours: "132h 25min",
    status: "Brouillon",
    color: "gray",
  },
  {
    id: 2,
    name: "Martin Salvatori",
    initials: "MS",
    hours: "140h 00min",
    status: "Approuvé",
    color: "payfit",
  },
  {
    id: 3,
    name: "Auguste Charpentier",
    initials: "AC",
    hours: "136h 02min",
    status: "Brouillon",
    color: "gray",
  },
  {
    id: 4,
    name: "Calypso Meyer",
    initials: "CM",
    hours: "128h 45min",
    status: "Approuvé",
    color: "payfit",
  },
  {
    id: 5,
    name: "Éléna Tavares",
    initials: "ET",
    hours: "135h 30min",
    status: "Approuvé",
    color: "payfit",
  },
  {
    id: 6,
    name: "Pierre Levin",
    initials: "PL",
    hours: "142h 15min",
    status: "En attente",
    color: "orange",
  },
]

export default function TempsPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Temps de travail</Title>
          <Text c="dimmed" size="sm">Supervisez et validez les feuilles de temps mensuelles.</Text>
        </div>
        <Group>
          <Button variant="outline" color="gray" leftSection={<IconDownload size={18} />}>Exporter</Button>
          <Button variant="filled" color="payfit">Tout Approuver</Button>
        </Group>
      </Group>

      {/* Overview Cards */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
          <Group justify="space-between">
            <Box>
              <Text size="xs" c="payfit.8" fw={700} tt="uppercase">Taux de validation</Text>
              <Text fw={800} size="xl" mt={4} c="payfit.9">65%</Text>
            </Box>
            <ThemeIcon color="payfit" variant="light" size="xl" radius="md">
              <IconCheck size={24} />
            </ThemeIcon>
          </Group>
          <Progress value={65} color="payfit" size="xs" radius="xl" mt="md" />
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group justify="space-between">
            <Box>
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">Heures totales (Mois)</Text>
              <Text fw={800} size="xl" mt={4}>3 450h</Text>
            </Box>
            <ThemeIcon color="blue" variant="light" size="xl" radius="md">
              <IconClock size={24} />
            </ThemeIcon>
          </Group>
          <Text size="xs" c="dimmed" mt="xs">+5% vs mois dernier</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group justify="space-between">
            <Box>
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">En attente (Retard)</Text>
              <Text fw={800} size="xl" mt={4} c="orange.7">12</Text>
            </Box>
            <ThemeIcon color="orange" variant="light" size="xl" radius="md">
              <IconAlertCircle size={24} />
            </ThemeIcon>
          </Group>
          <Text size="xs" c="dimmed" mt="xs">Feuilles de temps non soumises</Text>
        </Card>
      </SimpleGrid>

      {/* Timesheet List */}
      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <TextInput
              placeholder="Rechercher un collaborateur..."
              leftSection={<IconSearch size={18} />}
              style={{ flex: 1, maxWidth: 400 }}
              radius="md"
            />
            <Button variant="light" color="payfit" rightSection={<IconChevronDown size={16} />}>Janvier 2025</Button>
          </Group>

          <Stack gap="xs" mt="md">
            {timesheets.map((sheet) => (
              <Box
                key={sheet.id}
                p="md"
                style={{ border: '1px solid var(--mantine-color-gray-1)', borderRadius: 8 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="md">
                    <Avatar color={sheet.color} radius="md">{sheet.initials}</Avatar>
                    <Box>
                      <Text fw={700} size="sm">{sheet.name}</Text>
                      <Text size="xs" c="dimmed">Poste non spécifié</Text>
                    </Box>
                  </Group>

                  <Group gap="xl">
                    <Box ta="right">
                      <Text size="xs" c="dimmed">Total déclaré</Text>
                      <Text fw={700} size="sm">{sheet.hours}</Text>
                    </Box>
                    <Badge variant="light" color={sheet.color} radius="sm" w={100}>{sheet.status}</Badge>
                    <Button variant="subtle" color="payfit" size="xs">Détails</Button>
                  </Group>
                </Group>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* Highlight Box */}
      <Card bg="payfit.0" padding="lg" radius="md" withBorder>
        <Group align="center" gap="lg">
          <ThemeIcon color="payfit" size={50} radius="md" variant="filled">
            <IconHistory size={28} />
          </ThemeIcon>
          <Box style={{ flex: 1 }}>
            <Text fw={700} size="md" c="payfit.9">Rappel hebdomadaire</Text>
            <Text size="sm" c="payfit.8">Les collaborateurs reçoivent un rappel automatique chaque vendredi à 16h pour soumettre leur feuille de temps.</Text>
          </Box>
          <Button color="payfit" variant="light">Modifier les rappels</Button>
        </Group>
      </Card>
    </Stack>
  )
}
