"use client"

import { Container, Title, Text, Paper, Table, Group, Button, Box, rem, ActionIcon, Modal } from "@mantine/core"
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react"
import { useState } from "react"

export default function AdminRolesPage() {
    const [roles] = useState([
        { id: "1", name: "Super Admin", count: 2, system: true },
        { id: "2", name: "SDR / Commercial", count: 5, system: true },
        { id: "3", name: "Support", count: 8, system: true },
        { id: "4", name: "Admin Entreprise (RH)", count: 124, system: false },
    ])

    return (
        <Box bg="gray.0" style={{ minHeight: '100vh' }}>
            <Container size="lg" py="xl">
                <Group justify="space-between" mb="xl">
                    <Box>
                        <Title order={2} fw={800}>Gestion des Rôles</Title>
                        <Text c="dimmed" size="sm">Configuration des rôles système et modèles pour les tenants.</Text>
                    </Box>
                    <Button color="payfit" leftSection={<IconPlus size={16} />}>
                        Nouveau Rôle
                    </Button>
                </Group>

                <Paper shadow="sm" radius="md" p="md" withBorder>
                    <Table verticalSpacing="md">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nom du Rôle</Table.Th>
                                <Table.Th>Utilisateurs</Table.Th>
                                <Table.Th>Type</Table.Th>
                                <Table.Th />
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {roles.map((role) => (
                                <Table.Tr key={role.id}>
                                    <Table.Td fw={700}>{role.name}</Table.Td>
                                    <Table.Td>{role.count} utilisateurs</Table.Td>
                                    <Table.Td>
                                        <Text size="xs" c={role.system ? "blue" : "gray"}>
                                            {role.system ? "Système" : "Tenant"}
                                        </Text>
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap="xs" justify="flex-end">
                                            <ActionIcon variant="subtle" color="gray">
                                                <IconEdit size={16} />
                                            </ActionIcon>
                                            {!role.system && (
                                                <ActionIcon variant="subtle" color="red">
                                                    <IconTrash size={16} />
                                                </ActionIcon>
                                            )}
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            </Container>
        </Box>
    )
}
