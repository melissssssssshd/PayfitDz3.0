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
  TextInput,
  Textarea,
  Box,
  rem,
  Divider,
  ActionIcon,
  Modal,
  FileInput,
  Select,
} from "@mantine/core"
import { DonutChart } from "@mantine/charts"
import {
  IconPlus,
  IconUpload,
  IconCalendar,
  IconCurrencyEuro,
  IconFileText,
  IconCheck,
  IconClock,
  IconTrendingUp,
  IconReceipt,
  IconDots,
} from "@tabler/icons-react"

const expenses = [
  {
    id: 1,
    name: "Transport",
    date: "Mer. 18 Déc. 2024",
    amount: 45,
    status: "approved",
    description: "Train Lyon-Paris",
    category: "Transport",
  },
  {
    id: 2,
    name: "Repas client",
    date: "Mar. 17 Déc. 2024",
    amount: 78,
    status: "pending",
    description: "Déjeuner avec le client Acme Corp",
    category: "Restauration",
  },
  {
    id: 3,
    name: "Fournitures bureau",
    date: "Lun. 16 Déc. 2024",
    amount: 32,
    status: "draft",
    description: "Papeterie et matériel",
    category: "Bureautique",
  },
]

const donutData = [
  { name: 'Transport', value: 45, color: 'payfit.6' },
  { name: 'Restauration', value: 78, color: 'blue.6' },
  { name: 'Bureautique', value: 32, color: 'orange.6' },
  { name: 'Divers', value: 15, color: 'gray.4' },
];

export default function NotesfraisPage() {
  const [opened, setOpened] = useState(false)

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Notes de frais</Text>
          <Text size="sm" c="dimmed">Gérez vos remboursements et soumettez vos justificatifs</Text>
        </div>
        <Button
          onClick={() => setOpened(true)}
          color="payfit"
          leftSection={<IconPlus size={16} />}
          radius="md"
        >
          Nouvelle note
        </Button>
      </Group>

      {/* Stats Summary Section */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase">En attente</Text>
              <Text size="1.8rem" fw={800} c="dark.9">78€</Text>
            </div>
            <ThemeIcon variant="light" color="orange" size="xl" radius="md">
              <IconClock size={24} />
            </ThemeIcon>
          </Group>
          <Text size="xs" c="orange.7" fw={700} mt="xs">1 demande à valider</Text>
        </Card>

        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase">Approuvé (30j)</Text>
              <Text size="1.8rem" fw={800} c="dark.9">156€</Text>
            </div>
            <ThemeIcon variant="light" color="payfit" size="xl" radius="md">
              <IconCheck size={24} />
            </ThemeIcon>
          </Group>
          <Text size="xs" c="payfit.7" fw={700} mt="xs">+12% vs mois dernier</Text>
        </Card>

        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase">Brouillons</Text>
              <Text size="1.8rem" fw={800} c="dark.9">1</Text>
            </div>
            <ThemeIcon variant="light" color="gray" size="xl" radius="md">
              <IconFileText size={24} />
            </ThemeIcon>
          </Group>
          <Text size="xs" c="dimmed" mt="xs">À finaliser prochainement</Text>
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
        {/* Donut Chart Breakdown */}
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text fw={700} size="lg" mb="xl">Répartition par catégorie</Text>
          <Stack align="center" gap="xl">
            <DonutChart
              size={160}
              thickness={20}
              data={donutData}
              withTooltip
            />
            <Stack gap="xs" w="100%">
              {donutData.map((item) => (
                <Group key={item.name} justify="space-between">
                  <Group gap="xs">
                    <Box w={10} h={10} bg={item.color} style={{ borderRadius: '50%' }} />
                    <Text size="sm" fw={500} c="dark.8">{item.name}</Text>
                  </Group>
                  <Text size="sm" fw={700}>{item.value}€</Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Card>

        {/* History Feed */}
        <Stack gap="md" style={{ gridColumn: 'span 2' }}>
          <Group justify="space-between">
            <Text fw={700} size="lg">Historique des dépenses</Text>
            <Button variant="subtle" color="payfit" size="xs">Tout exporter</Button>
          </Group>

          <Stack gap="sm">
            {expenses.map((expense) => (
              <Card key={expense.id} shadow="xs" radius="md" padding="md" withBorder className="hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-[60px_1fr_100px_120px] items-center gap-4">
                  <ThemeIcon variant="light" color="gray" size={48} radius="md">
                    <IconCurrencyEuro size={24} />
                  </ThemeIcon>

                  <div>
                    <Text fw={700} size="md" c="dark.8">{expense.name}</Text>
                    <Text size="xs" c="dimmed" lineClamp={1}>{expense.description}</Text>
                    <Group gap={8} mt={4}>
                      <Badge size="xs" color="gray" variant="outline">{expense.category}</Badge>
                      <Text size="xs" c="dimmed">•</Text>
                      <Text size="xs" c="dimmed">{expense.date}</Text>
                    </Group>
                  </div>

                  <Text size="lg" fw={800} c="dark.9" ta="right">{expense.amount}€</Text>

                  <Group justify="flex-end" gap="xs">
                    <Badge
                      color={expense.status === 'approved' ? 'payfit' : expense.status === 'pending' ? 'orange' : 'gray'}
                      variant="light"
                    >
                      {expense.status === 'approved' ? 'Payée' : expense.status === 'pending' ? 'En attente' : 'Brouillon'}
                    </Badge>
                    <ActionIcon variant="subtle" color="gray">
                      <IconDots size={16} />
                    </ActionIcon>
                  </Group>
                </div>
              </Card>
            ))}
          </Stack>
        </Stack>
      </SimpleGrid>

      {/* Modal for new expense */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Text fw={700} size="lg">Nouvelle note de frais</Text>}
        radius="md"
        size="lg"
      >
        <Stack gap="md">
          <SimpleGrid cols={2} spacing="md">
            <TextInput label="Intitulé" placeholder="Ex: Train Lyon-Paris" radius="md" />
            <TextInput label="Date" type="date" radius="md" />
          </SimpleGrid>
          <SimpleGrid cols={2} spacing="md">
            <TextInput label="Montant (€)" placeholder="0.00" radius="md" />
            <Select
              label="Catégorie"
              data={['Transport', 'Restauration', 'Bureautique', 'Hébergement', 'Divers']}
              placeholder="Choisir..."
              radius="md"
            />
          </SimpleGrid>
          <Textarea label="Description" placeholder="Détails de la dépense..." radius="md" minRows={3} />
          <FileInput
            label="Justificatif"
            placeholder="Uploader un fichier (PDF, JPG...)"
            leftSection={<IconUpload size={16} />}
            radius="md"
          />

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" color="gray" onClick={() => setOpened(false)}>Annuler</Button>
            <Button color="payfit" radius="md" onClick={() => setOpened(false)}>Enregistrer</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}
