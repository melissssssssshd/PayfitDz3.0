"use client"

import {
  IconCalendar,
  IconFileText,
  IconCreditCard,
  IconCheck,
  IconX,
  IconSettings,
} from "@tabler/icons-react"
import Link from "next/link"
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
  ThemeIcon,
  rem,
  Box,
  SimpleGrid,
  ActionIcon,
} from "@mantine/core"

export default function DemandesPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Centre de Validation</Title>
          <Text c="dimmed" size="sm">Gérez et traitez toutes les requêtes en attente de vos collaborateurs.</Text>
        </div>
        <Button variant="outline" color="gray" leftSection={<IconSettings size={18} />}>Règles de validation</Button>
      </Group>

      <Tabs defaultValue="absences" variant="pills" color="payfit" radius="md">
        <Tabs.List mb="lg">
          <Tabs.Tab value="absences" leftSection={<IconCalendar size={16} />}>Absences (8)</Tabs.Tab>
          <Tabs.Tab value="notes-frais" leftSection={<IconFileText size={16} />}>Notes de frais (2)</Tabs.Tab>
          <Tabs.Tab value="acomptes" leftSection={<IconCreditCard size={16} />}>Acomptes (0)</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="absences">
          <Card padding="xl" radius="md" withBorder shadow="sm">
            <Stack gap="lg">
              <Group justify="space-between">
                <Box>
                  <Title order={3} size="h4">Absences en attente</Title>
                  <Text size="sm" c="dimmed">8 demandes nécessitent votre attention</Text>
                </Box>
                <Button variant="light" color="payfit">Tout valider (8)</Button>
              </Group>

              <Stack gap="sm">
                {[
                  { name: "Averie Russo", type: "Événement familial", dates: "13/10 → 14/10", duration: "2j", color: "blue" },
                  { name: "Leila Coleman", type: "Maladie", dates: "03/10", duration: "1j", color: "red" },
                  { name: "Lyla Maynard", type: "Maladie", dates: "03/10 → 06/10", duration: "4j", color: "red" },
                ].map((absence, idx) => (
                  <Box key={idx} p="md" style={{ border: '1px solid var(--mantine-color-gray-1)', borderRadius: 12 }} className="hover:bg-gray-50 transition-colors">
                    <Group justify="space-between" align="center">
                      <Group gap="md">
                        <Avatar color={absence.color} radius="md">{absence.name.split(' ').map(n => n[0]).join('')}</Avatar>
                        <div>
                          <Text fw={700} size="sm">{absence.name}</Text>
                          <Badge variant="light" color={absence.color} size="xs">{absence.type}</Badge>
                        </div>
                      </Group>

                      <Group gap="xl">
                        <Box ta="right">
                          <Text fw={700} size="sm">{absence.duration}</Text>
                          <Text size="xa-xs" c="dimmed">{absence.dates}</Text>
                        </Box>
                        <Group gap="xs">
                          <ActionIcon variant="light" color="red" radius="md" size="lg"><IconX size={18} /></ActionIcon>
                          <Button size="xs" color="payfit" radius="md">Valider</Button>
                        </Group>
                      </Group>
                    </Group>
                  </Box>
                ))}
              </Stack>

              <Button component={Link} href="/dashboard/absences" variant="subtle" color="payfit" fullWidth mt="md">
                Accéder au module Absences complet
              </Button>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="notes-frais">
          <Card padding="xl" radius="md" withBorder shadow="sm">
            <Stack gap="lg">
              <Title order={3} size="h4">Notes de frais</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                {[
                  { name: "Transport", desc: "Train Lyon-Paris", date: "18/12/2024", amount: "51,75 €" },
                  { name: "Restauration", desc: "Déjeuner client", date: "17/12/2024", amount: "68,50 €" }
                ].map((exp, i) => (
                  <Card key={i} p="md" withBorder radius="md">
                    <Group justify="space-between" mb="sm">
                      <ThemeIcon color="orange" variant="light" radius="md"><IconFileText size={16} /></ThemeIcon>
                      <Text fw={800} size="md" c="payfit.8">{exp.amount}</Text>
                    </Group>
                    <Text fw={700} size="sm">{exp.name}</Text>
                    <Text size="xs" c="dimmed" mb="md">{exp.desc} • {exp.date}</Text>
                    <Group grow>
                      <Button variant="light" color="red" size="xs">Refuser</Button>
                      <Button color="payfit" size="xs">Valider</Button>
                    </Group>
                  </Card>
                ))}
              </SimpleGrid>
              <Button component={Link} href="/dashboard/notes-frais" variant="subtle" color="payfit" fullWidth mt="md">
                Accéder au module Notes de frais complet
              </Button>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="acomptes">
          <Card padding="xl" radius="md" withBorder shadow="sm">
            <Stack align="center" py={60} gap="md">
              <ThemeIcon size={rem(80)} radius="xl" variant="light" color="gray">
                <IconCreditCard size={40} stroke={1.5} />
              </ThemeIcon>
              <Box ta="center">
                <Text fw={700} size="lg">Tout est à jour</Text>
                <Text c="dimmed">Aucune demande d'acompte en attente de validation.</Text>
              </Box>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  )
}

