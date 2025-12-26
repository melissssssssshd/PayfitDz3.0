"use client"

import {
  IconActivity,
  IconCpu,
  IconDatabase,
  IconNetwork,
  IconAlertCircle,
  IconChartBar,
} from "@tabler/icons-react"
import {
  Card,
  Badge,
  Group,
  Stack,
  Title,
  Text,
  SimpleGrid,
  ThemeIcon,
  Progress,
  Box,
  rem,
} from "@mantine/core"
import { AreaChart, BarChart } from "@mantine/charts"

const performanceData = [
  { time: '10:00', cpu: 40, ram: 60, requests: 800 },
  { time: '10:05', cpu: 55, ram: 65, requests: 950 },
  { time: '10:10', cpu: 45, ram: 64, requests: 1100 },
  { time: '10:15', cpu: 75, ram: 78, requests: 1300 },
  { time: '10:20', cpu: 60, ram: 80, requests: 1247 },
  { time: '10:25', cpu: 50, ram: 79, requests: 1050 },
]

export default function PerformancePage() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={2} fw={800} c="dark.9">Performance Système</Title>
        <Text c="dimmed" size="sm">Surveillance des ressources et de la latence en temps réel</Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        <StatsCard label="Requêtes/sec" value="1,247" icon={IconActivity} color="payfit" subtext="Latence: 45ms" />
        <StatsCard label="Usage CPU" value="60%" icon={IconCpu} color="blue" progress={60} />
        <StatsCard label="Usage RAM" value="80%" icon={IconDatabase} color="orange" progress={80} subtext="16GB / 20GB" />
        <StatsCard label="Bande passante" value="937Mbps" icon={IconNetwork} color="indigo" subtext="↑45Mbps ↓892Mbps" />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="xl" withBorder>
          <Group justify="space-between" mb="xl">
            <Box>
              <Text fw={700} size="lg">Charge CPU & RAM</Text>
              <Text size="xs" c="dimmed">Évolution sur les 30 dernières minutes</Text>
            </Box>
            <ThemeIcon variant="light" color="blue">
              <IconChartBar size={18} />
            </ThemeIcon>
          </Group>
          <AreaChart
            h={300}
            data={performanceData}
            dataKey="time"
            series={[
              { name: 'cpu', label: 'CPU (%)', color: 'blue.6' },
              { name: 'ram', label: 'RAM (%)', color: 'orange.6' },
            ]}
            curveType="monotone"
            gridAxis="xy"
          />
        </Card>

        <Card shadow="sm" radius="md" padding="xl" withBorder>
          <Group justify="space-between" mb="xl">
            <Box>
              <Text fw={700} size="lg">Alertes Actives</Text>
              <Text size="xs" c="dimmed">Incidents nécessitant une attention immédiate</Text>
            </Box>
            <ThemeIcon variant="light" color="red">
              <IconAlertCircle size={18} />
            </ThemeIcon>
          </Group>
          <Stack gap="md">
            {[
              {
                title: "High CPU (Node-3)",
                description: "Usage > 85% pendant 30min",
                severity: "critical",
              },
              {
                title: "Slow query detected",
                description: "Latency > 2.3s sur /api/billing",
                severity: "warning",
              },
              {
                title: "Memory threshold",
                description: "Usage RAM > 80% (Cache)",
                severity: "warning",
              },
            ].map((alert, i) => (
              <Box
                key={i}
                p="md"
                bg={alert.severity === 'critical' ? 'red.0' : 'orange.0'}
                style={{
                  borderRadius: 12,
                  borderLeft: `4px solid var(--mantine-color-${alert.severity === 'critical' ? 'red' : 'orange'}-6)`
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <Box>
                    <Text size="sm" fw={700} c={alert.severity === 'critical' ? 'red.9' : 'orange.9'}>
                      {alert.title}
                    </Text>
                    <Text size="xs" c={alert.severity === 'critical' ? 'red.7' : 'orange.8'}>
                      {alert.description}
                    </Text>
                  </Box>
                  <Badge color={alert.severity === 'critical' ? 'red' : 'orange'} variant="filled" size="xs">
                    {alert.severity.toUpperCase()}
                  </Badge>
                </Group>
              </Box>
            ))}
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  )
}

function StatsCard({ label, value, icon: Icon, color, progress, subtext }: any) {
  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder>
      <Group justify="space-between" align="center" mb="xs">
        <ThemeIcon color={color} variant="light" size={40} radius="md">
          <Icon size={24} />
        </ThemeIcon>
        {subtext && <Text size="10px" c="dimmed" fw={700} tt="uppercase">{subtext}</Text>}
      </Group>
      <Text size="xs" c="dimmed" fw={700} tt="uppercase" lts={0.5}>{label}</Text>
      <Text fw={800} size="xl" mt={2}>{value}</Text>
      {progress !== undefined && (
        <Progress value={progress} color={color} size="xs" radius="xl" mt="md" />
      )}
    </Card>
  )
}
