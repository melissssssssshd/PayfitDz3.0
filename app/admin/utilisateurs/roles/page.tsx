"use client"

import { useState } from "react"
import {
  IconShield,
  IconUsers,
  IconCheck,
  IconX,
  IconPlus,
  IconLock,
  IconSettings,
  IconHeadset,
  IconBriefcase,
  IconReceipt2,
} from "@tabler/icons-react"
import {
  Card,
  Button,
  Badge,
  Table,
  Group,
  Stack,
  Title,
  Text,
  SimpleGrid,
  ThemeIcon,
  rem,
  Box,
  Checkbox,
} from "@mantine/core"

const modules = [
  { id: "entreprises", label: "Gestion Entreprises", icon: IconSettings },
  { id: "utilisateurs", label: "Gestion Utilisateurs", icon: IconUsers },
  { id: "supervision", label: "Supervision Système", icon: IconShield },
  { id: "facturation", label: "Facturation & Paiement", icon: IconReceipt2 },
  { id: "configuration", label: "Configuration Plateforme", icon: IconLock },
  { id: "support", label: "Support & Assistance", icon: IconHeadset },
]

const initialRoles = [
  {
    name: "Comptable",
    users: 5,
    color: "blue",
    icon: IconReceipt2,
    permissions: ["facturation", "supervision"],
  },
  {
    name: "RH Manager",
    users: 12,
    color: "payfit",
    icon: IconBriefcase,
    permissions: ["utilisateurs", "support"],
  },
  {
    name: "Support",
    users: 24,
    color: "orange",
    icon: IconHeadset,
    permissions: ["support", "utilisateurs"],
  },
  {
    name: "Commercial",
    users: 8,
    color: "indigo",
    icon: IconBriefcase,
    permissions: ["entreprises", "support"],
  },
]

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles)

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} fw={800} c="dark.9">Rôles & Permissions Back-office</Title>
          <Text c="dimmed" size="sm">Définissez les accès pour les équipes internes (Comptable, RH, Support...)</Text>
        </div>
        <Button
          color="payfit.6"
          radius="md"
          leftSection={<IconPlus size={18} />}
        >
          Nouveau rôle
        </Button>
      </Group>

      {/* Roles Grid */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        {roles.map((role) => (
          <Card key={role.name} shadow="sm" radius="md" padding="xl" withBorder>
            <Group justify="space-between" mb="lg">
              <Group>
                <ThemeIcon color={role.color} variant="light" size="xl" radius="md">
                  <role.icon size={24} />
                </ThemeIcon>
                <Box>
                  <Text fw={700} size="lg">{role.name}</Text>
                  <Group gap={4}>
                    <IconUsers size={14} color="var(--mantine-color-gray-5)" />
                    <Text size="xs" c="dimmed">{role.users} utilisateurs affectés</Text>
                  </Group>
                </Box>
              </Group>
              <Badge color={role.color} variant="light">Système</Badge>
            </Group>

            <Stack gap="xs">
              <Text size="sm" fw={700} c="dark.7" mb={4}>Permissions actives :</Text>
              {modules.map((module) => {
                const hasPermission = role.permissions.includes(module.id)
                return (
                  <Group key={module.id} justify="space-between" wrap="nowrap">
                    <Group gap="xs">
                      <module.icon size={16} color={hasPermission ? "var(--mantine-color-dark-6)" : "var(--mantine-color-gray-4)"} />
                      <Text size="xs" c={hasPermission ? "dark.6" : "gray.4"}>{module.label}</Text>
                    </Group>
                    {hasPermission ? (
                      <IconCheck size={16} color="var(--mantine-color-payfit-6)" />
                    ) : (
                      <IconX size={16} color="var(--mantine-color-gray-4)" />
                    )}
                  </Group>
                )
              })}
            </Stack>

            <Button
              variant="light"
              color="gray"
              fullWidth
              mt="xl"
              radius="md"
              leftSection={<IconLock size={14} />}
            >
              Modifier les accès
            </Button>
          </Card>
        ))}
      </SimpleGrid>

      {/* Permissions Matrix */}
      <Card shadow="sm" radius="md" padding="xl" withBorder>
        <Title order={3} size="h4" mb="xl">Matrice récapitulative des permissions</Title>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md" withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Module / Fonctionnalité</Table.Th>
                {roles.map((role) => (
                  <Table.Th key={role.name} style={{ textAlign: "center" }}>{role.name}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {modules.map((module) => (
                <Table.Tr key={module.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <module.icon size={18} color="var(--mantine-color-payfit-6)" />
                      <Text size="sm" fw={600}>{module.label}</Text>
                    </Group>
                  </Table.Td>
                  {roles.map((role) => (
                    <Table.Td key={role.name} style={{ textAlign: "center" }}>
                      {role.permissions.includes(module.id) ? (
                        <ThemeIcon color="payfit" variant="light" radius="xl" size="sm">
                          <IconCheck size={12} stroke={3} />
                        </ThemeIcon>
                      ) : (
                        <IconX size={16} color="var(--mantine-color-gray-4)" />
                      )}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>
    </Stack>
  )
}
