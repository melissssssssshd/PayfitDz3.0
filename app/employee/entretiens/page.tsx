"use client"

import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Badge,
  Avatar,
  Box,
  rem,
  ActionIcon,
  Timeline,
  Progress,
} from "@mantine/core"
import {
  IconCalendar,
  IconClock,
  IconUser,
  IconCheck,
  IconPlus,
  IconMessage2,
  IconTarget,
  IconVideo,
  IconChevronRight,
} from "@tabler/icons-react"

const meetings = [
  {
    id: 1,
    title: "Emma / Catherine - 1:1",
    date: "15 mars 2024",
    time: "14:00 - 15:00",
    status: "scheduled",
    manager: "Emma D.",
    initials: "ED",
    type: "1:1",
    location: "Salle de réunion A",
  },
  {
    id: 2,
    title: "Entretien annuel S1 2024",
    date: "10 mars 2024",
    time: "10:00 - 11:30",
    status: "completed",
    manager: "Emma D.",
    initials: "ED",
    type: "annual",
    location: "Bureau manager",
  },
]

const campaigns = [
  {
    id: 1,
    title: "S1 2024 - Entretien annuel",
    date: "Clôturée le 10/03/2024",
    status: "completed",
    description: "Évaluation globale de la performance et objectifs",
  },
]

export default function EntretiensPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Entretiens & 1:1</Text>
          <Text size="sm" c="dimmed">Préparez et suivez vos échanges avec votre manager</Text>
        </div>
        <Button
          variant="filled"
          color="payfit"
          leftSection={<IconPlus size={16} />}
          radius="md"
        >
          Planifier un 1:1
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
        {/* Main content Area */}
        <Stack gap="xl" style={{ gridColumn: 'span 2' }}>
          {/* Scheduled / To fill */}
          <Box>
            <Group justify="space-between" mb="md">
              <Text fw={700} size="lg">À préparer</Text>
              <Badge variant="light" color="orange">1 en attente</Badge>
            </Group>
            <Stack gap="md">
              {meetings.filter(m => m.status === 'scheduled').map((meeting) => (
                <Card key={meeting.id} shadow="sm" radius="md" padding="lg" withBorder className="hover:shadow-md transition-shadow">
                  <Group justify="space-between" align="flex-start">
                    <Group gap="md">
                      <Avatar size="xl" radius="md" color="payfit">{meeting.initials}</Avatar>
                      <div>
                        <Text fw={700} size="lg">{meeting.title}</Text>
                        <Group gap="xs" mt={4}>
                          <Badge size="xs" variant="light" color="blue">Réunion 1:1</Badge>
                          <Text size="xs" c="dimmed">•</Text>
                          <Text size="xs" c="dimmed">{meeting.manager}</Text>
                        </Group>
                        <Group gap="md" mt="md">
                          <Group gap={4}>
                            <IconCalendar size={14} color="var(--mantine-color-gray-5)" />
                            <Text size="xs" c="dimmed">{meeting.date}</Text>
                          </Group>
                          <Group gap={4}>
                            <IconClock size={14} color="var(--mantine-color-gray-5)" />
                            <Text size="xs" c="dimmed">{meeting.time}</Text>
                          </Group>
                        </Group>
                      </div>
                    </Group>
                    <Button variant="light" color="payfit" leftSection={<IconMessage2 size={16} />}>
                      Remplir la fiche
                    </Button>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* Past activity Timeline */}
          <Box>
            <Text fw={700} size="lg" mb="md">Historique</Text>
            <Timeline active={0} bulletSize={32} lineWidth={2} color="payfit">
              {meetings.filter(m => m.status === 'completed').map((meeting) => (
                <Timeline.Item
                  key={meeting.id}
                  bullet={<ThemeIcon size={24} radius="xl" color="gray.1" c="gray.6"><IconCheck size={14} /></ThemeIcon>}
                  title={<Text fw={700} size="md">{meeting.title}</Text>}
                >
                  <Group justify="space-between" mt={4}>
                    <Box>
                      <Text size="xs" c="dimmed">{meeting.date} • {meeting.manager}</Text>
                      <Text size="xs" c="dimmed" mt={2}>Lieu: {meeting.location}</Text>
                    </Box>
                    <Button variant="subtle" color="gray" size="xs">Voir le compte-rendu</Button>
                  </Group>
                </Timeline.Item>
              ))}
            </Timeline>
          </Box>
        </Stack>

        {/* Sidebar widgets */}
        <Stack gap="lg">
          <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
            <Group gap="md">
              <ThemeIcon color="payfit.6" size="xl" radius="md">
                <IconTarget size={24} />
              </ThemeIcon>
              <Box>
                <Text fw={700} size="md" c="payfit.9">Objectifs S1</Text>
                <Text size="xs" c="payfit.7">3 objectifs en cours</Text>
              </Box>
            </Group>
            <Stack gap="xs" mt="lg">
              <div>
                <Group justify="space-between" mb={4}>
                  <Text size="xs" fw={600} c="payfit.8">KPI Performance</Text>
                  <Text size="xs" fw={700} c="payfit.9">75%</Text>
                </Group>
                <Progress value={75} color="payfit" size="xs" radius="xl" />
              </div>
              <div>
                <Group justify="space-between" mb={4}>
                  <Text size="xs" fw={600} c="payfit.8">Formation Tech</Text>
                  <Text size="xs" fw={700} c="payfit.9">30%</Text>
                </Group>
                <Progress value={30} color="payfit" size="xs" radius="xl" />
              </div>
            </Stack>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Text fw={700} size="md" mb="md">Campagnes actives</Text>
            <Stack gap="md">
              {campaigns.map((camp) => (
                <Box key={camp.id} p="md" bg="gray.0" style={{ borderRadius: 8 }}>
                  <Text fw={700} size="sm">{camp.title}</Text>
                  <Text size="xs" c="dimmed" mt={4}>{camp.description}</Text>
                  <Group justify="space-between" mt="md">
                    <Badge color="payfit" variant="light" size="xs">Terminée</Badge>
                    <ActionIcon variant="subtle" color="gray"><IconChevronRight size={16} /></ActionIcon>
                  </Group>
                </Box>
              ))}
            </Stack>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Text fw={700} size="sm" mb="sm">Besoin d'aide ?</Text>
            <Text size="xs" c="dimmed">Consultez notre guide sur la préparation des entretiens annuels.</Text>
            <Button variant="outline" color="gray" fullWidth mt="md" size="xs">Ouvrir le guide</Button>
          </Card>
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}
