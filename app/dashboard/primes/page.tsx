"use client"

import {
  IconTrendingUp,
  IconPlus,
  IconCurrencyEuro,
  IconAward,
  IconInfoCircle,
} from "@tabler/icons-react"
import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
  ThemeIcon,
  rem,
  SimpleGrid,
  Box,
  Divider,
} from "@mantine/core"

export default function PrimesPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Gestion des Primes</Title>
          <Text c="dimmed" size="sm">Pilotez les bonus et récompenses de vos équipes.</Text>
        </div>
        <Button color="payfit" leftSection={<IconPlus size={18} />} radius="md">Nouvelle prime</Button>
      </Group>

      {/* Overview Cards */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
          <Text size="xs" c="payfit.8" fw={700} tt="uppercase">Total ce mois</Text>
          <Text fw={800} size="xl" mt={4} c="payfit.9">3 500,00 €</Text>
          <Text size="xs" c="payfit.7" mt={4}>+12% vs mois dernier</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Bénéficiaires</Text>
          <Text fw={800} size="xl" mt={4}>8 Salariés</Text>
          <Text size="xs" c="dimmed" mt={4}>Félicitations en cours</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Moyenne / Prime</Text>
          <Text fw={800} size="xl" mt={4}>437,50 €</Text>
          <Text size="xs" c="dimmed" mt={4}>Calculé sur 8 primes</Text>
        </Card>
      </SimpleGrid>

      {/* Recent Activity / Content */}
      <Card shadow="sm" radius="md" padding={0} withBorder>
        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
          <Title order={3} size="h4">Primes récentes</Title>
        </Box>

        <Stack align="center" justify="center" py={80} gap="lg">
          <Box style={{ position: 'relative' }}>
            <ThemeIcon size={80} radius="xl" variant="light" color="gray">
              <IconAward size={40} />
            </ThemeIcon>
            <ThemeIcon size={24} radius="xl" variant="filled" color="payfit" style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <IconTrendingUp size={14} />
            </ThemeIcon>
          </Box>
          <Box ta="center">
            <Text fw={700} size="lg">Aucune prime enregistrée ce mois-ci</Text>
            <Text c="dimmed" size="sm" maw={400} mx="auto">Vous n'avez pas encore ajouté de primes exceptionnelles ou de performances pour la période actuelle.</Text>
          </Box>
          <Button variant="outline" color="payfit" radius="md" leftSection={<IconPlus size={16} />}>Ajouter une prime</Button>
        </Stack>
      </Card>

      <Card bg="blue.0" padding="lg" radius="md" withBorder>
        <Group gap="lg">
          <ThemeIcon color="blue" size="xl" radius="md" variant="light">
            <IconInfoCircle size={24} />
          </ThemeIcon>
          <Box style={{ flex: 1 }}>
            <Text fw={700} size="sm">Règle de calcul</Text>
            <Text size="xs" c="dimmed">Les primes sont prises en compte dans l'assiette des cotisations sauf cas particuliers (primes de panier, transport). Consultez le guide de paie pour plus d'infos.</Text>
          </Box>
          <Button variant="subtle" color="blue" size="sm">Guide de paie</Button>
        </Group>
      </Card>
    </Stack>
  )
}
