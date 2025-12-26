"use client"

import {
  SimpleGrid,
  Card,
  Text,
  Group,
  RingProgress,
  Button,
  ThemeIcon,
  Badge,
  Stack,
  ActionIcon,
  Avatar,
  Box,
  rem,
  Progress,
  Divider,
} from "@mantine/core"
import {
  IconCurrencyEuro,
  IconCalendar,
  IconReceipt,
  IconDownload,
  IconArrowUpRight,
  IconClock,
  IconFileText,
  IconCheck,
  IconAlertCircle,
  IconTrendingUp,
  IconDots,
} from "@tabler/icons-react"
import Link from "next/link"

export default function EmployeeDashboardPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">
            Vue d'ensemble
          </Text>
          <Text size="sm" c="dimmed">
            Bienvenue sur votre espace personnel
          </Text>
        </div>
        <Group>
          <Button variant="white" leftSection={<IconCalendar size={16} />} size="xs" radius="xl" c="dimmed">
            30 derniers jours
          </Button>
        </Group>
      </Group>

      {/* KPI Cards Row */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {/* Ma Situation Actuelle */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Text fw={600} size="lg" c="dark.8">
              Ma situation
            </Text>
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={16} />
            </ActionIcon>
          </Group>

          <SimpleGrid cols={3} spacing="xs">
            <Stack align="center" gap={4}>
              <ThemeIcon size={48} radius="50%" variant="light" color="payfit.6" mb="xs">
                <IconCurrencyEuro size={24} />
              </ThemeIcon>
              <Text fw={700} size="xl" c="dark.8">2,625€</Text>
              <Text size="xs" c="dimmed" fw={500}>Net payé</Text>
            </Stack>
            <Stack align="center" gap={4}>
              <ThemeIcon size={48} radius="50%" variant="light" color="blue.6" mb="xs">
                <IconCalendar size={24} />
              </ThemeIcon>
              <Text fw={700} size="xl" c="dark.8">12j</Text>
              <Text size="xs" c="dimmed" fw={500}>Congés</Text>
            </Stack>
            <Stack align="center" gap={4}>
              <ThemeIcon size={48} radius="50%" variant="light" color="orange.6" mb="xs">
                <IconReceipt size={24} />
              </ThemeIcon>
              <Text fw={700} size="xl" c="dark.8">156€</Text>
              <Text size="xs" c="dimmed" fw={500}>Frais</Text>
            </Stack>
          </SimpleGrid>
        </Card>

        {/* Ma Dernière Fiche de Paie */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="sm">
            <div>
              <Text fw={600} size="lg" c="dark.8">Février 2024</Text>
              <Text size="xs" c="dimmed">Dernière fiche de paie</Text>
            </div>
            <ActionIcon variant="light" color="payfit" radius="md" size="lg">
              <IconDownload size={20} />
            </ActionIcon>
          </Group>

          <Card.Section inheritPadding py="xs">
            <Box bg="gray.0" p="md" style={{ borderRadius: 8 }}>
              <Group justify="space-between" mb={8}>
                <Text size="sm" c="dimmed" fw={500}>Brut</Text>
                <Text size="sm" fw={600} c="dark.8">€3,500.00</Text>
              </Group>
              <Group justify="space-between" mb={8}>
                <Text size="sm" c="dimmed" fw={500}>Cotisations</Text>
                <Text size="sm" fw={600} c="red.6">-€875.00</Text>
              </Group>
              <Divider my="xs" color="gray.2" />
              <Group justify="space-between">
                <Text size="sm" fw={700} c="dark.8">Net à payer</Text>
                <Text size="lg" fw={800} c="payfit.7">€2,625.00</Text>
              </Group>
            </Box>
          </Card.Section>

          <Group mt="md" gap="xs" grow>
            <Button variant="default" size="xs" radius="md">Voir le détail</Button>
            <Button variant="filled" color="payfit" size="xs" radius="md">Télécharger</Button>
          </Group>
        </Card>

        {/* Solde de Congés */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={600} size="lg" c="dark.8">Solde de congés</Text>
            <Button variant="subtle" size="compact-xs" color="payfit">
              + Demander
            </Button>
          </Group>

          <Group align="center" gap="xl">
            <Box>
              <Text size="3rem" fw={800} c="payfit.8" lh={1}>12</Text>
              <Text size="sm" c="dimmed" fw={500}>jours restants</Text>
            </Box>
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: 60, color: 'payfit' }]}
              label={
                <Text c="payfit" fw={700} ta="center" size="xs">
                  60%
                </Text>
              }
            />
          </Group>

          <Stack gap="xs" mt="md">
            <Group gap="xs">
              <ThemeIcon size={6} color="payfit" radius="xl" variant="filled" />
              <Text size="sm" c="dark.8" style={{ flex: 1 }}>15-20 juillet</Text>
              <Badge variant="light" color="payfit" size="sm">Congé payé (6j)</Badge>
            </Group>
            <Group gap="xs">
              <ThemeIcon size={6} color="blue" radius="xl" variant="filled" />
              <Text size="sm" c="dark.8" style={{ flex: 1 }}>12-14 août</Text>
              <Badge variant="light" color="blue" size="sm">RTT (3j)</Badge>
            </Group>
          </Stack>
        </Card>
      </SimpleGrid>

      {/* Second Row */}
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        {/* Mes Demandes en Cours */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <div>
              <Text fw={600} size="lg" c="dark.8">Mes demandes</Text>
              <Text size="xs" c="dimmed">Suivi de vos demandes en cours</Text>
            </div>
            <Button variant="subtle" size="xs" component={Link} href="/employee/demandes" color="payfit">
              Voir tout
            </Button>
          </Group>

          <Stack gap="md">
            <Group justify="space-between" p="sm" bg="yellow.0" style={{ borderRadius: 8, border: '1px solid var(--mantine-color-yellow-2)' }}>
              <Group gap="sm">
                <ThemeIcon variant="light" color="yellow" size="lg" radius="md">
                  <IconCalendar size={20} />
                </ThemeIcon>
                <div>
                  <Text size="sm" fw={600} c="dark.8">Congés 15-20 juil.</Text>
                  <Text size="xs" c="dimmed">6 jours</Text>
                </div>
              </Group>
              <Badge color="yellow" variant="filled">En attente</Badge>
            </Group>

            <Group justify="space-between" p="sm" bg="payfit.0" style={{ borderRadius: 8, border: '1px solid var(--mantine-color-payfit-2)' }}>
              <Group gap="sm">
                <ThemeIcon variant="light" color="payfit" size="lg" radius="md">
                  <IconCheck size={20} />
                </ThemeIcon>
                <div>
                  <Text size="sm" fw={600} c="dark.8">Notes de frais €45</Text>
                  <Text size="xs" c="dimmed">Transport</Text>
                </div>
              </Group>
              <Badge color="payfit" variant="filled">Approuvée</Badge>
            </Group>

            <Group justify="space-between" p="sm" bg="blue.0" style={{ borderRadius: 8, border: '1px solid var(--mantine-color-blue-2)' }}>
              <Group gap="sm">
                <ThemeIcon variant="light" color="blue" size="lg" radius="md">
                  <IconAlertCircle size={20} />
                </ThemeIcon>
                <div>
                  <Text size="sm" fw={600} c="dark.8">Acompte €500</Text>
                  <Text size="xs" c="dimmed">Avance sur salaire</Text>
                </div>
              </Group>
              <Badge color="blue" variant="filled">En attente</Badge>
            </Group>
          </Stack>
        </Card>

        {/* Mon Temps de Travail */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <div>
              <Text fw={600} size="lg" c="dark.8">Temps de travail</Text>
              <Text size="xs" c="dimmed">Janvier 2025</Text>
            </div>
            <Button variant="subtle" size="xs" component={Link} href="/employee/temps-travail" color="payfit">
              Gérer
            </Button>
          </Group>

          <Stack gap="lg">
            <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="dimmed">Semaine actuelle</Text>
                <Text size="sm" fw={700} c="dark.8">32h45 / 35h</Text>
              </Group>
              <Progress value={93} color="payfit" size="md" radius="xl" />
              <Text size="xs" c="dimmed" mt={4} ta="right">93% complété</Text>
            </div>

            <Box p="md" bg="gray.0" style={{ borderRadius: 8 }}>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={600} c="dark.8">Aujourd'hui</Text>
                <Text size="sm" fw={700} c="payfit.7">7h 30min</Text>
              </Group>
              <Group gap="xs">
                <Badge variant="outline" color="gray" size="lg" bg="white" style={{ textTransform: 'none' }}>09:00 - 12:30</Badge>
                <Badge variant="outline" color="gray" size="lg" bg="white" style={{ textTransform: 'none' }}>14:00 - 17:00</Badge>
              </Group>
            </Box>

            <Button fullWidth variant="light" color="payfit" rightSection={<IconArrowUpRight size={16} />}>
              Compléter ma feuille
            </Button>
          </Stack>
        </Card>
      </SimpleGrid>

      {/* Third Row */}
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        {/* Documents Récents */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <div>
              <Text fw={600} size="lg" c="dark.8">Documents récents</Text>
            </div>
            <Button variant="subtle" size="xs" component={Link} href="/employee/documents" color="payfit">
              Voir tout
            </Button>
          </Group>

          <Stack gap="sm">
            {[
              { name: "Bulletin Janvier 2024.pdf", date: "2j", type: "pdf", size: "1.2 Mo" },
              { name: "Attestation travail.pdf", date: "15j", type: "pdf", size: "850 Ko" },
              { name: "Contrat addendum.pdf", date: "3 mois", type: "pdf", size: "2.4 Mo" },
            ].map((doc) => (
              <Group key={doc.name} justify="space-between" p="xs" className="hover:bg-gray-50 rounded-md cursor-pointer">
                <Group gap="sm">
                  <ThemeIcon variant="light" color="red" size="md" radius="sm">
                    <IconFileText size={16} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" fw={500} c="dark.8">{doc.name}</Text>
                    <Group gap="xs">
                      <Text size="xs" c="dimmed">{doc.date}</Text>
                      <Text size="xs" c="dimmed">•</Text>
                      <Text size="xs" c="dimmed">{doc.size}</Text>
                    </Group>
                  </div>
                </Group>
                <ActionIcon variant="subtle" color="gray">
                  <IconDownload size={16} />
                </ActionIcon>
              </Group>
            ))}
            <Button variant="outline" color="gray" fullWidth mt="sm">Télécharger tout</Button>
          </Stack>
        </Card>

        {/* Quick Stats */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Text fw={600} size="lg" c="dark.8">Statistiques du mois</Text>
            <ThemeIcon variant="light" color="payfit">
              <IconTrendingUp size={18} />
            </ThemeIcon>
          </Group>

          <Stack gap="md">
            <Group p="sm" bg="payfit.0" justify="space-between" style={{ borderRadius: 8 }}>
              <Group gap="md">
                <ThemeIcon variant="white" color="payfit" size="lg" radius="md">
                  <IconClock size={20} />
                </ThemeIcon>
                <div>
                  <Text size="sm" c="dimmed">Heures travaillées</Text>
                  <Text size="lg" fw={700} c="dark.8">140h 00min</Text>
                </div>
              </Group>
              <Text size="xs" c="payfit" fw={700}>+12%</Text>
            </Group>

            <Group p="sm" bg="blue.0" justify="space-between" style={{ borderRadius: 8 }}>
              <Group gap="md">
                <ThemeIcon variant="white" color="blue" size="lg" radius="md">
                  <IconCalendar size={20} />
                </ThemeIcon>
                <div>
                  <Text size="sm" c="dimmed">Jours de présence</Text>
                  <Text size="lg" fw={700} c="dark.8">18 jours</Text>
                </div>
              </Group>
              <Text size="xs" c="blue" fw={700}>Target 20</Text>
            </Group>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  )
}
