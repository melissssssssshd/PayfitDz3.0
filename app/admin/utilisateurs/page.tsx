"use client"

import { useState } from "react"
import {
  IconSearch,
  IconUserPlus,
  IconDotsVertical,
  IconMail,
  IconShield,
  IconCheck,
  IconX,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react"
import {
  Card,
  Button,
  TextInput,
  Badge,
  Table,
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

export default function UtilisateursPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: 1,
      name: "Sophie Martin",
      email: "sophie.martin@email.com",
      role: "Super Admin",
      status: "Actif",
      company: "PayFit HQ",
      lastActive: "Il y a 5 min",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      email: "thomas.dubois@email.com",
      role: "Admin",
      status: "Actif",
      company: "TechCorp",
      lastActive: "Il y a 2h",
    },
    {
      id: 3,
      name: "Marie Lambert",
      email: "marie.lambert@email.com",
      role: "RH Manager",
      status: "Actif",
      company: "Retail Plus",
      lastActive: "Il y a 1 jour",
    },
    {
      id: 4,
      name: "Pierre Rousseau",
      email: "pierre.rousseau@email.com",
      role: "Employé",
      status: "Actif",
      company: "Services Inc",
      lastActive: "Il y a 3h",
    },
    {
      id: 5,
      name: "Julie Bernard",
      email: "julie.bernard@email.com",
      role: "RH Manager",
      status: "Inactif",
      company: "Design Studio",
      lastActive: "Il y a 7 jours",
    },
  ]

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} fw={800} c="dark.9">Gestion des utilisateurs</Title>
          <Text c="dimmed" size="sm">{users.length} utilisateurs au total sur la plateforme</Text>
        </div>
        <Button
          color="payfit.6"
          radius="md"
          leftSection={<IconUserPlus size={18} />}
        >
          Nouvel utilisateur
        </Button>
      </Group>

      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <Group mb="lg">
          <TextInput
            placeholder="Rechercher par nom, email ou entreprise..."
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
            style={{ flex: 1 }}
            radius="md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
          />
        </Group>

        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Utilisateur</Table.Th>
                <Table.Th>Entreprise</Table.Th>
                <Table.Th>Rôle</Table.Th>
                <Table.Th>Statut</Table.Th>
                <Table.Th>Dernière activité</Table.Th>
                <Table.Th style={{ width: rem(40) }}></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {users.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar color="payfit" radius="xl" size="md">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </Avatar>
                      <Box>
                        <Text size="sm" fw={700}>{user.name}</Text>
                        <Group gap={4} wrap="nowrap">
                          <IconMail size={12} color="var(--mantine-color-gray-5)" />
                          <Text size="xs" c="dimmed">{user.email}</Text>
                        </Group>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{user.company}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue" radius="sm" leftSection={<IconShield size={12} />}>
                      {user.role}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="dot"
                      color={user.status === "Actif" ? "payfit" : "gray"}
                      radius="sm"
                    >
                      {user.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" c="dimmed">{user.lastActive}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Menu shadow="md" width={200} position="bottom-end">
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                          <IconDotsVertical size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Actions utilisateur</Menu.Label>
                        <Menu.Item leftSection={<IconEdit size={14} />}>Modifier</Menu.Item>
                        <Menu.Item leftSection={<IconMail size={14} />}>Contacter</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item color="red" leftSection={<IconTrash size={14} />}>Supprimer</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>
    </Stack>
  )
}
