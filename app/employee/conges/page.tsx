"use client"

import { useState } from "react"
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Badge,
  RingProgress,
  TextInput,
  Textarea,
  Select,
  Box,
  rem,
  Progress,
  Divider,
  ActionIcon,
} from "@mantine/core"
import { DateInput } from "@mantine/dates"
import {
  IconPlus,
  IconCheck,
  IconClock,
  IconX,
  IconCalendar,
  IconInfoCircle,
  IconChevronRight,
  IconTrendingUp,
} from "@tabler/icons-react"

const leaveTypes = [
  { value: "paid", label: "Congé payé", balance: 12, total: 30, color: "payfit" },
  { value: "rtt", label: "RTT", balance: 5, total: 12, color: "blue" },
  { value: "family", label: "Congé familial", balance: 3, total: 5, color: "orange" },
  { value: "sick", label: "Congé maladie", balance: 0, total: 0, color: "red" },
  { value: "unpaid", label: "Congé sans solde", balance: 0, total: 0, color: "gray" },
]

const pendingRequests = [
  {
    id: 1,
    type: "Congé payé",
    startDate: "15/07/2024",
    endDate: "20/07/2024",
    days: 6,
    status: "pending",
    reason: "Vacances d'été",
  },
  {
    id: 2,
    type: "RTT",
    startDate: "12/08/2024",
    endDate: "14/08/2024",
    days: 3,
    status: "approved",
    reason: "Long weekend",
  },
  {
    id: 3,
    type: "Congé payé",
    startDate: "20/12/2024",
    endDate: "02/01/2025",
    days: 10,
    status: "rejected",
    reason: "Période de forte activité",
  },
]

