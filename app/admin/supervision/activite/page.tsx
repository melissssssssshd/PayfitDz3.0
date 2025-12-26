"use client"

import {
  IconActivity,
  IconUser,
  IconLogin,
  IconLogout,
  IconSettings,
  IconFileText,
  IconAlertCircle,
  IconCheck,
} from "@tabler/icons-react"
import {
  Card,
  Badge,
  Group,
  Stack,
  Title,
  Text,
  SimpleGrid,
  ThemeIcon,
  Timeline,
  Box,
  rem,
} from "@mantine/core"

export default function ActivitePage() {
  const activities = [
    { id: 1, user: "Sophie Martin", action: "Connexion réussie", icon: IconLogin, time: "Il y a 2 min", type: "success" },
    {
      id: 2,
      user: "Thomas Dubois",
      action: "Modification paramètres",
      icon: IconSettings,
      time: "Il y a 5 min",
      type: "info",
    },
    { id: 3, user: "Marie Laurent", action: "Export données", icon: IconFileText, time: "Il y a 12 min", type: "info" },
    {
      id: 4,
      user: "Pierre Blanc",
      action: "Tentative connexion échouée",
      icon: IconLogin,
      time: "Il y a 18 min",
      type: "error",
    },
    { id: 5, user: "Julie Bernard", action: "Déconnexion", icon: IconLogout, time: "Il y a 23 min", type: "info" },
  ]

  return (
    <Stack gap="xl">
      <div>
        <Title order={2} fw={800} c="dark.9">Activité système</Title>
        <Text c="dimmed" size="sm">Suivi en temps réel des actions utilisateurs sur la plateforme</Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        <StatsCard label="Actions (24h)" value="12,543" icon={IconActivity} color="payfit" />
        <StatsCard label="Utilisateurs actifs" value="3,892" icon={IconUser} color="blue" />
        <StatsCard label="Connexions" value="8,421" icon={IconLogin} color="payfit" />
        <StatsCard label="Modifications" value="1,234" icon={IconSettings} color="orange" />
      </SimpleGrid>

      <Card shadow="sm" radius="md" padding="xl" withBorder>
        <Title order={3} size="h4" mb="xl">Activités récentes</Title>
        <Timeline active={activities.length} bulletSize={36} lineWidth={2}>
          {activities.map((activity) => (
            <Timeline.Item
              key={activity.id}
              bullet={
                <ThemeIcon
                  size={28}
                  radius="xl"
                  color={activity.type === "success" ? "payfit" : activity.type === "error" ? "red" : "blue"}
                  variant="light"
                >
                  <activity.icon size={16} />
                </ThemeIcon>
              }
              title={
                <Group justify="space-between">
                  <Text fw={700} size="sm">{activity.user}</Text>
                  <Text size="xs" c="dimmed">{activity.time}</Text>
                </Group>
              }
            >
              <Text size="sm" mt={4}>{activity.action}</Text>
              <Badge
                variant="light"
                size="xs"
                mt="xs"
                color={activity.type === "success" ? "payfit" : activity.type === "error" ? "red" : "blue"}
              >
                {activity.type}
              </Badge>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </Stack>
  )
}

function StatsCard({ label, value, icon: Icon, color }: any) {
  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder>
      <Group justify="space-between" align="flex-start" mb="sm">
        <ThemeIcon color={color} variant="light" size={40} radius="md">
          <Icon size={24} />
        </ThemeIcon>
      </Group>
      <Text size="xs" c="dimmed" fw={700} tt="uppercase" lts={0.5}>{label}</Text>
      <Text fw={800} size="xl" mt={2}>{value}</Text>
    </Card>
  )
}
