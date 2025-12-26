"use client"

import { IconSearch } from "@tabler/icons-react"
import { NotificationsPanel } from "@/components/notifications-panel"
import { Group, Burger, TextInput, Text, Avatar, Box, rem, UnstyledButton } from "@mantine/core"

interface DashboardHeaderProps {
  opened?: boolean
  toggle?: () => void
}

export function DashboardHeader({ opened, toggle }: DashboardHeaderProps) {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Group h="100%" px="md" justify="space-between" align="center" style={{ borderBottom: "1px solid var(--mantine-color-gray-2)", backgroundColor: "white" }}>
      <Group>
        <Burger opened={opened || false} onClick={toggle} hiddenFrom="lg" size="sm" />
        <Box>
          <Text size="lg" fw={600} c="dark.8">Bonjour Marie</Text>
          <Text size="sm" c="dimmed" hiddenFrom="md">
            {new Date().toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' })}
          </Text>
          <Text size="sm" c="dimmed" visibleFrom="md" style={{ textTransform: 'capitalize' }}>
            Nous sommes le {today}
          </Text>
        </Box>
      </Group>

      <Group gap="md">
        <TextInput
          placeholder="Rechercher..."
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          visibleFrom="sm"
          radius="md"
          w={300}
        />

        <NotificationsPanel />

        <Group gap="xs" visibleFrom="sm">
          <Avatar color="primary" radius="xl">M</Avatar>
          <Text size="sm" fw={500}>Marie</Text>
        </Group>
        <Avatar color="primary" radius="xl" hiddenFrom="sm">M</Avatar>
      </Group>
    </Group>
  )
}
