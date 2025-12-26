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
  ActionIcon,
  Divider,
  Box,
  rem,
} from "@mantine/core"
import { AreaChart } from "@mantine/charts"
import {
  IconDownload,
  IconEye,
  IconCalendar,
  IconCurrencyEuro,
  IconTrendingUp,
  IconDots,
  IconArrowUpRight,
  IconFileText,
} from "@tabler/icons-react"

const payslips = [
  {
    month: "Février 2024",
    date: "27 déc. 2024",
    gross: 3500.00,
    net: 2625.00,
    deductions: -875.00,
    status: "available",
  },
  {
    month: "Janvier 2024",
    date: "30 janv. 2024",
    gross: 3500.00,
    net: 2625.00,
    deductions: -875.00,
    status: "available",
  },
  {
    month: "Décembre 2023",
    date: "28 déc. 2023",
    gross: 3500.00,
    net: 2625.00,
    deductions: -875.00,
    status: "available",
  },
  {
    month: "Novembre 2023",
    date: "28 nov. 2023",
    gross: 3400.00,
    net: 2550.00,
    deductions: -850.00,
    status: "available",
  },
  {
    month: "Octobre 2023",
    date: "28 oct. 2023",
    gross: 3400.00,
    net: 2550.00,
    deductions: -850.00,
    status: "available",
  },
  {
    month: "Septembre 2023",
    date: "28 sept. 2023",
    gross: 3400.00,
    net: 2550.00,
    deductions: -850.00,
    status: "available",
  },
]

const chartData = [
  { month: 'Sept', Gross: 3400, Net: 2550 },
  { month: 'Oct', Gross: 3400, Net: 2550 },
  { month: 'Nov', Gross: 3400, Net: 2550 },
  { month: 'Déc', Gross: 3500, Net: 2625 },
  { month: 'Jan', Gross: 3500, Net: 2625 },
  { month: 'Fév', Gross: 3500, Net: 2625 },
];

export default function PaiePage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Mes bulletins de paie</Text>
          <Text size="sm" c="dimmed">Consultez et téléchargez vos documents de paie</Text>
        </div>
        <Button variant="light" color="payfit" leftSection={<IconDownload size={16} />}>
          Tout télécharger
        </Button>
      </Group>

      {/* Main Stats Row */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={600} c="dimmed">Salaire annuel brut</Text>
            <ThemeIcon color="payfit.1" c="payfit.7" size="lg" radius="md">
              <IconTrendingUp size={20} />
            </ThemeIcon>
          </Group>
          <Text size="1.8rem" fw={800} c="dark.9">€42,000</Text>
          <Group gap={4} mt={4}>
            <Text size="xs" fw={700} c="payfit.7">+5%</Text>
            <Text size="xs" c="dimmed">par rapport à l'an dernier</Text>
          </Group>
        </Card>

        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={600} c="dimmed">Net à payer (Moy.)</Text>
            <ThemeIcon color="blue.1" c="blue.7" size="lg" radius="md">
              <IconCurrencyEuro size={20} />
            </ThemeIcon>
          </Group>
          <Text size="1.8rem" fw={800} c="dark.9">€2,625</Text>
          <Text size="xs" c="dimmed" mt={4}>Moyenne calculée sur 6 mois</Text>
        </Card>

        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={600} c="dimmed">Bulletins disponibles</Text>
            <ThemeIcon color="orange.1" c="orange.7" size="lg" radius="md">
              <IconCalendar size={20} />
            </ThemeIcon>
          </Group>
          <Text size="1.8rem" fw={800} c="dark.9">{payslips.length}</Text>
          <Text size="xs" c="dimmed" mt={4}>Stockés de manière sécurisée</Text>
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
        {/* Salary Evolution Chart */}
        <Card shadow="sm" radius="md" padding="lg" withBorder style={{ gridColumn: 'span 2' }}>
          <Group justify="space-between" mb="xl">
            <div>
              <Text fw={700} size="lg">Évolution du salaire</Text>
              <Text size="xs" c="dimmed">Historique des 6 derniers mois</Text>
            </div>
            <Badge variant="light" color="payfit">En hausse</Badge>
          </Group>

          <Box h={240}>
            <AreaChart
              h={240}
              data={chartData}
              dataKey="month"
              series={[
                { name: 'Gross', color: 'blue.6', label: 'Salaire Brut' },
                { name: 'Net', color: 'payfit.6', label: 'Salaire Net' },
              ]}
              curveType="monotone"
              withLegend
              legendProps={{ verticalAlign: 'top', height: 40 }}
              gridColor="gray.1"
              textColor="dimmed"
            />
          </Box>
        </Card>

        {/* Latest Payslip Focus */}
        <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
          <Stack gap="md">
            <Group justify="space-between">
              <div>
                <Text fw={800} size="lg" c="payfit.9">Février 2024</Text>
                <Text size="xs" c="payfit.7" fw={600}>Dernière fiche de paie</Text>
              </div>
              <ThemeIcon color="payfit.6" size="xl" radius="md">
                <IconCurrencyEuro size={24} />
              </ThemeIcon>
            </Group>

            <Stack gap="xs" mt="sm">
              <Group justify="space-between">
                <Text size="sm" fw={500} c="payfit.8">Brut Mensuel</Text>
                <Text size="sm" fw={700} c="payfit.9">€3,500.00</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" fw={500} c="payfit.8">Cotisations</Text>
                <Text size="sm" fw={700} c="red.6">-€875.00</Text>
              </Group>
              <Divider my="xs" color="payfit.2" />
              <Group justify="space-between">
                <Text size="md" fw={700} c="payfit.9">NET À PAYER</Text>
                <Text size="xl" fw={800} c="payfit.6">€2,625.00</Text>
              </Group>
            </Stack>

            <Button fullWidth variant="filled" color="payfit.7" mt="md" rightSection={<IconArrowUpRight size={16} />}>
              Ouvrir le document
            </Button>
          </Stack>
        </Card>
      </SimpleGrid>

      {/* History Table-like Cards */}
      <div>
        <Text fw={700} size="lg" mb="md">Historique</Text>
        <Stack gap="sm">
          {payslips.map((payslip, index) => (
            <Card key={index} shadow="xs" radius="md" padding="md" withBorder className="hover:bg-gray-50 cursor-pointer">
              <Group justify="space-between">
                <Group gap="md">
                  <ThemeIcon variant="light" color="gray" size="xl" radius="md">
                    <IconFileText size={24} />
                  </ThemeIcon>
                  <div>
                    <Text fw={700} size="md" c="dark.8">{payslip.month}</Text>
                    <Text size="xs" c="dimmed">Clôturé le {payslip.date}</Text>
                  </div>
                </Group>

                <Group gap="xl" visibleFrom="md">
                  <Stack gap={2} align="center">
                    <Text size="xs" c="dimmed" fw={600} tt="uppercase">Brut</Text>
                    <Text size="sm" fw={700}>€{payslip.gross.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</Text>
                  </Stack>
                  <Stack gap={2} align="center">
                    <Text size="xs" c="dimmed" fw={600} tt="uppercase">Net</Text>
                    <Text size="sm" fw={700} c="payfit.7">€{payslip.net.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</Text>
                  </Stack>
                </Group>

                <Group gap="xs">
                  <Badge variant="light" color="payfit" size="sm">Disponible</Badge>
                  <ActionIcon variant="subtle" color="gray" size="lg">
                    <IconDownload size={20} />
                  </ActionIcon>
                  <ActionIcon variant="subtle" color="gray" size="lg">
                    <IconEye size={20} />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      </div>
    </Stack>
  )
}
