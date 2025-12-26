"use client"

import {
  IconBuildingSkyscraper,
  IconUsers,
  IconTrendingUp,
  IconActivity,
  IconAlertCircle,
  IconArrowUpRight,
  IconArrowDownRight,
  IconCurrencyEuro,
  IconUserPlus,
  IconFileText,
  IconClock,
  IconShieldLock,
  IconChartBar,
} from "@tabler/icons-react"
import {
  Card,
  Group,
  SimpleGrid,
  Text,
  Title,
  Badge,
  Button,
  ThemeIcon,
  Progress,
  Stack,
  Box,
  rem,
  Divider,
} from "@mantine/core"
import { AreaChart } from "@mantine/charts"

const systemHealth = [
  { label: "Serveurs API", value: 98, status: "optimal" },
  { label: "Base de données", value: 94, status: "optimal" },
  { label: "Stockage", value: 72, status: "good" },
  { label: "CDN", value: 99, status: "optimal" },
  { label: "Services Email", value: 88, status: "good" },
  { label: "Système de Backup", value: 100, status: "optimal" },
]

const recentActivity = [
  {
    time: "Il y a 2 min",
    message: 'Nouvelle entreprise créée: "TechCorp SAS"',
    type: "success",
  },
  {
    time: "Il y a 8 min",
    message: "Incident résolu: API lente (#INC-4521)",
    type: "info",
  },
  {
    time: "Il y a 15 min",
    message: "Backup automatique complété (2.4GB)",
    type: "success",
  },
  {
    time: "Il y a 23 min",
    message: "Facture générée: ENT-7845 (€299/mois)",
    type: "info",
  },
  {
    time: "Il y a 45 min",
    message: "Alerte: Haute charge CPU (85%)",
    type: "warning",
  },
]

const revenueData = [
  { month: 'Jan', revenue: 1.8 },
  { month: 'Fev', revenue: 1.9 },
  { month: 'Mar', revenue: 2.1 },
  { month: 'Avr', revenue: 2.0 },
  { month: 'Mai', revenue: 2.2 },
  { month: 'Juin', revenue: 2.4 },
]

