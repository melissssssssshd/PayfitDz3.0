"use client"

import {
  IconSearch,
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconMail,
  IconPhone,
  IconDotsVertical,
  IconUserPlus,
  IconFilter,
  IconCalendar,
  IconPlus,
  IconX,
  IconUser,
} from "@tabler/icons-react"
import Link from "next/link"
import {
  Avatar,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Text,
  TextInput,
  Title,
  Stack,
  ThemeIcon,
  ActionIcon,
  Badge,
  Menu,
} from "@mantine/core"

const employees = [
  {
    id: 1,
    name: "Sylvie Lessage",
    initials: "SL",
    position: "Responsable RH",
    manager: "Isabelle Martin",
    team: "Ressources Humaines",
    startDate: "06/01/2021",
    email: "sylvie.l@acmestudio.com",
    color: "payfit",
  },
  {
    id: 2,
    name: "Émilie Lambert",
    initials: "EL",
    position: "Cheffe de Projet",
    manager: "Sarah Dupont",
    team: "Marketing",
    startDate: "28/09/2022",
    email: "emilie.l@acmestudio.com",
    color: "blue",
  },
  {
    id: 3,
    name: "Lucas Fontaine",
    role: "Analyste Financier",
    manager: "Émilie Lambert",
    team: "Finance",
    startDate: "03/09/2022",
    email: "lucas.f@acmestudio.com",
    initials: "LF",
    color: "indigo",
  },
  {
    id: 4,
    name: "Romain Garnier",
    position: "Responsable Logistique",
    team: "Opérations",
    startDate: "11/02/2021",
    email: "romain.g@acmestudio.com",
    initials: "RG",
    color: "orange",
  },
]

export default function CollaborateursPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Répertoire des collaborateurs</Title>
          <Text c="dimmed" size="sm">Gérez l'ensemble des membres de votre organisation.</Text>
        </div>
        <Button
          color="payfit"
          size="md"
          leftSection={<IconUserPlus size={18} />}
          radius="md"
        >
          Ajouter un collaborateur
        </Button>
      </Group>

      {/* Filter Bar */}
      <Card shadow="sm" radius="md" padding="md" withBorder>
        <Group justify="space-between">
          <TextInput
            placeholder="Rechercher par nom, poste, équipe..."
            leftSection={<IconSearch size={18} stroke={1.5} />}
            style={{ flex: 1, maxWidth: 500 }}
            radius="md"
          />
          <Group gap="xs">
            <Button variant="outline" color="gray" leftSection={<IconFilter size={16} />} radius="md">Filtres</Button>
            <Button variant="light" color="payfit" rightSection={<IconChevronDown size={16} />} radius="md">Trier par</Button>
          </Group>
        </Group>
      </Card>

      {/* Quick stats badges */}
      <Group gap="xs">
        <Badge variant="light" color="payfit" size="lg">25 Actifs</Badge>
        <Badge variant="light" color="blue" size="lg">4 Nouvelles recrues</Badge>
        <Badge variant="light" color="orange" size="lg">2 Départs prévus</Badge>
      </Group>

      {/* Employee Cards Grid */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="lg">
        {employees.map((employee) => (
          <Card
            key={employee.id}
            shadow="sm"
            radius="md"
            padding="lg"
            withBorder
            className="hover:shadow-md transition-shadow cursor-pointer"
            component={Link}
            href={`/dashboard/collaborateurs/${employee.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Group justify="space-between" align="flex-start" mb="md">
              <Avatar
                size="xl"
                radius="md"
                color={employee.color || 'payfit'}
              >
                {employee.initials}
              </Avatar>
              <Menu position="bottom-end">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray" onClick={(e) => e.preventDefault()}>
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconMail size={14} />}>Envoyer un email</Menu.Item>
                  <Menu.Item leftSection={<IconPlus size={14} />}>Ajouter un document</Menu.Item>
                  <Menu.Item color="red" leftSection={<IconX size={14} />}>Supprimer</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>

            <Box mb="md">
              <Text fw={800} size="lg" c="dark.9" lineClamp={1}>{employee.name}</Text>
              <Text size="sm" c="payfit.7" fw={700}>{employee.position || employee.role}</Text>
              <Badge variant="light" color="gray" size="xs" mt={4} radius="sm">
                {employee.team || "Non assigné"}
              </Badge>
            </Box>

            <Stack gap={8} mt="xl">
              <Group gap="xs">
                <IconMail size={14} color="var(--mantine-color-gray-5)" />
                <Text size="xs" c="dimmed" truncate>{employee.email}</Text>
              </Group>
              <Group gap="xs">
                <IconCalendar size={14} color="var(--mantine-color-gray-5)" />
                <Text size="xs" c="dimmed">Début : {employee.startDate}</Text>
              </Group>
              {employee.manager && (
                <Group gap="xs">
                  <IconUser size={14} color="var(--mantine-color-gray-5)" />
                  <Text size="xs" c="dimmed">Manager : {employee.manager}</Text>
                </Group>
              )}
            </Stack>
          </Card>
        ))}

        {/* Empty State / Add New Card */}
        <Card
          shadow="none"
          radius="md"
          padding="lg"
          withBorder
          style={{
            borderStyle: 'dashed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
          }}
          className="hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Stack align="center" gap="xs">
            <ThemeIcon variant="light" color="gray" size="xl" radius="xl">
              <IconUserPlus size={24} />
            </ThemeIcon>
            <Text fw={600} size="sm" c="gray.6">Ajouter un collaborateur</Text>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  )
}
