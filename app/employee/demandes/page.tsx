"use client"

import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  ThemeIcon,
  Badge,
  Tabs,
  Box,
  rem,
  ActionIcon,
} from "@mantine/core"
import {
  IconCalendar,
  IconFileText,
  IconCurrencyEuro,
  IconClock,
  IconCheck,
  IconX,
  IconPlus,
} from "@tabler/icons-react"
import Link from "next/link"

const allRequests = [
  {
    id: 1,
    type: "leave",
    title: "Congé payé",
    description: "15-20 juillet 2024 (6 jours)",
    status: "pending",
    date: "Demandé le 10 déc",
    icon: IconCalendar,
    color: "payfit",
  },
  {
    id: 2,
    type: "expense",
    title: "Note de frais",
    description: "Transport + Restauration - €45.00",
    status: "approved",
    date: "Approuvé le 8 déc",
    icon: IconFileText,
    color: "blue",
  },
  {
    id: 3,
    type: "advance",
    title: "Acompte sur salaire",
    description: "€500.00",
    status: "pending",
    date: "Demandé le 5 déc",
    icon: IconCurrencyEuro,
    color: "orange",
  },
  {
    id: 4,
    type: "leave",
    title: "RTT",
    description: "12-14 août 2024 (3 jours)",
    status: "approved",
    date: "Approuvé le 1 déc",
    icon: IconCalendar,
    color: "payfit",
  },
  {
    id: 5,
    type: "expense",
    title: "Note de frais",
    description: "Matériel bureau - €127.50",
    status: "rejected",
    date: "Refusé le 28 nov",
    icon: IconFileText,
    color: "red",
  },
]

export default function DemandesPage() {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending": return { color: "yellow", icon: IconClock, label: "En attente" }
      case "approved": return { color: "payfit", icon: IconCheck, label: "Approuvé" }
      case "rejected": return { color: "red", icon: IconX, label: "Refusé" }
      default: return { color: "gray", icon: IconClock, label: "Inconnu" }
    }
  }

  const renderRequestCard = (request: any) => {
    const status = getStatusInfo(request.status)
    const Icon = request.icon

    return (
      <Card key={request.id} shadow="xs" radius="md" padding="md" withBorder className="hover:bg-gray-50 transition-colors">
        <Group justify="space-between" wrap="nowrap">
          <Group gap="md" wrap="nowrap">
            <ThemeIcon variant="light" color={request.color} size={48} radius="md">
              <Icon size={24} />
            </ThemeIcon>
            <div>
              <Text fw={700} size="md" c="dark.8">{request.title}</Text>
              <Text size="xs" c="dimmed">{request.description}</Text>
              <Text size="11px" c="dimmed" mt={2}>{request.date}</Text>
            </div>
          </Group>

          <Group gap="xs">
            <Badge
              variant="light"
              color={status.color}
              leftSection={<status.icon size={12} />}
            >
              {status.label}
            </Badge>
            <ActionIcon variant="subtle" color="gray">
              <IconPlus size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </Card>
    )
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Mes demandes</Text>
          <Text size="sm" c="dimmed">Suivez l'avancement de vos demandes administratives et RH</Text>
        </div>
        <Group gap="sm">
          <Button variant="light" color="payfit" component={Link} href="/employee/conges">
            Nouvelle absence
          </Button>
          <Button variant="filled" color="payfit" component={Link} href="/employee/notes-frais">
            Nouvelle dépense
          </Button>
        </Group>
      </Group>

      <Tabs defaultValue="all" color="payfit">
        <Tabs.List mb="lg">
          <Tabs.Tab value="all">Toutes ({allRequests.length})</Tabs.Tab>
          <Tabs.Tab value="pending">En attente ({allRequests.filter(r => r.status === 'pending').length})</Tabs.Tab>
          <Tabs.Tab value="approved">Approuvées</Tabs.Tab>
          <Tabs.Tab value="rejected">Refusées</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all">
          <Stack gap="sm">
            {allRequests.map(renderRequestCard)}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="pending">
          <Stack gap="sm">
            {allRequests.filter(r => r.status === 'pending').map(renderRequestCard)}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="approved">
          <Stack gap="sm">
            {allRequests.filter(r => r.status === 'approved').map(renderRequestCard)}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="rejected">
          <Stack gap="sm">
            {allRequests.filter(r => r.status === 'rejected').map(renderRequestCard)}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  )
}