export default function AdminDashboard() {
  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <div>
          <Title order={1} fw={800} lts={-0.5} c="dark.9">Tableau de bord Admin</Title>
          <Text c="dimmed" size="sm">Vue d'ensemble complète de la plateforme PayFit</Text>
        </div>
        <Button
          variant="light"
          color="gray"
          leftSection={<IconClock size={16} />}
          radius="md"
        >
          Dernières 24h
        </Button>
      </Group>

      {/* KPI Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        <KPICard
          title="Total Entreprises"
          value="1,247"
          trend="+12.5%"
          trendType="up"
          icon={IconBuildingSkyscraper}
          color="payfit"
        />
        <KPICard
          title="Utilisateurs Actifs"
          value="15,892"
          trend="+8.3%"
          trendType="up"
          icon={IconUsers}
          color="blue"
        />
        <KPICard
          title="Chiffre d'affaires"
          value="2.4M €"
          trend="+15.2%"
          trendType="up"
          icon={IconCurrencyEuro}
          color="payfit"
        />
        <KPICard
          title="Taux de Conversion"
          value="12.5%"
          trend="-2.1%"
          trendType="down"
          icon={IconTrendingUp}
          color="orange"
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        {/* Revenue Chart */}
        <Card shadow="sm" radius="md" padding="xl" withBorder>
          <Group justify="space-between" mb="xl">
            <Box>
              <Text fw={700} size="lg">Croissance du CA (M€)</Text>
              <Text size="xs" c="dimmed">Évolution mensuelle consolidée</Text>
            </Box>
            <Badge variant="light" color="payfit">Objectif: 3M €</Badge>
          </Group>
          <AreaChart
            h={300}
            data={revenueData}
            dataKey="month"
            series={[{ name: 'revenue', label: 'Revenue (M€)', color: 'payfit.6' }]}
            withLegend={false}
            gridAxis="xy"
            curveType="monotone"
          />
        </Card>

        {/* System Health */}
        <Card shadow="sm" radius="md" padding="xl" withBorder>
          <Group justify="space-between" mb="xl">
            <Box>
              <Text fw={700} size="lg">Santé du Système</Text>
              <Text size="xs" c="dimmed">Disponibilité des services en temps réel</Text>
            </Box>
            <ThemeIcon variant="light" color="payfit">
              <IconActivity size={18} />
            </ThemeIcon>
          </Group>
          <Stack gap="md">
            {systemHealth.map((item, i) => (
              <Box key={i}>
                <Group justify="space-between" mb={4}>
                  <Text size="sm" fw={600}>{item.label}</Text>
                  <Text size="sm" fw={700} c={item.status === 'optimal' ? 'payfit.7' : 'blue.7'}>{item.value}%</Text>
                </Group>
                <Progress
                  value={item.value}
                  color={item.status === 'optimal' ? 'payfit.6' : 'blue.5'}
                  size="sm"
                  radius="xl"
                />
              </Box>
            ))}
          </Stack>
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
        {/* Recent Activity */}
        <Card shadow="sm" radius="md" padding="xl" withBorder style={{ gridColumn: 'span 2' }}>
          <Group justify="space-between" mb="xl">
            <Text fw={700} size="lg">Activité Système Récente</Text>
            <Button variant="subtle" color="payfit" size="xs">Tout voir</Button>
          </Group>
          <Stack gap="md">
            {recentActivity.map((activity, i) => (
              <Box
                key={i}
                p="md"
                bg="gray.0"
                style={{ borderRadius: 12, border: '1px solid var(--mantine-color-gray-1)' }}
              >
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Group gap="md">
                    <ThemeIcon
                      variant="light"
                      color={activity.type === 'success' ? 'payfit' : activity.type === 'warning' ? 'orange' : 'blue'}
                    >
                      {activity.type === 'success' ? <IconActivity size={16} /> : <IconAlertCircle size={16} />}
                    </ThemeIcon>
                    <Box>
                      <Text size="sm" fw={600}>{activity.message}</Text>
                      <Text size="xs" c="dimmed">{activity.time}</Text>
                    </Box>
                  </Group>
                  <Badge variant="light" color="gray" size="xs">Système</Badge>
                </Group>
              </Box>
            ))}
          </Stack>
        </Card>

        {/* Quick Stats Widget */}
        <Stack gap="lg">
          <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
            <Stack gap="md">
              <Group>
                <ThemeIcon size="xl" radius="md" color="payfit" variant="filled">
                  <IconShieldLock size={24} />
                </ThemeIcon>
                <Box>
                  <Text fw={700} size="sm" c="payfit.9">Mode Sécurité</Text>
                  <Text size="xs" c="payfit.8">Dernier audit il y a 2h</Text>
                </Box>
              </Group>
              <Divider color="payfit.1" />
              <Group justify="space-between">
                <Text size="xs" fw={700} c="payfit.8">TENTATIVES BLOQUÉES</Text>
                <Text fw={800} c="payfit.9">142</Text>
              </Group>
            </Stack>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Text fw={700} size="sm" mb="md">Nouveaux Inscrits</Text>
            <Group align="flex-end" gap="xs">
              <Text size={rem(32)} fw={800} style={{ lineHeight: 1 }}>+247</Text>
              <Text size="xs" c="payfit.7" fw={700} mb={4}>CE MOIS</Text>
            </Group>
            <Group mt="xl" gap={4} wrap="nowrap" align="flex-end" h={60}>
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <Box
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    backgroundColor: 'var(--mantine-color-payfit-2)',
                    borderRadius: '4px 4px 0 0',
                  }}
                />
              ))}
            </Group>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Group gap="sm" mb="md">
              <IconChartBar size={18} color="var(--mantine-color-blue-6)" />
              <Text fw={700} size="sm">Utilisation Plateforme</Text>
            </Group>
            <Stack gap="xs">
              <UsageRow label="Paie" value="42.5k" color="payfit" />
              <UsageRow label="Absences" value="8.2k" color="blue" />
              <UsageRow label="Frais" value="15.6k" color="orange" />
            </Stack>
          </Card>
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}

function KPICard({ title, value, trend, trendType, icon: Icon, color }: any) {
  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder>
      <Group justify="space-between" mb="xs">
        <ThemeIcon color={color} variant="light" size="lg" radius="md">
          <Icon size={20} />
        </ThemeIcon>
        <Badge
          color={trendType === 'up' ? 'payfit' : 'red'}
          variant="light"
          leftSection={trendType === 'up' ? <IconArrowUpRight size={12} /> : <IconArrowDownRight size={12} />}
        >
          {trend}
        </Badge>
      </Group>
      <Text size="xs" c="dimmed" fw={700} tt="uppercase" lts={0.5}>
        {title}
      </Text>
      <Text fw={800} size="xl" mt={2} lts={-0.5} c="dark.9">
        {value}
      </Text>
    </Card>
  )
}

function UsageRow({ label, value, color }: any) {
  return (
    <Group justify="space-between">
      <Group gap="xs">
        <Box w={8} h={8} style={{ borderRadius: '50%', backgroundColor: `var(--mantine-color-${color}-6)` }} />
        <Text size="xs" fw={500} c="dimmed">{label}</Text>
      </Group>
      <Text size="xs" fw={700}>{value}</Text>
    </Group>
  )
}