export default function CongesPage() {
  const [showForm, setShowForm] = useState(false)
  const [leaveType, setLeaveType] = useState<string | null>(null)

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Demandes de congé</Text>
          <Text size="sm" c="dimmed">Gérez vos absences et consultez vos soldes en temps réel</Text>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          color="payfit"
          leftSection={<IconPlus size={16} />}
          radius="md"
        >
          Nouvelle demande
        </Button>
      </Group>

      {/* Leave Balances Header Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 5 }} spacing="md">
        {leaveTypes.filter(t => t.total > 0).map((type) => (
          <Card key={type.value} shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="center" mb="xs">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase">{type.label}</Text>
              <ThemeIcon variant="light" color={type.color} size="sm" radius="xl" />
            </Group>
            <Group justify="space-between" align="flex-end">
              <div>
                <Text size="1.5rem" fw={800} c="dark.9">{type.balance}</Text>
                <Text size="xs" c="dimmed">jours restants</Text>
              </div>
              <RingProgress
                size={50}
                thickness={5}
                roundCaps
                sections={[{ value: (type.balance / type.total) * 100, color: type.color }]}
              />
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      {/* Formulaire de demande */}
      {showForm && (
        <Card shadow="md" padding="xl" radius="md" withBorder bg="payfit.0">
          <Stack gap="md">
            <div>
              <Text fw={700} size="lg" c="payfit.9">Nouvelle demande de congé</Text>
              <Text size="sm" c="payfit.8">Complétez le formulaire ci-dessous</Text>
            </div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              <Select
                label="Type de congé"
                placeholder="Sélectionner un type"
                data={leaveTypes.map(t => ({ value: t.value, label: `${t.label} (${t.balance}j)` }))}
                value={leaveType}
                onChange={setLeaveType}
                radius="md"
              />
              <TextInput
                label="Statut"
                value="Brouillon"
                disabled
                radius="md"
                styles={{ input: { opacity: 0.7 } }}
              />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              <DateInput
                label="Date de début"
                placeholder="Choisir une date"
                radius="md"
                leftSection={<IconCalendar size={16} stroke={1.5} />}
              />
              <DateInput
                label="Date de fin"
                placeholder="Choisir une date"
                radius="md"
                leftSection={<IconCalendar size={16} stroke={1.5} />}
              />
            </SimpleGrid>

            <Textarea
              label="Motif de la demande"
              placeholder="Décrivez brièvement la raison de votre demande..."
              minRows={3}
              radius="md"
            />

            <Group p="md" bg="white" style={{ borderRadius: 8, border: '1px dashed var(--mantine-color-payfit-3)' }}>
              <ThemeIcon variant="light" color="payfit" size="lg" radius="md">
                <IconInfoCircle size={20} />
              </ThemeIcon>
              <Box style={{ flex: 1 }}>
                <Text size="sm" fw={600} c="dark.8">Durée calculée</Text>
                <Text size="xs" c="dimmed">6 jours ouvrés (du 15/07 au 20/07)</Text>
              </Box>
            </Group>

            <Group justify="flex-end" mt="md">
              <Button variant="subtle" color="gray" onClick={() => setShowForm(false)}>Annuler</Button>
              <Button color="payfit" radius="md">Soumettre la demande</Button>
            </Group>
          </Stack>
        </Card>
      )}

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        {/* Historique des demandes */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="lg">
            <div>
              <Text fw={700} size="lg">Historique de mes demandes</Text>
              <Text size="xs" c="dimmed">Consultez l'état de vos soumissions</Text>
            </div>
            <Button variant="subtle" size="xs" color="gray">Voir tout</Button>
          </Group>

          <Stack gap="md">
            {pendingRequests.map((request) => (
              <Group key={request.id} justify="space-between" p="sm" className="hover:bg-gray-50 rounded-md transition-colors" wrap="nowrap">
                <Group gap="md" wrap="nowrap">
                  <ThemeIcon
                    variant="light"
                    color={request.status === 'approved' ? 'payfit' : request.status === 'pending' ? 'yellow' : 'red'}
                    size="lg"
                    radius="md"
                  >
                    {request.status === 'approved' && <IconCheck size={20} />}
                    {request.status === 'pending' && <IconClock size={20} />}
                    {request.status === 'rejected' && <IconX size={20} />}
                  </ThemeIcon>
                  <div>
                    <Text size="sm" fw={700} c="dark.8">{request.type}</Text>
                    <Text size="xs" c="dimmed">Du {request.startDate} au {request.endDate} ({request.days}j)</Text>
                  </div>
                </Group>
                <Group>
                  <Badge
                    color={request.status === 'approved' ? 'payfit' : request.status === 'pending' ? 'yellow' : 'red'}
                    variant="light"
                  >
                    {request.status === 'approved' ? 'Approuvé' : request.status === 'pending' ? 'En attente' : 'Refusé'}
                  </Badge>
                  <ActionIcon variant="subtle" color="gray" visibleFrom="sm">
                    <IconChevronRight size={16} />
                  </ActionIcon>
                </Group>
              </Group>
            ))}
          </Stack>
        </Card>

        {/* Utilisation annuelle Stats */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="lg">
            <div>
              <Text fw={700} size="lg">Utilisation des congés 2024</Text>
              <Text size="xs" c="dimmed">Aperçu de votre consommation annuelle</Text>
            </div>
            <ThemeIcon variant="light" color="payfit">
              <IconTrendingUp size={18} />
            </ThemeIcon>
          </Group>

          <Stack gap="xl">
            {[
              { label: "Congés payés", used: 18, total: 30, color: "payfit" },
              { label: "RTT", used: 7, total: 12, color: "blue" },
              { label: "Congés familiaux", used: 2, total: 5, color: "orange" },
            ].map((item) => (
              <div key={item.label}>
                <Group justify="space-between" mb={8}>
                  <Text size="sm" fw={600} c="dark.8">{item.label}</Text>
                  <Text size="sm" fw={700} c={item.color}>{item.used}/{item.total} jours</Text>
                </Group>
                <Progress value={(item.used / item.total) * 100} color={item.color} size="md" radius="xl" />
              </div>
            ))}
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  )
}
