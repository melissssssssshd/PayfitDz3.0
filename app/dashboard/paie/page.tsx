"use client"

import {
  IconCheck,
  IconAlertCircle,
  IconArrowRight,
  IconCreditCard,
  IconCircleCheck,
  IconCash,
  IconTrendingUp,
  IconFileText,
} from "@tabler/icons-react"
import Link from "next/link"
import {
  Alert,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  ThemeIcon,
  rem,
  Box,
  Divider,
  Badge,
  Progress,
} from "@mantine/core"

export default function PaiePage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Gestion de la paie</Title>
          <Text c="dimmed" size="sm">Pilotez et clôturez la paie de vos collaborateurs.</Text>
        </div>
        <Badge size="xl" variant="light" color="payfit" radius="md">Mois de Décembre 2024</Badge>
      </Group>

      {/* Payroll Stats Row */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Masse salariale totale</Text>
          <Text fw={800} size="xl" mt={4}>€68,450.00</Text>
          <Group gap={4} mt={4} c="payfit.7">
            <IconTrendingUp size={14} />
            <Text size="xs" fw={600}>+2.5% vs novembre</Text>
          </Group>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Cotisations sociales</Text>
          <Text fw={800} size="xl" mt={4}>€29,432.50</Text>
          <Text size="xs" c="dimmed" mt={4}>Charges patronales & salariales</Text>
        </Card>
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Net à payer</Text>
          <Text fw={800} size="xl" mt={4} c="payfit.8">€53,191.25</Text>
          <Text size="xs" c="dimmed" mt={4}>25 virements à effectuer</Text>
        </Card>
      </SimpleGrid>

      <Card padding="xl" radius="md" shadow="sm" withBorder>
        <Stack gap="xl">
          <Group justify="space-between">
            <Box>
              <Title order={3} size="h4">Processus de clôture</Title>
              <Text size="sm" c="dimmed">Vérifiez les points critiques avant la validation finale</Text>
            </Box>
            <Box style={{ width: 300 }}>
              <Group justify="space-between" mb={4}>
                <Text size="xs" fw={700}>Progression</Text>
                <Text size="xs" fw={700}>80%</Text>
              </Group>
              <Progress value={80} color="payfit" size="sm" radius="xl" />
            </Box>
          </Group>

          <Alert variant="light" color="payfit" title="Prêt pour clôture" icon={<IconCircleCheck />}>
            La plupart des données ont été vérifiées. Vous pouvez clôturer la paie dès maintenant pour générer les bulletins.
          </Alert>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            <Stack gap="md">
              <Text fw={700} size="sm">Vérifications effectuées</Text>
              {[
                "Nouveaux collaborateurs intégrés (2)",
                "Primes et variables de paie saisies",
                "Absences et congés validés",
                "Notes de frais traitées"
              ].map((task) => (
                <Group key={task} p="sm" bg="payfit.0" style={{ borderRadius: 8 }}>
                  <ThemeIcon color="payfit" variant="light" size="sm" radius="xl">
                    <IconCheck size={12} />
                  </ThemeIcon>
                  <Text size="sm" fw={500} c="payfit.9">{task}</Text>
                </Group>
              ))}
            </Stack>

            <Stack gap="md">
              <Text fw={700} size="sm">Points de vigilance</Text>
              {[
                { label: "Bulletins de paie à prévisualiser", icon: IconFileText, color: 'blue' },
                { label: "Masse salariale vs mois précédent", icon: IconTrendingUp, color: 'orange' },
                { label: "Virements SEPA (coordonnées bancaires)", icon: IconCreditCard, color: 'indigo' }
              ].map((item) => (
                <Button
                  key={item.label}
                  variant="outline"
                  color="gray"
                  fullWidth
                  justify="space-between"
                  leftSection={<ThemeIcon color={item.color} variant="light" size="sm"><item.icon size={14} /></ThemeIcon>}
                  rightSection={<IconArrowRight size={14} />}
                  radius="md"
                >
                  <Text size="sm">{item.label}</Text>
                </Button>
              ))}
            </Stack>
          </SimpleGrid>

          <Divider />

          <Group justify="flex-end">
            <Button variant="subtle" color="gray">Paramétrer la clôture</Button>
            <Button color="payfit" size="md" leftSection={<IconCheck size={18} />}>
              Valider et Clôturer la paie
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Integration Widget */}
      <Card padding="lg" radius="md" shadow="sm" withBorder bg="gray.0">
        <Group align="center" gap="lg" wrap="nowrap">
          <ThemeIcon size={60} radius="md" color="payfit" variant="light">
            <IconCreditCard size={32} />
          </ThemeIcon>
          <Box style={{ flex: 1 }}>
            <Text fw={700} size="lg">Virement automatisé des salaires</Text>
            <Text size="sm" c="dimmed">
              Connectez votre banque (Qonto, Shine, Revolut) pour automatiser le paiement des salaires en 1 clic.
            </Text>
          </Box>
          <Button variant="filled" color="payfit">Connecter ma banque</Button>
        </Group>
      </Card>
    </Stack>
  )
}
