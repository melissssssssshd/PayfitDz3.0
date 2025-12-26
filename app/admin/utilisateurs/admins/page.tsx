"use client"

import { useState } from "react"
import {
  IconSearch,
  IconUserPlus,
  IconShield,
  IconMail,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react"
import {
  Card,
  Button,
  TextInput,
  Badge,
  Group,
  Stack,
  Title,
  Text,
  Avatar,
  Box,
  rem,
  ActionIcon,
  Menu,
} from "@mantine/core"

export default function AdminsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const admins = [
    {
      id: 1,
      name: "Sophie Martin",
      email: "sophie.martin@payfit.com",
      role: "Super Admin",
      status: "Actif",
      lastActive: "Maintenant",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      email: "thomas.dubois@payfit.com",
      role: "Admin",
      status: "Actif",
      lastActive: "Il y a 5min",
    },
    {
      id: 3,
      name: "Marie Laurent",
      email: "marie.laurent@payfit.com",
      role: "Admin",
      status: "Actif",
      lastActive: "Il y a 2h",
    },
    {
      id: 4,
      name: "Pierre Blanc",
      email: "pierre.blanc@payfit.com",
      role: "Support Admin",
      status: "Inactif",
      lastActive: "Il y a 3 jours",
    },
  ]

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} fw={800} c="dark.9">Administrateurs Plateforme</Title>
          <Text c="dimmed" size="sm">{admins.length} administrateurs avec accès privilégié</Text>
        </div>
        <Button
          color="payfit.6"
          radius="md"
          leftSection={<IconUserPlus size={18} />}
        >
          Nouvel admin
        </Button>
      </Group>

      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <TextInput
          placeholder="Rechercher un administrateur..."
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
          radius="md"
          mb="xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
        />

        <Stack gap="md">
          {admins.map((admin) => (
            <Card
              key={admin.id}
              p="md"
              radius="md"
              withBorder
              className="hover:bg-gray-50 transition-colors"
            >
              <Group justify="space-between" wrap="nowrap">
                <Group gap="md">
                  <Avatar color="payfit" radius="xl" size="lg" variant="light">
                    <IconShield size={24} />
                  </Avatar>
                  <Box>
                    <Text size="sm" fw={700}>{admin.name}</Text>
                    <Group gap={4} wrap="nowrap">
                      <IconMail size={12} color="var(--mantine-color-gray-5)" />
                      <Text size="xs" c="dimmed">{admin.email}</Text>
                    </Group>
                  </Box>
                </Group>

                <Group gap="xl">
                  <Box visibleFrom="sm" style={{ textAlign: 'right' }}>
                    <Badge variant="outline" color="blue">{admin.role}</Badge>
                    <Text size="xs" c="dimmed" mt={4}>{admin.lastActive}</Text>
                  </Box>
                  <Badge
                    variant="dot"
                    color={admin.status === "Actif" ? "payfit" : "gray"}
                    radius="sm"
                  >
                    {admin.status}
                  </Badge>
                  <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                      <ActionIcon variant="subtle" color="gray">
                        <IconDotsVertical size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item leftSection={<IconEdit size={14} />}>Modifier</Menu.Item>
                      <Menu.Item color="red" leftSection={<IconTrash size={14} />}>Retirer accès</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      </Card>
    </Stack>
  )
}
