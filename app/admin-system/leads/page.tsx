"use client"

import { useState, useEffect } from "react"
import {
    Container,
    Title,
    Text,
    Paper,
    Table,
    Badge,
    Group,
    ActionIcon,
    Menu,
    Button,
    LoadingOverlay,
    Box,
    rem,
    TextInput,
    Select,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import {
    IconDotsVertical,
    IconCheck,
    IconX,
    IconPlus,
    IconSearch,
    IconRefresh,
} from "@tabler/icons-react"

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [provisioning, setProvisioning] = useState<string | null>(null)

    useEffect(() => {
        fetchLeads()
    }, [])

    const fetchLeads = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/admin/leads")
            if (!response.ok) throw new Error("Failed to fetch leads")
            const data = await response.json()
            setLeads(data)
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Impossible de charger les leads",
                color: "red",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const response = await fetch(`/api/admin/leads/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })
            if (!response.ok) throw new Error("Update failed")

            notifications.show({
                title: "Succès",
                message: `Statut mis à jour : ${status}`,
                color: "green",
            })
            fetchLeads()
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Échec de la mise à jour du statut",
                color: "red",
            })
        }
    }

    const handleProvision = async (id: string) => {
        setProvisioning(id)
        try {
            const response = await fetch(`/api/admin/leads/${id}/provision`, {
                method: "POST",
            })
            if (!response.ok) throw new Error("Provisioning failed")

            const data = await response.json()
            notifications.show({
                title: "Compte créé !",
                message: `L'entreprise a été provisionnée. Un email a été envoyé à ${data.adminEmail}`,
                color: "green",
                autoClose: 10000,
            })
            fetchLeads()
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Échec de la création du compte",
                color: "red",
            })
        } finally {
            setProvisioning(null)
        }
    }

    const rows = leads.map((lead) => (
        <Table.Tr key={lead.id}>
            <Table.Td>
                <Text fw={700}>{lead.companyName}</Text>
                <Text size="xs" c="dimmed">{new Date(lead.createdAt).toLocaleDateString()}</Text>
            </Table.Td>
            <Table.Td>
                <Text size="sm">{lead.firstName} {lead.lastName}</Text>
                <Text size="xs" c="dimmed">{lead.email}</Text>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={
                        lead.status === "NEW" ? "blue" :
                            lead.status === "QUALIFIED" ? "green" :
                                lead.status === "PROVISIONED" ? "indigo" :
                                    "gray"
                    }
                >
                    {lead.status === "NEW" ? "Nouveau" :
                        lead.status === "QUALIFIED" ? "Qualifié" :
                            lead.status === "PROVISIONED" ? "Converti" :
                                lead.status}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Text size="sm">{lead.employees} sal.</Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    {lead.status === "QUALIFIED" && (
                        <Button
                            size="xs"
                            variant="light"
                            color="payfit"
                            leftSection={<IconPlus size={14} />}
                            onClick={() => handleProvision(lead.id)}
                            loading={provisioning === lead.id}
                        >
                            Provisionner
                        </Button>
                    )}
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDotsVertical style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Statut</Menu.Label>
                            <Menu.Item
                                leftSection={<IconCheck style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => handleUpdateStatus(lead.id, "QUALIFIED")}
                            >
                                Qualifier
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconX style={{ width: rem(14), height: rem(14) }} />}
                                color="red"
                                onClick={() => handleUpdateStatus(lead.id, "REJECTED")}
                            >
                                Refuser
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Table.Td>
        </Table.Tr>
    ))

    return (
        <Box bg="gray.0" style={{ minHeight: '100vh' }}>
            <Container size="xl" py="xl">
                <Group justify="space-between" mb="xl">
                    <Box>
                        <Title order={2} fw={800}>Gestion des Leads</Title>
                        <Text c="dimmed" size="sm">Qualification des demandes de démo et activation des tenants.</Text>
                    </Box>
                    <Button variant="outline" color="gray" leftSection={<IconRefresh size={16} />} onClick={fetchLeads} loading={loading}>
                        Actualiser
                    </Button>
                </Group>

                <Paper shadow="sm" radius="md" p="md" withBorder>
                    <Group mb="md">
                        <TextInput
                            placeholder="Rechercher une entreprise..."
                            leftSection={<IconSearch size={16} />}
                            style={{ flex: 1 }}
                            radius="md"
                        />
                        <Select
                            placeholder="Statut"
                            data={["NEW", "QUALIFIED", "REJECTED", "PROVISIONED"]}
                            radius="md"
                        />
                    </Group>

                    <Box pos="relative">
                        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                        <Table verticalSpacing="md" highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Entreprise</Table.Th>
                                    <Table.Th>Contact</Table.Th>
                                    <Table.Th>Statut</Table.Th>
                                    <Table.Th>Taille</Table.Th>
                                    <Table.Th />
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>

                        {leads.length === 0 && !loading && (
                            <Box py={50} ta="center">
                                <Text c="dimmed">Aucun lead trouvé.</Text>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}
