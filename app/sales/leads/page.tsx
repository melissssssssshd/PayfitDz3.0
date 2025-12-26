"use client"

import { useState, useEffect } from "react"
import {
    Title,
    Text,
    Stack,
    Button,
    Badge,
    Paper,
    Group,
    Avatar,
    Box,
    Loader,
    Center,
    ScrollArea,
} from "@mantine/core"
import {
    IconUsers,
    IconBuildingSkyscraper,
    IconMapPin,
    IconCalendar,
    IconRocket,
    IconCheck,
    IconX,
} from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { LeadDetailDrawer } from "@/components/sales/lead-detail-drawer"
import { LeadScoreBadge } from "@/components/sales/lead-score-badge"
import { formatCurrency } from "@/lib/utils"

// Vue Pipeline Kanban
const PIPELINE_COLUMNS = [
    { id: "NEW", label: "Nouveaux", color: "blue" },
    { id: "CONTACTED", label: "Contactés", color: "cyan" },
    { id: "DEMO_SCHEDULED", label: "Démo planifiée", color: "orange" },
    { id: "DEMO_DONE", label: "Démo effectuée", color: "grape" },
    { id: "CLOSED", label: "Fermés", color: "green" },
]

export default function LeadsPipelinePage() {
    const [leads, setLeads] = useState<any[]>([])
    const [selectedLead, setSelectedLead] = useState<any>(null)
    const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)
    const [loading, setLoading] = useState(true)

    const fetchLeads = async () => {
        try {
            const response = await fetch("/api/sales/leads")
            if (response.ok) {
                const data = await response.json()
                setLeads(data)
            }
        } catch (error) {
            console.error("Failed to fetch leads:", error)
            notifications.show({
                title: "Erreur",
                message: "Impossible de charger les leads",
                color: "red",
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLeads()
    }, [])

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
        if (selectedLead) {
            const refreshedLead = leads.find((l) => l.id === selectedLead.id)
            if (refreshedLead) setSelectedLead(refreshedLead)
        }
    }

    const getLeadsByStatus = (status: string) => {
        return leads.filter((lead) => lead.status === status)
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
                        Pipeline de Leads
                    </Title>
                    <Text c="dimmed" size="sm">
                        Gérez vos leads dans un pipeline visuel type Kanban
                    </Text>
                </div>
                <Button onClick={fetchLeads} variant="light">
                    Rafraîchir
                </Button>
            </Group>

            {/* Pipeline Kanban */}
            <ScrollArea>
                <Group align="flex-start" gap="md" style={{ minHeight: 600 }}>
                    {PIPELINE_COLUMNS.map((column) => {
                        const columnLeads = getLeadsByStatus(column.id)
                        return (
                            <Paper
                                key={column.id}
                                p="md"
                                withBorder
                                radius="md"
                                style={{ flex: 1, minWidth: 280 }}
                            >
                                <Stack gap="md">
                                    <Group justify="space-between">
                                        <Badge color={column.color} variant="light" size="lg">
                                            {column.label}
                                        </Badge>
                                        <Badge color={column.color} variant="filled" size="lg">
                                            {columnLeads.length}
                                        </Badge>
                                    </Group>

                                    <Stack gap="sm" style={{ minHeight: 500 }}>
                                        {columnLeads.length === 0 ? (
                                            <Text c="dimmed" size="sm" ta="center" py="xl">
                                                Aucun lead
                                            </Text>
                                        ) : (
                                            columnLeads.map((lead) => (
                                                <Paper
                                                    key={lead.id}
                                                    p="sm"
                                                    withBorder
                                                    radius="md"
                                                    style={{
                                                        cursor: "pointer",
                                                        transition: "all 0.2s",
                                                    }}
                                                    onClick={() => handleViewDetails(lead)}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.boxShadow =
                                                            "0 2px 8px rgba(0,0,0,0.1)"
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.boxShadow = "none"
                                                    }}
                                                >
                                                    <Stack gap="xs">
                                                        <Group justify="space-between" align="flex-start">
                                                            <Group gap="xs">
                                                                <Avatar
                                                                    color={column.color}
                                                                    radius="xl"
                                                                    size="sm"
                                                                >
                                                                    {((lead.firstName || "") +
                                                                        " " +
                                                                        (lead.lastName || ""))
                                                                        .trim()
                                                                        .split(" ")
                                                                        .map((n: string) => n[0])
                                                                        .join("") || "?"}
                                                                </Avatar>
                                                                <Box style={{ flex: 1 }}>
                                                                    <Text size="sm" fw={600} lineClamp={1}>
                                                                        {lead.firstName} {lead.lastName}
                                                                    </Text>
                                                                    <Text size="xs" c="dimmed" lineClamp={1}>
                                                                        {lead.companyName}
                                                                    </Text>
                                                                </Box>
                                                            </Group>
                                                            {lead.score !== undefined &&
                                                                lead.score !== null && (
                                                                    <LeadScoreBadge score={lead.score} />
                                                                )}
                                                        </Group>

                                                        <Group gap="xs" wrap="nowrap">
                                                            <IconMapPin size={12} color="gray" />
                                                            <Text size="xs" c="dimmed" lineClamp={1}>
                                                                {lead.wilaya}
                                                            </Text>
                                                        </Group>

                                                        {lead.employees && (
                                                            <Group gap="xs" wrap="nowrap">
                                                                <IconUsers size={12} color="gray" />
                                                                <Text size="xs" c="dimmed">
                                                                    {lead.employees} employés
                                                                </Text>
                                                            </Group>
                                                        )}

                                                        {lead.demoDate && (
                                                            <Group gap="xs" wrap="nowrap">
                                                                <IconCalendar size={12} color="orange" />
                                                                <Text size="xs" c="orange" fw={500}>
                                                                    {new Date(
                                                                        lead.demoDate
                                                                    ).toLocaleDateString("fr-FR", {
                                                                        day: "numeric",
                                                                        month: "short",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    })}
                                                                </Text>
                                                            </Group>
                                                        )}

                                                        {lead.lastInteraction && (
                                                            <Text size="xs" c="dimmed">
                                                                Dernière interaction :{" "}
                                                                {new Date(
                                                                    lead.lastInteraction
                                                                ).toLocaleDateString("fr-FR")}
                                                            </Text>
                                                        )}
                                                    </Stack>
                                                </Paper>
                                            ))
                                        )}
                                    </Stack>
                                </Stack>
                            </Paper>
                        )
                    })}
                </Group>
            </ScrollArea>

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


