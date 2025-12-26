"use client"

import {
  IconSearch,
  IconCalendar,
  IconClock,
  IconDotsVertical,
  IconDownload,
  IconCheck,
  IconX,
  IconFilter,
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
  ActionIcon,
  Badge,
  Checkbox,
  ScrollArea,
  Menu,
} from "@mantine/core"

const absenceRequests = [
  {
    id: 1,
    initials: "AR",
    name: "Averie Russo",
    type: "Événement familial",
    startDate: "13/10/2024",
    endDate: "14/10/2024",
    duration: "2 jours",
    color: "blue",
  },
  {
    id: 2,
    initials: "LC",
    name: "Leila Coleman",
    type: "Maladie",
    startDate: "3/10/2024",
    endDate: "3/10/2024",
    duration: "1 jour",
    color: "red",
  },
  {
    id: 3,
    initials: "LM",
    name: "Lyla Maynard",
    type: "Maladie",
    startDate: "3/10/2024",
    endDate: "6/10/2024",
    duration: "4 jours",
    color: "red",
  },
  {
    id: 4,
    initials: "NA",
    name: "Nancy Acevedo",
    type: "Événement familial",
    startDate: "14/10/2024",
    endDate: "15/10/2024",
    duration: "2 jours",
    color: "blue",
  },
  {
    id: 5,
    initials: "TT",
    name: "Timothy Tapia",
    type: "RTT",
    startDate: "15/10/2024",
    endDate: "15/10/2024",
    duration: "1 jour",
    color: "payfit",
  },
]

export default function AbsencesPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Gestion des absences</Title>
          <Text c="dimmed" size="sm">Validez les demandes et exportez les relevés mensuels.</Text>
        </div>
        <Button
          variant="outline"
          color="gray"
          leftSection={<IconDownload size={18} />}
          radius="md"
        >
          Exporter (CSV/PDF)
        </Button>
      </Group>

      {/* Analytics Summary */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
          <Text size="xs" c="payfit.8" fw={700} tt="uppercase">Présence aujourd'hui</Text>
          <Text fw={800} size="xl" mt={4} c="payfit.9">92%</Text>
          <Text size="xs" c="payfit.7" mt={4}>23 collaborateurs présents</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">En attente de validation</Text>
          <Text fw={800} size="xl" mt={4}>8 demandes</Text>
          <Text size="xs" c="dimmed" mt={4}>Garder l'organisation à jour</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Absences prévues (S42)</Text>
          <Text fw={800} size="xl" mt={4}>5 personnes</Text>
          <Text size="xs" c="dimmed" mt={4}>Semaine du 14 Octobre</Text>
        </Card>
      </SimpleGrid>

      {/* Main Request Card */}
      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <TextInput
              placeholder="Filtrer par collaborateur..."
              leftSection={<IconSearch size={18} stroke={1.5} />}
              style={{ flex: 1, maxWidth: 400 }}
              radius="md"
            />
            <Group gap="xs">
              <Button variant="light" color="gray" leftSection={<IconFilter size={16} />}>Filtres</Button>
              <Divider orientation="vertical" />
              <Button color="payfit" leftSection={<IconCheck size={16} />}>Tout valider</Button>
            </Group>
          </Group>

          <Box p="xs" bg="gray.0" style={{ borderRadius: 8 }}>
            <Group gap="sm">
              <Checkbox checked indeterminate color="payfit" />
              <Text size="xs" fw={700} c="dimmed">8 DEMANDES SÉLECTIONNÉES</Text>
            </Group>
          </Box>

          <Stack gap="xs">
            {absenceRequests.map((request) => (
              <Box
                key={request.id}
                p="md"
                style={{
                  border: '1px solid var(--mantine-color-gray-1)',
                  borderRadius: 8,
                  backgroundColor: 'white'
                }}
                className="hover:bg-gray-50 transition-colors"
              >
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="md">
                    <Checkbox color="payfit" />
                    <Avatar color={request.color} radius="md">{request.initials}</Avatar>
                    <Box>
                      <Text fw={700} size="sm">{request.name}</Text>
                      <Badge size="xs" variant="light" color={request.color} radius="sm">{request.type}</Badge>
                    </Box>
                  </Group>

                  <Group gap="xl">
                    <Group gap="xs">
                      <IconCalendar size={14} color="var(--mantine-color-gray-5)" />
                      <Text size="xs" fw={600}>{request.startDate} → {request.endDate}</Text>
                    </Group>
                    <Box w={80} ta="right">
                      <Text size="xs" fw={700} c="dark.7">{request.duration}</Text>
                    </Box>
                    <Group gap="xs">
                      <ActionIcon variant="light" color="payfit" title="Valider"><IconCheck size={16} /></ActionIcon>
                      <ActionIcon variant="light" color="red" title="Refuser"><IconX size={16} /></ActionIcon>
                      <Menu position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray"><IconDotsVertical size={16} /></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item>Voir le justificatif</Menu.Item>
                          <Menu.Item>Modifier les dates</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Group>
                </Group>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}

import { Divider } from "@mantine/core"
