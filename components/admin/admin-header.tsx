"use client"

import { Menu, Group, ActionIcon, Indicator, Text, Box, Burger } from "@mantine/core"
import { IconBell, IconSettings, IconUser } from "@tabler/icons-react"
import { useState } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"

interface AdminHeaderProps {
  opened: boolean
  toggle: () => void
}

export function AdminHeader({ opened, toggle }: AdminHeaderProps) {
  const [notificationCount] = useState(5)

  return (
    <Box px="md" h="100%">
      <Group h="100%" justify="space-between">
        <Group gap="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" />
          <Group gap="sm">
            <Box
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: 'var(--mantine-color-payfit-6)',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: '0 4px 10px rgba(45, 106, 79, 0.2)'
              }}
            >
              <Text c="white" fw={800} size="md">
                P
              </Text>
            </Box>
            <Box visibleFrom="sm">
              <Text c="payfit.7" size="lg" fw={800} style={{ letterSpacing: '-0.5px' }}>
                PayFit Admin
              </Text>
              <Text c="dimmed" size="xs" fw={500}>
                Console de Supervision
              </Text>
            </Box>
          </Group>
        </Group>

        <Group gap="xs">
          <Menu position="bottom-end" width={320}>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="lg" pos="relative">
                <Indicator inline label={notificationCount} size={16} color="red" disabled={notificationCount === 0}>
                  <IconBell size={20} />
                </Indicator>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Notifications</Menu.Label>
              <Menu.Divider />
              <Menu.Item component={Link} href="/admin/notifications">
                Voir toutes les notifications
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Menu position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconSettings size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Paramètres</Menu.Label>
              <Menu.Divider />
              <Menu.Item component={Link} href="/admin/config/parametres">
                Paramètres globaux
              </Menu.Item>
              <Menu.Item component={Link} href="/admin/config/integrations">
                Intégrations
              </Menu.Item>
              <Menu.Item component={Link} href="/admin/config/api-keys">
                API Keys
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Menu position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconUser size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Mon compte</Menu.Label>
              <Menu.Divider />
              <Menu.Item>Mon profil</Menu.Item>
              <Menu.Item>Préférences</Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Déconnexion
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Box>
  )
}
