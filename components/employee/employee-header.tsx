"use client"

import { Group, TextInput, Burger, Text, Button, Avatar, rem } from "@mantine/core"
import { IconSearch, IconChevronDown } from "@tabler/icons-react"
import { NotificationsPanel } from "@/components/notifications-panel"

interface EmployeeHeaderProps {
  opened: boolean
  toggle: () => void
}

export function EmployeeHeader({ opened, toggle }: EmployeeHeaderProps) {
  return (
    <Group h="100%" px="md" justify="space-between" align="center">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group align="baseline" gap="xs">
          <Text fw={800} size="xl" c="dark.9" style={{ fontSize: '1.5rem', letterSpacing: '-0.5px' }}>
            Bonjour, Catherine
          </Text>
          <Text size="xl">👋</Text>
        </Group>
      </Group>

      <Group flex={1} justify="center" visibleFrom="xs">
        <TextInput
          placeholder="Rechercher ici..."
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          radius="xl"
          size="md"
          w={400}
          styles={{
            input: {
              backgroundColor: "var(--mantine-color-gray-0)",
              border: "none",
            }
          }}
        />
      </Group>

      <Group gap="sm">
        <NotificationsPanel />
        <Group gap="xs" style={{ cursor: "pointer" }} visibleFrom="sm">
          <Avatar src={null} alt="Catherine" color="payfit" radius="xl">CD</Avatar>
          <div style={{ lineHeight: 1 }}>
            <Text size="sm" fw={700} c="dark.9">Catherine D.</Text>
            <Text size="xs" c="dimmed">Employée</Text>
          </div>
          <IconChevronDown size={14} style={{ color: "var(--mantine-color-gray-5)" }} />
        </Group>
      </Group>
    </Group>
  )
}
