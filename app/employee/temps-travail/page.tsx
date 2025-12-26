"use client"

import { useState } from "react"
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Badge,
  TextInput,
  Box,
  rem,
  Progress,
  ActionIcon,
  Divider,
} from "@mantine/core"
import { BarChart } from "@mantine/charts"
import {
  IconClock,
  IconDownload,
  IconChevronLeft,
  IconChevronRight,
  IconCalendar,
  IconCheck,
  IconAlertCircle,
  IconPoint,
  IconPlus,
} from "@tabler/icons-react"

const timeEntries = [
  {
    day: "Lundi",
    date: "7 février",
    morning: { start: "09:00", end: "13:00" },
    afternoon: { start: "14:00", end: "17:00" },
    total: "07h 00m",
    status: "validated",
  },
  {
    day: "Mardi",
    date: "8 février",
    morning: { start: "08:00", end: "" },
    afternoon: { start: "", end: "" },
    total: "0h 00m",
    status: "draft",
  },
  {
    day: "Mercredi",
    date: "9 février",
    morning: { start: "", end: "" },
    afternoon: { start: "", end: "" },
    total: "0h 00m",
    status: "leave",
  },
  {
    day: "Jeudi",
    date: "10 février",
    morning: { start: "09:00", end: "13:00" },
    afternoon: { start: "14:00", end: "18:00" },
    total: "08h 00m",
    status: "pending",
  },
  {
    day: "Vendredi",
    date: "11 février",
    morning: { start: "09:00", end: "12:00" },
    afternoon: { start: "13:00", end: "17:00" },
    total: "07h 00m",
    status: "validated",
  },
]

const chartData = [
  { week: 'S-1', hours: 35 },
  { week: 'S-2', hours: 32 },
  { week: 'S-3', hours: 38 },
  { week: 'S-4', hours: 34 },
];

