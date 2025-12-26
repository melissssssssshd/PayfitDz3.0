"use client"

import {
  IconCalendar,
  IconClock,
  IconSearch,
  IconFilter,
  IconHistory,
  IconAlertCircle,
  IconCheck,
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
  TextInput,
  Badge,
  Progress,
} from "@mantine/core"

export default function SuiviTempsPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Validation des Temps</Title>
          <Text c="dimmed" size="sm">Consultez et validez les feuilles de temps mensuelles des collaborateurs.</Text>
        </div>
      </Group>

      {/* Analytics Summary */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
          <Group justify="space-between">
            <Box>
              <Text size="xs" c="payfit.8" fw={700} tt="uppercase">Validation globale</Text>
              <Text fw={800} size="xl" mt={4} c="payfit.9">100%</Text>
            </Box>
            <ThemeIcon color="payfit" variant="filled" size="xl" radius="md">
              <IconHistory size={24} />
            </ThemeIcon>
          </Group>
          <Text size="xs" c="payfit.7" mt="xs">Toutes les feuilles de temps traitées</Text>
        </Card>
      </SimpleGrid>

      <Card padding="md" radius="md" withBorder shadow="sm">
        <Group justify="space-between">
          <Group>
            <ThemeIcon variant="light" size="lg" color="payfit">
              <IconCalendar size={20} stroke={1.5} />
            </ThemeIcon>
            <div>
              <Text fw={700} size="sm">Janvier 2025</Text>
              <Text size="xs" c="dimmed">Période en cours</Text>
            </div>
          </Group>
          <Group gap="xs">
            <Button variant="default" size="xs">Mois précédent</Button>
            <Button variant="filled" color="payfit" size="xs">Mois suivant</Button>
          </Group>
        </Group>
      </Card>

      <Card padding="xl" radius="md" withBorder shadow="sm" style={{ minHeight: rem(400) }}>
        <Stack align="center" justify="center" gap="lg" py={rem(64)}>
          <Box style={{ position: 'relative' }}>
            <ThemeIcon size={rem(80)} radius="xl" variant="light" color="gray">
              <IconClock size={40} stroke={1.5} />
            </ThemeIcon>
            <ThemeIcon size={rem(24)} radius="xl" variant="filled" color="payfit" style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <IconCheck size={14} />
            </ThemeIcon>
          </Box>
          <Box ta="center">
            <Text fw={700} size="lg" c="dark.8">Félicitations !</Text>
            <Text c="dimmed" size="sm">Aucune feuille de temps n'est actuellement en attente de validation pour cette période.</Text>
          </Box>
          <Button variant="outline" color="gray" radius="md">Consulter l'historique</Button>
        </Stack>
      </Card>
    </Stack>
  )
}

