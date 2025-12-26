"use client"

import { useState, useEffect } from "react"
import {
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  ThemeIcon,
  Stack,
  Button,
  Badge,
  Box,
  Paper,
} from "@mantine/core"
import {
  IconUsers,
  IconCurrencyDollar,
  IconCalendar,
  IconFileText,
  IconBell,
  IconTrendingUp,
} from "@tabler/icons-react"

export default function ClientDashboard() {
  const [clientData, setClientData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch("/api/client/account")
        if (response.ok) {
          const data = await response.json()
          setClientData(data)
        }
      } catch (error) {
        console.error("Failed to fetch client data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchClientData()
  }, [])

  if (loading) {
    return <Text>Chargement...</Text>
  }

  const companyName = clientData?.tenant?.name || "Votre Entreprise"

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} fw={800} c="dark.9">Bienvenue sur PayFit 👋</Title>
          <Text c="dimmed" size="sm">{companyName}</Text>
        </div>
        <Button color="payfit.6" radius="md" leftSection={<IconFileText size={18} />}>
          Lancer la Paie
        </Button>
      </Group>

      {/* Quick Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        <DashboardStatCard
          title="Employés"
          value="8"
          subtext="Actifs"
          icon={IconUsers}
          color="payfit"
        />
        <DashboardStatCard
          title="Masse Salariale"
          value="1.2M DA"
          subtext="Ce mois"
          icon={IconCurrencyDollar}
          color="blue"
        />
        <DashboardStatCard
          title="Prochaine Paie"
          value="28 Déc"
          subtext="Dans 6 jours"
          icon={IconCalendar}
          color="orange"
        />
        <DashboardStatCard
          title="Déclarations"
          value="2"
          subtext="En attente"
          icon={IconFileText}
          color="indigo"
        />
      </SimpleGrid>

      {/* Quick Actions */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group justify="space-between" mb="md">
            <div>
              <Text fw={700} size="lg">Actions Rapides</Text>
              <Text size="sm" c="dimmed">Gérez votre paie et vos employés</Text>
            </div>
          </Group>
          <Stack gap="sm">
            <Button variant="light" color="payfit" fullWidth leftSection={<IconUsers size={18} />}>
              Gérer les Employés
            </Button>
            <Button variant="light" color="blue" fullWidth leftSection={<IconCurrencyDollar size={18} />}>
              Voir la Paie
            </Button>
            <Button variant="light" color="orange" fullWidth leftSection={<IconCalendar size={18} />}>
              Congés & Absences
            </Button>
          </Stack>
        </Card>

        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Group justify="space-between" mb="md">
            <div>
              <Text fw={700} size="lg">Notifications</Text>
              <Text size="sm" c="dimmed">Restez informé</Text>
            </div>
            <Badge color="red" variant="filled">3</Badge>
          </Group>
          <Stack gap="md">
            <NotificationItem
              title="Déclaration CNAS à soumettre"
              time="Il y a 2h"
              color="orange"
            />
            <NotificationItem
              title="Nouvelle demande de congé"
              time="Il y a 5h"
              color="blue"
            />
            <NotificationItem
              title="Paie validée pour Décembre"
              time="Hier"
              color="green"
            />
          </Stack>
        </Card>
      </SimpleGrid>

      {/* Welcome Message for New Clients */}
      <Paper p="xl" radius="md" bg="payfit.0" withBorder>
        <Group>
          <ThemeIcon size={60} radius="md" color="payfit" variant="light">
            <IconTrendingUp size={32} />
          </ThemeIcon>
          <Box style={{ flex: 1 }}>
            <Title order={3} c="payfit.9">Bienvenue chez PayFit !</Title>
            <Text c="payfit.7" size="sm" mt={4}>
              Votre compte est configuré et prêt à l'emploi. Commencez par ajouter vos employés et lancer votre première paie.
            </Text>
            <Button color="payfit" mt="md" size="sm">
              Guide de Démarrage
            </Button>
          </Box>
        </Group>
      </Paper>
    </Stack>
  )
}

function DashboardStatCard({ title, value, subtext, icon: Icon, color }: any) {
  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder>
      <Group justify="space-between" mb="xs">
        <ThemeIcon color={color} variant="light" size="lg" radius="md">
          <Icon size={20} />
        </ThemeIcon>
        <Text size="xs" c="dimmed" fw={700}>{subtext}</Text>
      </Group>
      <Text size="xs" c="dimmed" fw={700} tt="uppercase" lts={0.5}>{title}</Text>
      <Text fw={800} size="xl" mt={2}>{value}</Text>
    </Card>
  )
}

function NotificationItem({ title, time, color }: any) {
  return (
    <Group gap="sm" p="xs" bg="gray.0" style={{ borderRadius: 8 }}>
      <ThemeIcon size="sm" color={color} variant="light" radius="xl">
        <IconBell size={14} />
      </ThemeIcon>
      <Box style={{ flex: 1 }}>
        <Text size="sm" fw={600}>{title}</Text>
        <Text size="xs" c="dimmed">{time}</Text>
      </Box>
    </Group>
  )
}
