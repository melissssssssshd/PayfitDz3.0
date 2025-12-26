"use client"

import { useState, useEffect } from "react"
import {
    IconSearch,
    IconFilter,
    IconCalendar,
    IconCheck,
    IconX,
    IconPlus,
    IconBuildingSkyscraper,
    IconUsers,
    IconPhone,
    IconMail,
    IconDotsVertical,
    IconArrowRight,
    IconCertificate,
    IconClock,
} from "@tabler/icons-react"
import {
    Card,
    Button,
    TextInput,
    Badge,
    Table,
    Group,
    Stack,
    Title,
    Text,
    Avatar,
    Box,
    rem,
    ActionIcon,
    Menu,
    SimpleGrid,
    ThemeIcon,
    Tabs,
    Drawer,
    Divider,
    List,
    Paper,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import { AssignLeadModal } from "@/components/admin/assign-lead-modal"

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedLead, setSelectedLead] = useState<any>(null)
    const [opened, { open, close }] = useDisclosure(false)
    const [salesUsers, setSalesUsers] = useState<any[]>([])
    const [assignModalOpened, { open: openAssignModal, close: closeAssignModal }] = useDisclosure(false)
    const [leadToAssign, setLeadToAssign] = useState<any>(null)

    const fetchSalesUsers = async () => {
        try {
            const response = await fetch("/api/admin/sales-users")
            if (response.ok) {
                const data = await response.json()
                setSalesUsers(data)
            }
        } catch (error) {
            console.error("Failed to fetch sales users:", error)
        }
    }

    const fetchLeads = async () => {
        try {
            const response = await fetch("/api/admin/leads")
            if (response.ok) {
                const data = await response.json()
                setLeads(data)
            }
        } catch (error) {
            console.error("Failed to fetch leads:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLeads()
        fetchSalesUsers()
    }, [])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "NEW": return "blue"
            case "CONTACTED": return "yellow"
            case "QUALIFIED": return "orange"
            case "DEMO_DONE": return "indigo"
            case "PROVISIONED": return "payfit"
            case "REJECTED": return "red"
            default: return "gray"
        }
    }

    const handleViewDetails = (lead: any) => {
        setSelectedLead(lead)
        open()
    }

    const handleUpdateStatus = async (leadId: string, status: string) => {
        try {
            const response = await fetch(`/api/admin/leads/${leadId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })

            if (response.ok) {
                notifications.show({
                    title: "Statut mis à jour",
                    message: `Le lead est maintenant : ${status}`,
                    color: "blue",
                })
                fetchLeads()
                if (selectedLead?.id === leadId) {
                    setSelectedLead({ ...selectedLead, status })
                }
            }
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Impossible de mettre à jour le statut.",
                color: "red",
            })
        }
    }

    const handleValidateDemo = async (leadId: string) => {
        try {
            const response = await fetch(`/api/admin/leads/${leadId}/approve`, {
                method: "POST",
            })

            if (response.ok) {
                notifications.show({
                    title: "Démo validée !",
                    message: "Le compte entreprise a été créé automatiquement.",
                    color: "payfit",
                    icon: <IconCheck size={18} />,
                })
                fetchLeads() // Refresh list
                close()
            }
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Impossible de valider la démo.",
                color: "red",
            })
        }
    }

    const handleAssignLead = async (leadId: string, salesUserId: string | null) => {
        try {
            const response = await fetch(`/api/admin/leads/${leadId}/assign`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ assignedToId: salesUserId }),
            })

            if (response.ok) {
                notifications.show({
                    title: "Lead assigné",
                    message: salesUserId ? "Le lead a été assigné au commercial." : "L'assignation a été retirée.",
                    color: "payfit",
                })
                fetchLeads()
                closeAssignModal()
            }
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Impossible d'assigner le lead.",
                color: "red",
            })
        }
    }

    const openAssignModalFor = (lead: any) => {
        setLeadToAssign(lead)
        openAssignModal()
    }

    return (
        <Stack gap="xl">
            <Group justify="space-between" align="center">
                <div>
                    <Title order={2} fw={800} c="dark.9">Gestion des Leads & Démos</Title>
                    <Text c="dimmed" size="sm">Suivez, qualifiez et convertissez les demandes de démo entrantes.</Text>
                </div>
                <Button
                    color="payfit.6"
                    radius="md"
                    leftSection={<IconPlus size={18} />}
                >
                    Ajouter un lead
                </Button>
            </Group>

            <SimpleGrid cols={{ base: 1, md: 4 }} spacing="lg">
                <StatsCard title="Nouveaux Leads" value={leads.filter(l => l.status === "NEW").length.toString()} subtext="À traiter" icon={IconPlus} color="blue" />
                <StatsCard title="Contactés" value={leads.filter(l => l.status === "CONTACTED").length.toString()} subtext="En cours" icon={IconPhone} color="orange" />
                <StatsCard title="Démos" value={leads.filter(l => l.status === "DEMO_DONE").length.toString()} subtext="Réalisées" icon={IconCalendar} color="indigo" />
                <StatsCard title="Clôturés" value={leads.filter(l => l.status === "CLOSED").length.toString()} subtext="Terminés" icon={IconCheck} color="green" />
            </SimpleGrid>

            <Tabs defaultValue="all" color="payfit">
                <Tabs.List mb="lg">
                    <Tabs.Tab value="all" leftSection={<IconUsers size={16} />}>Tous les leads</Tabs.Tab>
                    <Tabs.Tab value="new" color="blue">Nouveaux</Tabs.Tab>
                    <Tabs.Tab value="qualified" color="orange">Qualifiés</Tabs.Tab>
                    <Tabs.Tab value="demo" color="indigo">Démos</Tabs.Tab>
                </Tabs.List>

                <Card shadow="sm" radius="md" padding="lg" withBorder>
                    <Group mb="lg">
                        <TextInput
                            placeholder="Rechercher un lead ou une entreprise..."
                            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
                            style={{ flex: 1 }}
                            radius="md"
                        />
                        <Button variant="light" color="gray" leftSection={<IconFilter size={16} />} radius="md">
                            Filtres
                        </Button>
                    </Group>

                    <Table.ScrollContainer minWidth={1000}>
                        <Table verticalSpacing="md" highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Prospect</Table.Th>
                                    <Table.Th>Entreprise</Table.Th>
                                    <Table.Th>Taille / Secteur</Table.Th>
                                    <Table.Th>Assigné à</Table.Th>
                                    <Table.Th>Statut</Table.Th>
                                    <Table.Th>Arrivée</Table.Th>
                                    <Table.Th style={{ width: rem(200) }}>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {leads.map((lead) => (
                                    <Table.Tr key={lead.id} style={{ cursor: "pointer" }} onClick={() => handleViewDetails(lead)}>
                                        <Table.Td>
                                            <Group gap="sm">
                                                <Avatar color={getStatusColor(lead.status)} radius="xl" size="sm">
                                                    {((lead.firstName || "") + " " + (lead.lastName || "")).trim().split(" ").map((n: string) => n[0]).join("") || "?"}
                                                </Avatar>
                                                <Box>
                                                    <Text size="sm" fw={700}>{lead.firstName} {lead.lastName}</Text>
                                                    <Text size="xs" c="dimmed">{lead.email}</Text>
                                                </Box>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>
                                            <Stack gap={0}>
                                                <Group gap={4}>
                                                    <IconBuildingSkyscraper size={14} color="var(--mantine-color-gray-5)" />
                                                    <Text size="sm" fw={500}>{lead.companyName}</Text>
                                                </Group>
                                                <Text size="xs" c="dimmed">{lead.wilaya}</Text>
                                            </Stack>
                                        </Table.Td>
                                        <Table.Td>
                                            <Stack gap={4}>
                                                <Badge variant="light" color="gray" radius="sm" size="xs">
                                                    {lead.employees || 0} collab.
                                                </Badge>
                                                <Text size="xs" c="dimmed" truncate>{lead.sector}</Text>
                                            </Stack>
                                        </Table.Td>
                                        <Table.Td>
                                            {lead.assignedTo ? (
                                                <Badge variant="light" color="payfit" size="sm">
                                                    {lead.assignedTo.name}
                                                </Badge>
                                            ) : (
                                                <Text size="xs" c="dimmed">Non assigné</Text>
                                            )}
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge variant="dot" color={getStatusColor(lead.status)} radius="sm">
                                                {lead.status}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="dimmed">{new Date(lead.createdAt).toLocaleDateString()}</Text>
                                        </Table.Td>
                                        <Table.Td onClick={(e) => e.stopPropagation()}>
                                            <Group gap="xs">
                                                <Button
                                                    size="compact-xs"
                                                    variant="light"
                                                    color="payfit"
                                                    onClick={() => openAssignModalFor(lead)}
                                                >
                                                    Assigner
                                                </Button>
                                                {lead.status === "NEW" && (
                                                    <Button size="compact-xs" variant="light" color="blue" onClick={() => handleUpdateStatus(lead.id, "CONTACTED")}>Marquer Contacté</Button>
                                                )}
                                                {lead.status === "CONTACTED" && (
                                                    <Button size="compact-xs" variant="light" color="indigo" onClick={() => handleUpdateStatus(lead.id, "DEMO_DONE")}>Démo Réalisée</Button>
                                                )}
                                                {lead.status === "DEMO_DONE" && (
                                                    <Button size="compact-xs" variant="light" color="green" onClick={() => handleUpdateStatus(lead.id, "CLOSED")}>Clôturer</Button>
                                                )}
                                                {lead.status === "CLOSED" && (
                                                    <Badge variant="filled" color="green" leftSection={<IconCheck size={10} />}>Clôturé</Badge>
                                                )}
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </Card>
            </Tabs>

            <Drawer
                opened={opened}
                onClose={close}
                title={<Text fw={700} size="lg">Détails de la demande</Text>}
                position="right"
                size="md"
            >
                {selectedLead && (
                    <Stack gap="xl">
                        <Box>
                            <Group gap="sm" mb="md">
                                <Avatar size="lg" color={getStatusColor(selectedLead.status)} radius="md">
                                    {((selectedLead.firstName || "") + " " + (selectedLead.lastName || "")).trim().split(" ").map((n: string) => n[0]).join("") || "?"}
                                </Avatar>
                                <div>
                                    <Text fw={700} size="xl">{selectedLead.firstName} {selectedLead.lastName}</Text>
                                    <Text c="dimmed" size="sm">{selectedLead.jobTitle} • {selectedLead.companyName}</Text>
                                </div>
                            </Group>
                            <Badge color={getStatusColor(selectedLead.status)} variant="filled">
                                Statut: {selectedLead.status}
                            </Badge>
                        </Box>

                        <Divider label="Informations de contact" labelPosition="center" />

                        <SimpleGrid cols={2}>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Email</Text>
                                <Text size="sm">{selectedLead.email}</Text>
                            </Box>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Téléphone</Text>
                                <Text size="sm">{selectedLead.phone}</Text>
                            </Box>
                        </SimpleGrid>

                        <Divider label="Informations entreprise" labelPosition="center" />

                        <SimpleGrid cols={2}>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Secteur</Text>
                                <Text size="sm">{selectedLead.sector}</Text>
                            </Box>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Wilaya</Text>
                                <Text size="sm">{selectedLead.wilaya}</Text>
                            </Box>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Taille</Text>
                                <Text size="sm">{selectedLead.employees} employés</Text>
                            </Box>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Type</Text>
                                <Text size="sm">{selectedLead.companyType}</Text>
                            </Box>
                        </SimpleGrid>

                        <Divider label="Besoins exprimés" labelPosition="center" />

                        <Box>
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase" mb="xs">Priorités identifiées</Text>
                            <List spacing="xs" size="sm" center icon={
                                <ThemeIcon color="payfit" size={20} radius="xl">
                                    <IconCheck size={12} />
                                </ThemeIcon>
                            }>
                                {selectedLead.needsPayroll && <List.Item>Gestion de la paie</List.Item>}
                                {selectedLead.needsCNAS && <List.Item>Déclarations CNAS</List.Item>}
                                {selectedLead.needsLeaveManagement && <List.Item>Congés & Absences</List.Item>}
                                {/* Legacy */}
                                {(selectedLead.needs as string[] || []).map((need, i) => (
                                    <List.Item key={i}>{need}</List.Item>
                                ))}
                            </List>
                        </Box>

                        <Box>
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase" mb="xs">Solution Actuelle</Text>
                            <Paper withBorder p="sm" bg="gray.0">
                                <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                                    {selectedLead.currentSolution || selectedLead.problems || "Non spécifié."}
                                </Text>
                            </Paper>
                        </Box>

                        <Group grow mt="xl">
                            {selectedLead.status === "NEW" && (
                                <Button color="blue" onClick={() => { handleUpdateStatus(selectedLead.id, "CONTACTED"); close() }}>
                                    Marquer comme contacté
                                </Button>
                            )}
                            {selectedLead.status === "CONTACTED" && (
                                <Button color="indigo" onClick={() => { handleUpdateStatus(selectedLead.id, "DEMO_DONE"); close() }}>
                                    Confirmer Démo Réalisée
                                </Button>
                            )}
                            {selectedLead.status === "DEMO_DONE" && (
                                <Button color="green" onClick={() => { handleUpdateStatus(selectedLead.id, "CLOSED"); close() }}>
                                    Clôturer le dossier
                                </Button>
                            )}
                        </Group>
                    </Stack>
                )}
            </Drawer>

            <AssignLeadModal
                opened={assignModalOpened}
                onClose={closeAssignModal}
                lead={leadToAssign}
                salesUsers={salesUsers}
                onAssign={handleAssignLead}
            />
        </Stack>
    )
}

const NEEDS_OPTIONS = [
    { value: "PAIE", label: "Gestion de la paie algérienne" },
    { value: "DECLARATIONS", label: "Déclarations CNAS / CASNOS" },
    { value: "CONGES", label: "Gestion des congés et absences" },
    { value: "CONTRATS", label: "Contrats et dossiers employés" },
    { value: "POINTAGE", label: "Suivi du temps et pointage" },
]

function StatsCard({ title, value, subtext, icon: Icon, color }: any) {
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
