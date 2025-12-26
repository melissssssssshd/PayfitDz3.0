"use client"

import {
  IconCalendar,
  IconPlus,
  IconUsers,
  IconChevronRight,
  IconAdjustmentsHorizontal,
  IconTimeline,
} from "@tabler/icons-react"
import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
  ThemeIcon,
  rem,
  SimpleGrid,
  Box,
  Badge,
  Avatar,
  AvatarGroup,
  Progress,
  ActionIcon,
} from "@mantine/core"

const activePlannings = [
  {
    id: 1,
    team: "Équipe Marketing",
    title: "Campagne Hiver 2024",
    members: ["EL", "LF", "RG"],
    progress: 75,
    status: "En cours",
    deadline: "31 déc. 2024",
    color: "payfit",
  },
  {
    id: 2,
    team: "Développement",
    title: "Sprint Q4 - V2.0",
    members: ["CD", "AS", "TM", "NC"],
    progress: 40,
    status: "En cours",
    deadline: "15 jan. 2025",
    color: "blue",
  },
]

export default function PlanningPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Plannings & Ressources</Title>
          <Text c="dimmed" size="sm">Organisez le travail de vos équipes et suivez l'avancement.</Text>
        </div>
        <Button color="payfit" leftSection={<IconPlus size={18} />} radius="md">
          Nouveau planning
        </Button>
      </Group>

      {/* Stats Summary */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
          <Text size="xs" c="payfit.8" fw={700} tt="uppercase">Plannings actifs</Text>
          <Text fw={800} size="xl" mt={4} c="payfit.9">8 Projets</Text>
          <Text size="xs" c="payfit.7" mt={4}>4 équipes impliquées</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Occupation Équipe</Text>
          <Text fw={800} size="xl" mt={4}>85%</Text>
          <Text size="xs" c="dimmed" mt={4}>Disponibilité : 45h / semaine</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Échéances (7j)</Text>
          <Text fw={800} size="xl" mt={4} c="orange.7">3</Text>
          <Text size="xs" c="dimmed" mt={4}>Livraisons critiques à venir</Text>
        </Card>
      </SimpleGrid>

      {/* Active Plannings List */}
      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <Group justify="space-between" mb="xl">
          <Title order={3} size="h4">Suivi des plannings</Title>
          <ActionIcon variant="light" color="gray"><IconAdjustmentsHorizontal size={18} /></ActionIcon>
        </Group>

        <Stack gap="md">
          {activePlannings.map((plan) => (
            <Box
              key={plan.id}
              p="lg"
              style={{ border: '1px solid var(--mantine-color-gray-1)', borderRadius: 12 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <Group justify="space-between" wrap="nowrap">
                <Box style={{ flex: 1 }}>
                  <Group gap="xs" mb={4}>
                    <Badge size="xs" variant="light" color={plan.color}>{plan.team}</Badge>
                    <Text size="xs" c="dimmed">•</Text>
                    <Text size="xs" c="dimmed">Échéance : {plan.deadline}</Text>
                  </Group>
                  <Text fw={800} size="lg">{plan.title}</Text>
                  <Group mt="md" gap="xl">
                    <Box style={{ width: 250 }}>
                      <Group justify="space-between" mb={4}>
                        <Text size="xs" fw={700}>Progression</Text>
                        <Text size="xs" fw={700}>{plan.progress}%</Text>
                      </Group>
                      <Progress value={plan.progress} color={plan.color} size="sm" radius="xl" />
                    </Box>
                    <AvatarGroup>
                      {plan.members.map(m => <Avatar key={m} size="sm" radius="xl">{m}</Avatar>)}
                    </AvatarGroup>
                  </Group>
                </Box>
                <Button variant="light" color="gray" rightSection={<IconChevronRight size={14} />}>Gérer</Button>
              </Group>
            </Box>
          ))}
        </Stack>

        <Button variant="subtle" color="payfit" mt="xl" fullWidth leftSection={<IconTimeline size={18} />}>
          Voir le diagramme de Gantt complet
        </Button>
      </Card>
    </Stack>
  )
}
