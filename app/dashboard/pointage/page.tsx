"use client"

import {
  IconClock,
  IconCalendar,
  IconDownload,
  IconAlertTriangle,
  IconCheck,
  IconLogin,
  IconLogout,
  IconEdit,
  IconTrendingUp,
  IconFilter,
  IconSearch,
} from "@tabler/icons-react"
import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Text,
  Title,
  ThemeIcon,
  Avatar,
  rem,
  Stack,
  ActionIcon,
  Box,
  Divider,
  TextInput,
} from "@mantine/core"
import { useState } from "react"

const attendanceLogs = [
  {
    nom: "Émilie Lambert",
    entree: "08:55",
    sortie: "17:15",
    pause: "1h00",
    total: "7h20",
    statut: "normal",
    initials: "EL",
  },
  {
    nom: "Lucas Fontaine",
    entree: "09:25",
    sortie: "18:30",
    pause: "45min",
    total: "8h20",
    statut: "retard",
    initials: "LF",
  },
  {
    nom: "Camille Lefevre",
    entree: "08:45",
    sortie: "17:00",
    pause: "1h15",
    total: "7h00",
    statut: "normal",
    initials: "CL",
  },
  { nom: "Thibault Martin", entree: "-", sortie: "-", pause: "-", total: "-", statut: "absent", initials: "TM" },
  {
    nom: "Romain Garnier",
    entree: "08:30",
    sortie: "16:45",
    pause: "1h00",
    total: "7h15",
    statut: "normal",
    initials: "RG",
  },
]

export default function PointagePage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Pointage & Présences</Title>
          <Text c="dimmed" size="sm">Suivi en temps réel des entrées et sorties des collaborateurs.</Text>
        </div>
        <Group>
          <Button variant="outline" color="gray" leftSection={<IconCalendar size={18} />}>Ce mois</Button>
          <Button variant="outline" color="gray" leftSection={<IconDownload size={18} />}>Exporter</Button>
        </Group>
      </Group>

      {/* KPI Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Présents (Auj.)</Text>
          <Group justify="space-between" align="flex-end" mt={4}>
            <Text fw={800} size="xl">23/25</Text>
            <Badge variant="light" color="payfit" leftSection={<IconTrendingUp size={12} />}>92%</Badge>
          </Group>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Retards</Text>
          <Text fw={800} size="xl" mt={4} c="orange.7">4</Text>
          <Text size="xs" c="orange.6" mt={4}>Alertes à traiter</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Absences injustifiées</Text>
          <Text fw={800} size="xl" mt={4} c="red.7">2</Text>
          <Text size="xs" c="red.6" mt={4}>À vérifier immédiatement</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Heures Sup. (Mois)</Text>
          <Text fw={800} size="xl" mt={4}>12.5h</Text>
          <Text size="xs" c="dimmed" mt={4}>Approuvées: 8h</Text>
        </Card>
      </SimpleGrid>

      {/* Daily Logs */}
      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={3} size="h4">Pointages du jour</Title>
            <Group gap="xs">
              <TextInput
                placeholder="Rechercher..."
                leftSection={<IconSearch size={16} />}
                radius="md"
                size="xs"
              />
              <Button variant="light" color="gray" size="xs" leftSection={<IconFilter size={14} />}>Filtres</Button>
            </Group>
          </Group>

          <Stack gap="xs" mt="sm">
            {attendanceLogs.map((log, i) => (
              <Box
                key={i}
                p="md"
                style={{
                  border: '1px solid var(--mantine-color-gray-1)',
                  borderRadius: 8,
                  backgroundColor: log.statut === 'retard' ? 'var(--mantine-color-orange-0)' :
                    log.statut === 'absent' ? 'var(--mantine-color-red-0)' : 'white'
                }}
              >
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="md">
                    <Avatar color={log.statut === 'retard' ? 'orange' : log.statut === 'absent' ? 'red' : 'payfit'} radius="md">
                      {log.initials}
                    </Avatar>
                    <Box>
                      <Text fw={700} size="sm">{log.nom}</Text>
                      <Group gap="md">
                        <Group gap={4}>
                          <IconLogin size={12} color="var(--mantine-color-gray-5)" />
                          <Text size="xs" c="dimmed">{log.entree}</Text>
                        </Group>
                        <Group gap={4}>
                          <IconLogout size={12} color="var(--mantine-color-gray-5)" />
                          <Text size="xs" c="dimmed">{log.sortie}</Text>
                        </Group>
                        <Text size="xs" c="dimmed">Pause: {log.pause}</Text>
                      </Group>
                    </Box>
                  </Group>

                  <Group gap="xl">
                    <Box ta="right">
                      <Text fw={800} size="md">{log.total}</Text>
                      <Text size="10px" c="dimmed" tt="uppercase">Heures totales</Text>
                    </Box>
                    <Badge
                      variant="filled"
                      color={log.statut === 'retard' ? 'orange' : log.statut === 'absent' ? 'red' : 'payfit'}
                      radius="sm"
                      w={80}
                    >
                      {log.statut}
                    </Badge>
                    <ActionIcon variant="subtle" color="gray"><IconEdit size={16} /></ActionIcon>
                  </Group>
                </Group>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* Alerts & Overtime */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group gap="sm" mb="lg">
            <IconAlertTriangle size={20} color="var(--mantine-color-orange-6)" />
            <Text fw={700}>Anomalies à corriger</Text>
          </Group>
          <Stack gap="xs">
            {[
              { nom: "Lucas Fontaine", detail: "Retard de 25min (17/12)" },
              { nom: "Thibault Martin", detail: "Absence injustifiée (16/12)" },
              { nom: "Sylvie Lessage", detail: "Oubli de pointage sortie (15/12)" }
            ].map((item, i) => (
              <Box key={i} p="sm" bg="gray.0" style={{ borderRadius: 8 }}>
                <Group justify="space-between">
                  <Box>
                    <Text fw={700} size="xs">{item.nom}</Text>
                    <Text size="xs" c="dimmed">{item.detail}</Text>
                  </Box>
                  <Button variant="outline" color="orange" size="xs">Corriger</Button>
                </Group>
              </Box>
            ))}
          </Stack>
        </Card>

        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group gap="sm" mb="lg">
            <IconClock size={20} color="var(--mantine-color-payfit-6)" />
            <Text fw={700}>Heures supplémentaires</Text>
          </Group>
          <Stack gap="xs">
            {[
              { nom: "Lucas Fontaine", heures: "8.5h", montant: "+127.50 €" },
              { nom: "Émilie Lambert", heures: "4h", montant: "+60.00 €" }
            ].map((item, i) => (
              <Box key={i} p="sm" bg="payfit.0" style={{ borderRadius: 8 }}>
                <Group justify="space-between">
                  <Box>
                    <Text fw={700} size="xs" c="payfit.9">{item.nom}</Text>
                    <Text size="xs" c="payfit.7">Mois de Décembre</Text>
                  </Box>
                  <Box ta="right">
                    <Text fw={800} size="sm" c="payfit.9">{item.heures}</Text>
                    <Text size="xs" c="payfit.7">{item.montant}</Text>
                  </Box>
                </Group>
              </Box>
            ))}
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  )
}