export default function TempsTravailPage() {
  const [currentMonth, setCurrentMonth] = useState("Février 2024")

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Temps de travail</Text>
          <Group gap="xs">
            <ThemeIcon variant="light" color="payfit" size="sm">
              <IconClock size={14} />
            </ThemeIcon>
            <Text size="sm" c="payfit.7" fw={700}>12h 49m travaillés cette semaine</Text>
          </Group>
        </div>
        <Button variant="light" color="payfit" leftSection={<IconDownload size={16} />}>
          Exporter (PDF/CSV)
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
        {/* Monthly Navigation & Summary */}
        <Stack gap="lg" style={{ gridColumn: 'span 1' }}>
          <Card shadow="sm" radius="md" padding="md" withBorder>
            <Group justify="space-between">
              <ActionIcon variant="subtle" color="gray" onClick={() => setCurrentMonth("Janvier 2024")}>
                <IconChevronLeft size={20} />
              </ActionIcon>
              <Group gap="xs">
                <IconCalendar size={18} color="var(--mantine-color-gray-5)" />
                <Text fw={700}>{currentMonth}</Text>
              </Group>
              <ActionIcon variant="subtle" color="gray" onClick={() => setCurrentMonth("Mars 2024")}>
                <IconChevronRight size={20} />
              </ActionIcon>
            </Group>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
            <Text fw={700} size="md" mb="md" c="payfit.9">Rapport Mensuel</Text>
            <Stack gap="md">
              <div>
                <Group justify="space-between" mb={4}>
                  <Text size="xs" c="payfit.8" fw={600}>HEURES TRAVAILLÉES</Text>
                  <Text size="sm" fw={800} c="payfit.9">124h / 140h</Text>
                </Group>
                <Progress value={88} color="payfit" size="sm" radius="xl" />
              </div>
              <Divider color="payfit.1" />
              <SimpleGrid cols={2}>
                <Box>
                  <Text size="xs" c="dimmed" fw={600}>HEURES SUPP.</Text>
                  <Text size="md" fw={700} c="orange.7">2h 15m</Text>
                </Box>
                <Box>
                  <Text size="xs" c="dimmed" fw={600}>CONGÉS</Text>
                  <Text size="md" fw={700} c="blue.7">3 jours</Text>
                </Box>
              </SimpleGrid>
            </Stack>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Text fw={700} size="md" mb="md">Activité Hebdomadaire</Text>
            <Box h={180}>
              <BarChart
                h={180}
                data={chartData}
                dataKey="week"
                series={[
                  { name: 'hours', color: 'payfit.6', label: 'Heures' },
                ]}
                gridColor="gray.1"
                textColor="dimmed"
                withTooltip={false}
              />
            </Box>
          </Card>
        </Stack>

        {/* Time Entries Feed */}
        <Stack gap="sm" style={{ gridColumn: 'span 2' }}>
          <Group justify="space-between">
            <Text fw={700} size="lg">Saisies de temps</Text>
            <Button variant="subtle" color="payfit" size="xs" leftSection={<IconPlus size={14} />}>Ajouter une entrée</Button>
          </Group>

          {timeEntries.map((entry, index) => (
            <Card
              key={index}
              shadow="xs"
              radius="md"
              padding="md"
              withBorder
              style={{
                borderLeft: entry.status === 'draft' ? '4px solid var(--mantine-color-blue-5)' :
                  entry.status === 'leave' ? '4px solid var(--mantine-color-payfit-5)' :
                    '1px solid var(--mantine-color-gray-2)'
              }}
              bg={entry.status === 'leave' ? 'payfit.0' : 'white'}
            >
              <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_100px_110px] items-center gap-4">
                <div>
                  <Text fw={700} size="sm" c="dark.8">{entry.day}</Text>
                  <Text size="xs" c="dimmed">{entry.date}</Text>
                </div>

                <Group gap="xl">
                  <Stack gap={2}>
                    <Text size="xs" c="dimmed" fw={600} tt="uppercase">Matin</Text>
                    <Group gap={4}>
                      <TextInput size="xs" w={60} value={entry.morning.start} disabled={entry.status !== 'draft'} styles={{ input: { textAlign: 'center' } }} />
                      <Text size="xs" c="dimmed">-</Text>
                      <TextInput size="xs" w={60} value={entry.morning.end} disabled={entry.status !== 'draft'} styles={{ input: { textAlign: 'center' } }} />
                    </Group>
                  </Stack>
                  <Stack gap={2}>
                    <Text size="xs" c="dimmed" fw={600} tt="uppercase">Après-midi</Text>
                    <Group gap={4}>
                      <TextInput size="xs" w={60} value={entry.afternoon.start} disabled={entry.status !== 'draft'} styles={{ input: { textAlign: 'center' } }} />
                      <Text size="xs" c="dimmed">-</Text>
                      <TextInput size="xs" w={60} value={entry.afternoon.end} disabled={entry.status !== 'draft'} styles={{ input: { textAlign: 'center' } }} />
                    </Group>
                  </Stack>
                </Group>

                <Stack gap={0} align="center">
                  <Text size="xs" c="dimmed" fw={600}>TOTAL</Text>
                  <Text fw={700} size="md" c="dark.9">{entry.total}</Text>
                </Stack>

                <Box ta="right">
                  {entry.status === 'validated' && (
                    <Badge variant="light" color="payfit" leftSection={<IconCheck size={12} />}>Validé</Badge>
                  )}
                  {entry.status === 'pending' && (
                    <Badge variant="light" color="yellow" leftSection={<IconClock size={12} />}>En attente</Badge>
                  )}
                  {entry.status === 'leave' && (
                    <Badge variant="filled" color="payfit">Congé</Badge>
                  )}
                  {entry.status === 'draft' && (
                    <Badge variant="outline" color="blue" leftSection={<IconAlertCircle size={12} />}>Brouillon</Badge>
                  )}
                </Box>
              </div>
            </Card>
          ))}

          <Button variant="filled" color="payfit" fullWidth mt="md">Soumettre ma semaine pour validation</Button>
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}
