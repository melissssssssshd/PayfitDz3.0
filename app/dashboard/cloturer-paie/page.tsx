"use client"

import Link from "next/link"
import {
  IconCheck,
  IconCalendar,
  IconLock,
  IconFileCertificate,
  IconArrowRight,
  IconCircleCheck,
} from "@tabler/icons-react"
import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
  ThemeIcon,
  Box,
  SimpleGrid,
  Divider,
  ActionIcon,
  Badge,
} from "@mantine/core"

export default function CloturerPaiePage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Clôturer la paie</Title>
          <Text c="dimmed" size="sm">Période de Paie : Décembre 2024</Text>
        </div>
        <Badge color="payfit" variant="light" size="lg">Validation finale</Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="xl" withBorder>
          <Stack gap="lg">
            <Group>
              <ThemeIcon color="payfit" variant="light" size="xl" radius="md"><IconLock size={24} /></ThemeIcon>
              <Box>
                <Text fw={700}>Action de clôture</Text>
                <Text size="xs" c="dimmed">Verrouillage définitif des éléments de paie</Text>
              </Box>
            </Group>

            <Stack gap="xs">
              <Button
                fullWidth
                variant="outline"
                color="gray"
                size="lg"
                leftSection={<IconCalendar size={18} />}
                radius="md"
              >
                Ajuster la date de versement
              </Button>
              <Button
                fullWidth
                color="payfit"
                size="lg"
                leftSection={<IconFileCertificate size={18} />}
                radius="md"
              >
                Confirmer & Clôturer la paie
              </Button>
            </Stack>

            <Text size="xs" ta="center" c="dimmed italic">
              En cliquant sur clôturer, les bulletins seront générés et envoyés aux coffres-forts des salariés.
            </Text>
          </Stack>
        </Card>

        <Stack gap="lg">
          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Group justify="space-between" mb="md">
              <Text fw={700}>Statut des tâches</Text>
              <Badge variant="dot" color="payfit">Complété</Badge>
            </Group>
            <Box p="xl" bg="payfit.0" style={{ borderRadius: 12, textAlign: 'center' }}>
              <ThemeIcon color="payfit" size={50} radius="xl" variant="filled" mb="md">
                <IconCircleCheck size={30} />
              </ThemeIcon>
              <Text fw={800} c="payfit.9">Tout est prêt !</Text>
              <Text size="xs" c="payfit.8" mt={4}>Toutes les étapes obligatoires ont été vérifiées et validées.</Text>
              <Button variant="subtle" color="payfit" size="xs" mt="md" component={Link} href="/dashboard/paie">
                Revoir les détails
              </Button>
            </Box>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder bg="gray.0">
            <Group justify="space-between" mb="md">
              <Text fw={700} size="sm">Tâches recommandées</Text>
              <IconCheck size={16} color="var(--mantine-color-payfit-6)" />
            </Group>
            <Text size="xs" c="dimmed">Toutes les optimisations suggérées ont été appliquées.</Text>
            <Button variant="light" color="gray" fullWidth mt="md" size="xs">Consulter le log d'audit</Button>
          </Card>
        </Stack>
      </SimpleGrid>

      <Divider my="md" />

      <Group justify="center" gap="xs">
        <Text size="xs" c="dimmed">Besoin d'aide avant de clôturer ?</Text>
        <Button variant="link" color="payfit" size="xs">Parler à un expert paie</Button>
      </Group>
    </Stack>
  )
}

