"use client"

import { useState, useEffect } from "react"
import {
    Title,
    Text,
    SimpleGrid,
    Stack,
    Button,
    Badge,
    Table,
    Avatar,
    Box,
    Group,
    Paper,
    Loader,
    Center,
} from "@mantine/core"
import {
    IconPhone,
    IconCalendar,
    IconCheck,
    IconRocket,
    IconBuildingSkyscraper,
    IconUsers,
    IconTrendingUp,
    IconClock,
    IconX,
} from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { StatsCard } from "@/components/sales/stats-card"
import { LeadFilters } from "@/components/sales/lead-filters"
import { LeadDetailDrawer } from "@/components/sales/lead-detail-drawer"
import { LeadScoreBadge } from "@/components/sales/lead-score-badge"
import { LeadStatsChart } from "@/components/sales/lead-stats-chart"

export default function SalesDashboard() {
    const [leads, setLeads] = useState<any[]>([])
    const [stats, setStats] = useState<any>(null)
    const [selectedLead, setSelectedLead] = useState<any>(null)
    const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        status: "ALL",
        wilaya: "",
        minScore: null as number | null,
        maxScore: null as number | null,
        search: "",
    })

    const fetchLeads = async () => {
        try {
            const params = new URLSearchParams()
            if (filters.status !== "ALL") params.append("status", filters.status)
            if (filters.wilaya) params.append("wilaya", filters.wilaya)
            if (filters.minScore !== null) params.append("minScore", filters.minScore.toString())
            if (filters.maxScore !== null) params.append("maxScore", filters.maxScore.toString())
            if (filters.search) params.append("search", filters.search)

            const response = await fetch(`/api/sales/leads?${params.toString()}`)
            if (response.ok) {
                const data = await response.json()
                setLeads(data)
            }
        } catch (error) {
            console.error("Failed to fetch sales leads:", error)
            notifications.show({
                title: "Erreur",
                message: "Impossible de charger les leads",
                color: "red",
            })
        }
    }

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/sales/stats")
            if (response.ok) {
                const data = await response.json()
                setStats(data)
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([fetchLeads(), fetchStats()])
            setLoading(false)
        }
        loadData()
    }, [filters])

    const handleFilterChange = (key: string, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const handleClearFilters = () => {
        setFilters({
            status: "ALL",
            wilaya: "",
            minScore: null,
            maxScore: null,
            search: "",
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "NEW":
                return "blue"
            case "CONTACTED":
                return "cyan"
            case "DEMO_SCHEDULED":
                return "orange"
            case "DEMO_DONE":
                return "grape"
            case "CLOSED":
                return "green"
            case "LOST":
                return "red"
            default:
                return "gray"
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "NEW":
                return "Nouveau"
            case "CONTACTED":
                return "Contacté"
            case "DEMO_SCHEDULED":
                return "Démo planifiée"
            case "DEMO_DONE":
                return "Démo effectuée"
            case "CLOSED":
                return "Fermé"
            case "LOST":
                return "Perdu"
            default:
                return status
        }
    }

    const handleViewDetails = (lead: any) => {
        setSelectedLead(lead)
        openDrawer()
    }

    const handleUpdateStatus = async (leadId: string, status: string) => {
        try {
            const response = await fetch(`/api/sales/leads/${leadId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })

            if (response.ok) {
                notifications.show({
                    title: "Statut mis à jour",
                    message: "Le statut du lead a été mis à jour avec succès",
                    color: "green",
                })
                await fetchLeads()
                await fetchStats()
                if (selectedLead?.id === leadId) {
                    const updatedLead = leads.find((l) => l.id === leadId)
                    if (updatedLead) setSelectedLead({ ...updatedLead, status })
                }
            }
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Impossible de mettre à jour le statut",
                color: "red",
            })
        }
    }

    const handleRefresh = async () => {
        await fetchLeads()
        await fetchStats()
        if (selectedLead) {
            const refreshedLead = leads.find((l) => l.id === selectedLead.id)
            if (refreshedLead) setSelectedLead(refreshedLead)
        }
    }

    if (loading) {
        return (
            <Center h={400}>
                <Loader size="lg" />
            </Center>
        )
    }

    return (
        <Stack gap="xl">
            <Group justify="space-between" align="center">
                <div>
                    <Title order={2} fw={800} c="dark.9">
                        Bonjour, Amine 👋
                    </Title>
                    <Text c="dimmed" size="sm">
                        Voici vos performances et leads à traiter aujourd'hui.
                    </Text>
                </div>
                <Button
                    color="payfit.6"
                    radius="md"
                    leftSection={<IconRocket size={18} />}
                    component="a"
                    href="/sales/sandbox"
                >
                    Lancer l'Environnement de Démo
                </Button>
            </Group>

            {/* Statistics Cards */}
            {stats && (
                <>
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
                        <StatsCard
                            title="Total Leads"
                            value={stats.totalLeads}
                            icon={IconUsers}
                            color="blue"
                        />
                        <StatsCard
                            title="Taux de Conversion"
                            value={`${stats.conversionRate || "0.0"}%`}
                            icon={IconTrendingUp}
                            color="green"
                        />
                        <StatsCard
                            title="Délai Moyen → Démo"
                            value={`${stats.avgDaysToDemo || 0}j`}
                            icon={IconClock}
                            color="orange"
                        />
                        <StatsCard
                            title="Démos ce Mois"
                            value={stats.demosThisMonth || 0}
                            icon={IconRocket}
                            color="grape"
                        />
                    </SimpleGrid>

                    {/* Status Breakdown */}
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                        <SimpleGrid cols={{ base: 2, sm: 3, lg: 6 }} spacing="sm">
                            <Paper p="md" radius="md" withBorder bg="blue.0">
                                <Group gap="xs">
                                    <IconUsers size={20} color="var(--mantine-color-blue-6)" />
                                    <Stack gap={0}>
                                        <Text size="xs" c="dimmed" fw={600}>
                                            Nouveaux
                                        </Text>
                                        <Text fw={700} size="lg" c="blue.7">
                                            {stats.newLeads}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Paper>
                            <Paper p="md" radius="md" withBorder bg="cyan.0">
                                <Group gap="xs">
                                    <IconPhone size={20} color="var(--mantine-color-cyan-6)" />
                                    <Stack gap={0}>
                                        <Text size="xs" c="dimmed" fw={600}>
                                            Contactés
                                        </Text>
                                        <Text fw={700} size="lg" c="cyan.7">
                                            {stats.contactedLeads}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Paper>
                            <Paper p="md" radius="md" withBorder bg="orange.0">
                                <Group gap="xs">
                                    <IconCalendar size={20} color="var(--mantine-color-orange-6)" />
                                    <Stack gap={0}>
                                        <Text size="xs" c="dimmed" fw={600}>
                                            Démo planifiée
                                        </Text>
                                        <Text fw={700} size="lg" c="orange.7">
                                            {stats.demoScheduledLeads || 0}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Paper>
                            <Paper p="md" radius="md" withBorder bg="grape.0">
                                <Group gap="xs">
                                    <IconRocket size={20} color="var(--mantine-color-grape-6)" />
                                    <Stack gap={0}>
                                        <Text size="xs" c="dimmed" fw={600}>
                                            Démo faite
                                        </Text>
                                        <Text fw={700} size="lg" c="grape.7">
                                            {stats.demoDoneLeads}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Paper>
                            <Paper p="md" radius="md" withBorder bg="green.0">
                                <Group gap="xs">
                                    <IconCheck size={20} color="var(--mantine-color-green-6)" />
                                    <Stack gap={0}>
                                        <Text size="xs" c="dimmed" fw={600}>
                                            Fermés
                                        </Text>
                                        <Text fw={700} size="lg" c="green.7">
                                            {stats.closedLeads}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Paper>
                            <Paper p="md" radius="md" withBorder bg="red.0">
                                <Group gap="xs">
                                    <IconX size={20} color="var(--mantine-color-red-6)" />
                                    <Stack gap={0}>
                                        <Text size="xs" c="dimmed" fw={600}>
                                            Perdus
                                        </Text>
                                        <Text fw={700} size="lg" c="red.7">
                                            {stats.lostLeads || 0}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Paper>
                        </SimpleGrid>

                        <LeadStatsChart
                            data={{
                                newLeads: stats.newLeads,
                                contactedLeads: stats.contactedLeads,
                                demoScheduledLeads: stats.demoScheduledLeads || 0,
                                demoDoneLeads: stats.demoDoneLeads,
                                closedLeads: stats.closedLeads,
                                lostLeads: stats.lostLeads || 0,
                            }}
                        />
                    </SimpleGrid>
                </>
            )}

            {/* Filters */}
            <LeadFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            {/* Leads Table */}
            <Paper shadow="sm" radius="md" p="lg" withBorder>
                <Title order={4} mb="md">
                    Vos Leads Assignés ({leads.length})
                </Title>
                <Table highlightOnHover verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Prospect</Table.Th>
                            <Table.Th>Entreprise</Table.Th>
                            <Table.Th>Statut</Table.Th>
                            <Table.Th>Score</Table.Th>
                            <Table.Th>Dernière Interaction</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {leads.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={6} align="center">
                                    <Text c="dimmed">Aucun lead trouvé avec ces filtres.</Text>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            leads.map((lead) => (
                                <Table.Tr
                                    key={lead.id}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleViewDetails(lead)}
                                >
                                    <Table.Td>
                                        <Group gap="sm">
                                            <Avatar color={getStatusColor(lead.status)} radius="xl" size="sm">
                                                {((lead.firstName || "") + " " + (lead.lastName || ""))
                                                    .trim()
                                                    .split(" ")
                                                    .map((n: string) => n[0])
                                                    .join("") || "?"}
                                            </Avatar>
                                            <Box>
                                                <Text size="sm" fw={600}>
                                                    {lead.firstName} {lead.lastName}
                                                </Text>
                                                <Text size="xs" c="dimmed">
                                                    {lead.email}
                                                </Text>
                                            </Box>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Stack gap={0}>
                                            <Group gap={4}>
                                                <IconBuildingSkyscraper size={14} color="gray" />
                                                <Text size="sm">{lead.companyName}</Text>
                                            </Group>
                                            <Text size="xs" c="dimmed">
                                                {lead.wilaya} • {lead.employeeCount} employés
                                            </Text>
                                        </Stack>
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge color={getStatusColor(lead.status)} variant="light">
                                            {getStatusLabel(lead.status)}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        {lead.score !== undefined && lead.score !== null ? (
                                            <LeadScoreBadge score={lead.score} />
                                        ) : (
                                            <Text size="xs" c="dimmed">
                                                N/A
                                            </Text>
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        {lead.lastInteraction ? (
                                            <Text size="xs">
                                                {new Date(lead.lastInteraction).toLocaleDateString("fr-FR")}
                                            </Text>
                                        ) : (
                                            <Text size="xs" c="dimmed">
                                                Jamais
                                            </Text>
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        <Button
                                            size="xs"
                                            variant="light"
                                            color="payfit"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleViewDetails(lead)
                                            }}
                                        >
                                            Gérer
                                        </Button>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        )}
                    </Table.Tbody>
                </Table>
            </Paper>

            {/* Lead Detail Drawer */}
            <LeadDetailDrawer
                lead={selectedLead}
                opened={drawerOpened}
                onClose={closeDrawer}
                onStatusUpdate={handleUpdateStatus}
                onRefresh={handleRefresh}
            />
        </Stack>
    )
}
