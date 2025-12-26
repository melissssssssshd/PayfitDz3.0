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
    Table,
    Avatar,
    Box,
} from "@mantine/core"
import {
    IconUserPlus,
    IconCheck,
    IconClock,
    IconBuildingSkyscraper,
} from "@tabler/icons-react"
import Link from "next/link"

export default function CSDashboard() {
    const [leads, setLeads] = useState<any[]>([])

    useEffect(() => {
        const fetchClosedLeads = async () => {
            try {
                const response = await fetch("/api/cs/leads")
                if (response.ok) {
                    const data = await response.json()
                    setLeads(data)
                }
            } catch (error) {
                console.error("Failed to fetch closed leads:", error)
            }
        }
        fetchClosedLeads()
    }, [])

    const pendingCount = leads.filter(l => !l.convertedTenantId).length
    const completedCount = leads.filter(l => l.convertedTenantId).length

    return (
        <Stack gap="xl">
            <Group justify="space-between" align="center">
                <div>
                    <Title order={2} fw={800} c="dark.9">Bonjour, Sarah 👋</Title>
                    <Text c="dimmed" size="sm">Gérez l'onboarding des nouveaux clients PayFit.</Text>
                </div>
                <Button
                    color="payfit.6"
                    radius="md"
                    leftSection={<IconUserPlus size={18} />}
                    component={Link}
                    href="/cs/onboarding"
                >
                    Démarrer un Onboarding
                </Button>
            </Group>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                <CSStatCard
                    title="En Attente"
                    value={pendingCount.toString()}
                    subtext="Leads à onboarder"
                    icon={IconClock}
                    color="orange"
                />
                <CSStatCard
                    title="Complétés"
                    value={completedCount.toString()}
                    subtext="Ce mois-ci"
                    icon={IconCheck}
                    color="green"
                />
                <CSStatCard
                    title="Total Clients"
                    value={completedCount.toString()}
                    subtext="Actifs"
                    icon={IconBuildingSkyscraper}
                    color="payfit"
                />
            </SimpleGrid>

            <Card shadow="sm" radius="md" padding="lg" withBorder>
                <Title order={4} mb="md">Leads Prêts pour Onboarding</Title>
                <Table highlightOnHover verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Entreprise</Table.Th>
                            <Table.Th>Contact</Table.Th>
                            <Table.Th>Taille</Table.Th>
                            <Table.Th>Statut</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {leads.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={5} align="center">
                                    <Text c="dimmed">Aucun lead en attente d'onboarding.</Text>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            leads.map((lead) => (
                                <Table.Tr key={lead.id}>
                                    <Table.Td>
                                        <Group gap="sm">
                                            <Avatar color="payfit" radius="xl" size="sm">
                                                {lead.companyName[0]}
                                            </Avatar>
                                            <Box>
                                                <Text size="sm" fw={600}>{lead.companyName}</Text>
                                                <Text size="xs" c="dimmed">{lead.wilaya}</Text>
                                            </Box>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Box>
                                            <Text size="sm">{lead.firstName} {lead.lastName}</Text>
                                            <Text size="xs" c="dimmed">{lead.email}</Text>
                                        </Box>
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge variant="light" color="gray" size="sm">
                                            {lead.employees} employés
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        {lead.convertedTenantId ? (
                                            <Badge color="green" variant="light">Onboardé</Badge>
                                        ) : (
                                            <Badge color="orange" variant="light">En attente</Badge>
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        {!lead.convertedTenantId && (
                                            <Button
                                                size="xs"
                                                variant="light"
                                                color="payfit"
                                                component={Link}
                                                href={`/cs/onboarding?leadId=${lead.id}`}
                                            >
                                                Onboarder
                                            </Button>
                                        )}
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        )}
                    </Table.Tbody>
                </Table>
            </Card>
        </Stack>
    )
}

function CSStatCard({ title, value, subtext, icon: Icon, color }: any) {
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
