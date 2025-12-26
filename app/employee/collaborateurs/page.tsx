"use client"

import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Badge,
  TextInput,
  Avatar,
  Box,
  rem,
  ActionIcon,
  Tooltip,
  Divider,
} from "@mantine/core"
import {
  IconSearch,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendar,
  IconDots,
  IconMessageCircle,
} from "@tabler/icons-react"

const colleagues = [
  {
    id: 1,
    name: "Émilie Lambert",
    role: "Cheffe de Projet",
    email: "emilie.lambert@company.com",
    phone: "+33 6 12 34 56 78",
    location: "Marketing",
    startDate: "28/09/2022",
    initials: "EL",
    color: "blue",
  },
  {
    id: 2,
    name: "Lucas Fontaine",
    role: "Analyste Financier",
    email: "lucas.fontaine@company.com",
    phone: "+33 6 23 45 67 89",
    location: "Finance",
    startDate: "03/09/2022",
    initials: "LF",
    color: "payfit",
  },
  {
    id: 3,
    name: "Romain Garnier",
    role: "Responsable Logistique",
    email: "romain.garnier@company.com",
    phone: "+33 6 34 56 78 90",
    location: "Opérations",
    startDate: "11/02/2021",
    initials: "RG",
    color: "indigo",
  },
  {
    id: 4,
    name: "Camille Lefevre",
    role: "Développeuse",
    email: "camille.lefevre@company.com",
    phone: "+33 6 45 67 89 01",
    location: "IT",
    startDate: "16/05/2023",
    initials: "CL",
    color: "orange",
  },
]

export default function CollaborateursPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Mes collaborateurs</Text>
          <Text size="sm" c="dimmed">Retrouvez les membres de votre équipe et de l'entreprise</Text>
        </div>
        <Badge variant="light" color="payfit" size="lg" radius="md">
          25 collaborateurs actifs
        </Badge>
      </Group>

      {/* Filter Bar */}
      <Card shadow="xs" radius="md" padding="md" withBorder>
        <Group>
          <TextInput
            placeholder="Rechercher par nom, poste, équipe..."
            leftSection={<IconSearch size={18} stroke={1.5} />}
            style={{ flex: 1 }}
            radius="md"
          />
          <Button variant="light" color="gray" radius="md">Équipes</Button>
        </Group>
      </Card>

      {/* Colleagues Grid */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="lg">
        {colleagues.map((colleague) => (
          <Card key={colleague.id} shadow="sm" radius="md" padding="lg" withBorder className="hover:shadow-md transition-shadow">
            <Group justify="space-between" align="flex-start" mb="md">
              <Avatar
                size="xl"
                radius="md"
                color={colleague.color}
              >
                {colleague.initials}
              </Avatar>
              <ActionIcon variant="subtle" color="gray">
                <IconDots size={16} />
              </ActionIcon>
            </Group>

            <Box mb="xl">
              <Text fw={700} size="lg" c="dark.8">{colleague.name}</Text>
              <Text size="sm" c="payfit.7" fw={600}>{colleague.role}</Text>
              <Badge variant="dot" color="gray" size="xs" mt={4}>{colleague.location}</Badge>
            </Box>

            <Divider mb="md" variant="dotted" />

            <Stack gap="xs">
              <Group gap="xs">
                <IconMail size={14} color="var(--mantine-color-gray-5)" />
                <Text size="xs" c="dimmed" truncate>{colleague.email}</Text>
              </Group>
              <Group gap="xs">
                <IconPhone size={14} color="var(--mantine-color-gray-5)" />
                <Text size="xs" c="dimmed">{colleague.phone}</Text>
              </Group>
              <Group gap="xs">
                <IconCalendar size={14} color="var(--mantine-color-gray-5)" />
                <Text size="xs" c="dimmed">Depuis le {colleague.startDate}</Text>
              </Group>
            </Stack>

            <Group mt="xl" grow>
              <Button
                variant="light"
                color="payfit"
                radius="md"
                leftSection={<IconMessageCircle size={16} />}
              >
                Message
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
