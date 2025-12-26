"use client"

import { useState } from "react"
import {
  IconShield,
  IconUsers,
  IconEdit,
  IconTrash,
  IconPlus,
  IconSearch,
  IconCheck,
  IconX,
  IconLock,
  IconEye,
  IconSettings,
  IconUserCheck,
  IconAlertCircle,
} from "@tabler/icons-react"
import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
  Badge,
  TextInput,
  ThemeIcon,
  Box,
  SimpleGrid,
  Divider,
  ActionIcon,
  Tooltip,
} from "@mantine/core"

interface Role {
  id: string
  name: string
  description: string
  color: string
  userCount: number
  permissions: {
    module: string
    read: boolean
    write: boolean
    delete: boolean
    admin: boolean
  }[]
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Administrateur",
    description: "Accès total à la gestion de l'entreprise, configuration et paie",
    color: "payfit",
    userCount: 2,
    permissions: [
      { module: "Utilisateurs", read: true, write: true, delete: true, admin: true },
      { module: "Paie", read: true, write: true, delete: true, admin: true },
      { module: "Congés", read: true, write: true, delete: true, admin: true },
      { module: "Notes de frais", read: true, write: true, delete: true, admin: true },
    ],
  },
  {
    id: "2",
    name: "Responsable RH",
    description: "Gestion opérationnelle du personnel, absences et validation de paie",
    color: "blue",
    userCount: 3,
    permissions: [
      { module: "Utilisateurs", read: true, write: true, delete: true, admin: false },
      { module: "Paie", read: true, write: true, delete: false, admin: false },
      { module: "Congés", read: true, write: true, delete: true, admin: false },
    ],
  },
  {
    id: "3",
    name: "Comptable",
    description: "Consultation des documents de paie et gestion des notes de frais",
    color: "orange",
    userCount: 2,
    permissions: [
      { module: "Paie", read: true, write: false, delete: false, admin: false },
      { module: "Notes de frais", read: true, write: true, delete: false, admin: false },
    ],
  },
  {
    id: "4",
    name: "Manager",
    description: "Validation des congés et notes de frais de son équipe",
    color: "indigo",
    userCount: 8,
    permissions: [
      { module: "Utilisateurs", read: true, write: false, delete: false, admin: false },
      { module: "Congés", read: true, write: true, delete: false, admin: false },
      { module: "Notes de frais", read: true, write: true, delete: false, admin: false },
    ],
  },
]

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(mockRoles[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRoles = mockRoles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Rôles & Permissions</Title>
          <Text c="dimmed" size="sm">Configurez les droits d'accès pour chaque profil utilisateur.</Text>
        </div>
        <Button color="payfit" leftSection={<IconPlus size={18} />} radius="md">Nouveau rôle</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
        {/* Role List */}
        <Stack gap="md">
          <TextInput
            placeholder="Filtrer les rôles..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            radius="md"
          />
          {filteredRoles.map((role) => (
            <Card
              key={role.id}
              padding="md"
              radius="md"
              withBorder
              className={`cursor-pointer transition-all ${selectedRole?.id === role.id ? 'border-payfit-500 bg-payfit-50 shadow-sm' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedRole(role)}
            >
              <Group justify="space-between" align="flex-start" mb="sm">
                <Group gap="sm">
                  <ThemeIcon color={role.color} variant="filled" radius="md" size="md">
                    <IconShield size={18} />
                  </ThemeIcon>
                  <Box>
                    <Text fw={700} size="sm">{role.name}</Text>
                    <Text size="xa-xs" c="dimmed" lineClamp={1}>{role.description}</Text>
                  </Box>
                </Group>
                <Badge color="gray" variant="light" size="xs">{role.userCount} pers.</Badge>
              </Group>
            </Card>
          ))}
        </Stack>

        {/* Permission Detail View */}
        <Card shadow="sm" radius="md" padding="xl" withBorder style={{ gridColumn: 'span 2' }}>
          {selectedRole ? (
            <Stack gap="xl">
              <Group justify="space-between">
                <Group>
                  <ThemeIcon color={selectedRole.color} size={40} radius="md">
                    <IconShield size={24} />
                  </ThemeIcon>
                  <Box>
                    <Title order={3} size="h4">{selectedRole.name}</Title>
                    <Text size="sm" c="dimmed">{selectedRole.description}</Text>
                  </Box>
                </Group>
                <Group gap="xs">
                  <Button variant="outline" color="gray" size="xs" leftSection={<IconEdit size={14} />}>Modifier</Button>
                  <Button variant="outline" color="red" size="xs"><IconTrash size={14} /></Button>
                </Group>
              </Group>

              <Divider label="Permissions détaillées" labelPosition="center" />

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {selectedRole.permissions.map((perm, i) => (
                  <Box key={i} p="md" bg="gray.0" style={{ borderRadius: 12, border: '1px solid var(--mantine-color-gray-2)' }}>
                    <Text fw={800} size="xs" mb="md" tt="uppercase" c="dark.3">{perm.module}</Text>
                    <SimpleGrid cols={2} spacing="xs">
                      <PermissionCheckbox label="Lecture" active={perm.read} />
                      <PermissionCheckbox label="Écriture" active={perm.write} />
                      <PermissionCheckbox label="Suppression" active={perm.delete} />
                      <PermissionCheckbox label="Admin" active={perm.admin} />
                    </SimpleGrid>
                  </Box>
                ))}
              </SimpleGrid>

              <Card bg="orange.0" p="md" radius="md" withBorder>
                <Group gap="xs">
                  <IconAlertCircle size={18} color="var(--mantine-color-orange-6)" />
                  <Text size="xs" c="orange.9" fw={700}>Sécurité</Text>
                </Group>
                <Text size="xs" c="orange.8" mt={4}>Toute modification de ce rôle impactera immédiatement les {selectedRole.userCount} utilisateurs associés.</Text>
              </Card>
            </Stack>
          ) : (
            <Stack align="center" justify="center" py={100} gap="md">
              <ThemeIcon size={60} radius="xl" variant="light" color="gray"><IconEye size={30} /></ThemeIcon>
              <Text c="dimmed">Sélectionnez un rôle à gauche pour voir les détails</Text>
            </Stack>
          )}
        </Card>
      </SimpleGrid>
    </Stack>
  )
}

function PermissionCheckbox({ label, active }: { label: string, active: boolean }) {
  return (
    <Group gap={8}>
      <ThemeIcon size={16} radius="xs" color={active ? 'payfit' : 'gray.3'} variant={active ? 'filled' : 'light'}>
        {active ? <IconCheck size={10} /> : <IconX size={10} />}
      </ThemeIcon>
      <Text size="xs" fw={500} c={active ? 'dark.8' : 'dimmed'}>{label}</Text>
    </Group>
  )
}
