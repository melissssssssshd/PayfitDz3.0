"use client"

import {
  Card,
  Text,
  Title,
  Avatar,
  Group,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Badge,
  Box,
  rem,
  Divider,
  Button,
} from "@mantine/core"
import { IconUsers, IconHierarchy2, IconBuildingSkyscraper, IconUserCheck } from "@tabler/icons-react"

const orgChart = {
  ceo: { name: "Marie Dupont", role: "CEO / Fondatrice", initials: "MD", sub: "Direction Générale" },
  departments: [
    {
      name: "Marketing & Com",
      manager: { name: "Sophie Laurent", initials: "SL" },
      members: 8,
      color: "payfit",
    },
    {
      name: "Produit & Tech",
      manager: { name: "Thomas Bernard", initials: "TB" },
      members: 12,
      color: "blue",
    },
    {
      name: "Ventes & CSM",
      manager: { name: "Julien Martin", initials: "JM" },
      members: 3,
      color: "orange",
    },
    {
      name: "Finance & Admin",
      manager: { name: "Isabelle Martin", initials: "IM" },
      members: 2,
      color: "gray",
    },
  ],
}

export default function OrganigrammePage() {
  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Organigramme</Title>
          <Text c="dimmed" size="sm">Structure hiérarchique et répartition des équipes.</Text>
        </div>
        <Badge variant="light" color="payfit" size="lg" leftSection={<IconHierarchy2 size={16} />}>25 Collaborateurs</Badge>
      </Group>

      {/* CEO Level */}
      <Stack align="center" gap={0}>
        <Card shadow="md" radius="md" padding="xl" withBorder w={300} style={{ borderBottom: '4px solid var(--mantine-color-payfit-6)' }}>
          <Stack align="center" gap="sm">
            <Avatar size={rem(80)} radius="xl" color="payfit" variant="filled" fw={700}>
              {orgChart.ceo.initials}
            </Avatar>
            <Box ta="center">
              <Text fw={800} size="lg">{orgChart.ceo.name}</Text>
              <Text size="xs" fw={700} c="payfit.7" tt="uppercase">{orgChart.ceo.role}</Text>
              <Text size="xs" c="dimmed" mt={4}>{orgChart.ceo.sub}</Text>
            </Box>
          </Stack>
        </Card>
        <Box h={40} w={2} bg="payfit.2" />
        <Box w="80%" h={2} bg="payfit.2" style={{ borderRadius: 2 }} />
      </Stack>

      {/* Department Level */}
      <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="xl">
        {orgChart.departments.map((dept) => (
          <Stack key={dept.name} align="center" gap={0}>
            <Box h={30} w={2} bg="payfit.2" />
            <Card shadow="sm" radius="md" padding="lg" withBorder w="100%" className="hover:shadow-md transition-shadow">
              <Group justify="space-between" mb="md">
                <ThemeIcon color={dept.color} variant="light" radius="md">
                  <IconBuildingSkyscraper size={18} />
                </ThemeIcon>
                <Badge variant="light" color="gray" size="xs">{dept.members} pers.</Badge>
              </Group>
              <Text fw={800} size="sm" mb="md" lineClamp={1}>{dept.name}</Text>

              <Divider mb="md" label="Manager" labelPosition="center" />

              <Group gap="sm">
                <Avatar color={dept.color} radius="xl" size="sm">{dept.manager.initials}</Avatar>
                <Box>
                  <Text fw={700} size="xs">{dept.manager.name}</Text>
                  <Text size="10px" c="dimmed">Dir. de département</Text>
                </Box>
              </Group>
            </Card>
          </Stack>
        ))}
      </SimpleGrid>

      {/* Info Widget */}
      <Card bg="gray.0" padding="lg" radius="md" mt="xl">
        <Group gap="lg">
          <ThemeIcon size="xl" radius="md" color="blue" variant="light">
            <IconUserCheck size={24} />
          </ThemeIcon>
          <Box style={{ flex: 1 }}>
            <Text fw={700} size="sm">Mise à jour automatique</Text>
            <Text size="xs" c="dimmed">L'organigramme se met à jour en temps réel lors de l'ajout de nouveaux collaborateurs ou du changement de manager.</Text>
          </Box>
          <Button variant="subtle" color="blue">Configurer les niveaux</Button>
        </Group>
      </Card>
    </Stack>
  )
}
