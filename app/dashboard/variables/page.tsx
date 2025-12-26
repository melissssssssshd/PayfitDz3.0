"use client"

import {
  Card,
  Text,
  Title,
  Button,
  Group,
  Stack,
  ThemeIcon,
  rem,
  SimpleGrid,
  Box,
  Divider,
  ActionIcon,
  Progress,
} from "@mantine/core"
import { IconCurrencyEuro, IconPlus, IconAdjustmentsHorizontal, IconInfoCircle, IconVariable } from "@tabler/icons-react"

export default function VariablesPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Variables de Paie</Title>
          <Text c="dimmed" size="sm">Gérez les primes, commissions et autres éléments variables.</Text>
        </div>
        <Button color="payfit" leftSection={<IconPlus size={18} />} radius="md">Nouvelle variable</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
          <Text size="xs" c="payfit.8" fw={700} tt="uppercase">Total Variables (M-1)</Text>
          <Text fw={800} size="xl" mt={4} c="payfit.9">12 450,00 €</Text>
          <Text size="xs" c="payfit.7" mt={4}>+8% vs mois précédent</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Variables Active</Text>
          <Text fw={800} size="xl" mt={4}>5 Types</Text>
          <Text size="xs" c="dimmed" mt={4}>Primes, Transport, Repas...</Text>
        </Card>
      </SimpleGrid>

      <Card shadow="sm" radius="md" padding={0} withBorder>
        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
          <Group justify="space-between">
            <Text fw={700}>Liste des éléments variables</Text>
            <ActionIcon variant="light" color="gray"><IconAdjustmentsHorizontal size={18} /></ActionIcon>
          </Group>
        </Box>

        <Stack align="center" justify="center" py={80} gap="lg">
          <Box style={{ position: 'relative' }}>
            <ThemeIcon size={80} radius="xl" variant="light" color="gray">
              <IconVariable size={40} />
            </ThemeIcon>
            <ThemeIcon size={24} radius="xl" variant="filled" color="payfit" style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <IconPlus size={14} />
            </ThemeIcon>
          </Box>
          <Box ta="center">
            <Text fw={700} size="lg">Aucune variable configurée</Text>
            <Text c="dimmed" size="sm" mx="auto">Commencez par créer des types de variables (Commissions, Bonus exceptionnels) pour les assigner à vos collaborateurs.</Text>
          </Box>
          <Button variant="outline" color="payfit" radius="md">Créer ma première variable</Button>
        </Stack>
      </Card>

      <Card bg="blue.0" padding="lg" radius="md" withBorder>
        <Group gap="lg">
          <ThemeIcon color="blue" size="xl" radius="md" variant="light">
            <IconInfoCircle size={24} />
          </ThemeIcon>
          <Box style={{ flex: 1 }}>
            <Text fw={700} size="sm">Calcul automatique des cotisations</Text>
            <Text size="xs" c="dimmed">Toutes les variables ajoutées sont automatiquement soumises aux cotisations sociales en vigueur selon leur nature.</Text>
          </Box>
          <Button variant="subtle" color="blue" size="sm">Consulter le guide</Button>
        </Group>
      </Card>
    </Stack>
  )
}

