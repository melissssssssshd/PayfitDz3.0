"use client"

import {
  IconCurrencyEuro,
  IconCalendar,
  IconCheck,
  IconX,
  IconClock,
  IconChecks,
} from "@tabler/icons-react"
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  ThemeIcon,
  Box,
  Divider,
} from "@mantine/core"

const advanceRequests = [
  {
    id: 1,
    name: "Sophie Martin",
    initials: "SM",
    amount: "500 €",
    requestDate: "15/12/2024",
    paymentDate: "20/12/2024",
    status: "En attente",
    color: "orange",
  },
  {
    id: 2,
    name: "Alexandre Dubois",
    initials: "AD",
    amount: "300 €",
    requestDate: "10/12/2024",
    paymentDate: "15/12/2024",
    status: "Approuvé",
    color: "payfit",
  },
]

export default function AcomptesPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Acomptes sur salaire</Title>
          <Text c="dimmed" size="sm">Gérez les demandes d'acomptes de vos collaborateurs.</Text>
        </div>
        <Button color="payfit" leftSection={<IconCurrencyEuro size={16} />} radius="md">Traiter les virements</Button>
      </Group>

      {/* KPI Stats */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">En attente</Text>
          <Group justify="space-between" align="flex-end" mt={4}>
            <Text fw={800} size="xl" c="orange.7">1 Demande</Text>
            <ThemeIcon color="orange" variant="light" size="md"><IconClock size={16} /></ThemeIcon>
          </Group>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
          <Text size="xs" c="payfit.8" fw={700} tt="uppercase">Montant total (Mois)</Text>
          <Group justify="space-between" align="flex-end" mt={4}>
            <Text fw={800} size="xl" c="payfit.9">800,00 €</Text>
            <ThemeIcon color="payfit" variant="light" size="md"><IconCurrencyEuro size={16} /></ThemeIcon>
          </Group>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Traités ce mois</Text>
          <Group justify="space-between" align="flex-end" mt={4}>
            <Text fw={800} size="xl">2 Acomptes</Text>
            <ThemeIcon color="gray" variant="light" size="md"><IconChecks size={16} /></ThemeIcon>
          </Group>
        </Card>
      </SimpleGrid>

      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <Title order={3} size="h4" mb="xl">Demandes d'acomptes</Title>
        <Stack gap="sm">
          {advanceRequests.map((request) => (
            <Box
              key={request.id}
              p="md"
              style={{ border: '1px solid var(--mantine-color-gray-1)', borderRadius: 12 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <Group justify="space-between" wrap="nowrap">
                <Group gap="md">
                  <Avatar color={request.color} radius="md">{request.initials}</Avatar>
                  <Box>
                    <Text fw={700} size="sm">{request.name}</Text>
                    <Text size="xs" c="dimmed">Demandé le {request.requestDate}</Text>
                  </Box>
                </Group>

                <Group gap="xl">
                  <Box ta="right">
                    <Text fw={800} size="md" c="dark.7">{request.amount}</Text>
                    <Text size="10px" c="dimmed">Prélèvement prévu : {request.paymentDate}</Text>
                  </Box>
                  <Badge
                    variant="light"
                    color={request.status === "En attente" ? "orange" : "payfit"}
                    radius="sm"
                    w={100}
                  >
                    {request.status}
                  </Badge>
                  {request.status === "En attente" ? (
                    <Group gap="xs">
                      <Button variant="light" color="red" size="xs">Refuser</Button>
                      <Button color="payfit" size="xs">Approuver</Button>
                    </Group>
                  ) : (
                    <ThemeIcon variant="light" color="payfit" size="md" radius="xl"><IconCheck size={16} /></ThemeIcon>
                  )}
                </Group>
              </Group>
            </Box>
          ))}
        </Stack>
      </Card>
    </Stack>
  )
}
