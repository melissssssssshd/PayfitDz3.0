"use client"

import { Container, Title, Text, Paper, Table, Group, Checkbox, Box, rem, Badge } from "@mantine/core"

export default function AdminPermissionsPage() {
    const permissions = [
        { key: "leads:read", label: "Voir les leads", description: "Accès à la liste des demandes de démo" },
        { key: "leads:write", label: "Gérer les leads", description: "Modifier le statut, qualifier, refuser" },
        { key: "provision:execute", label: "Provisionner", description: "Créer un tenant à partir d'un lead" },
        { key: "users:manage", label: "Gérer les utilisateurs", description: "Ajouter/Supprimer des admins système" },
        { key: "billing:read", label: "Voir la facturation", description: "Accès aux revenus et abonnements" },
    ]

    return (
        <Box bg="gray.0" style={{ minHeight: '100vh' }}>
            <Container size="lg" py="xl">
                <Title order={2} fw={800} mb="xs">Permissions Système</Title>
                <Text c="dimmed" size="sm" mb="xl">Définition des capacités unitaires du système.</Text>

                <Paper shadow="sm" radius="md" p="md" withBorder>
                    <Table verticalSpacing="md" highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Permission</Table.Th>
                                <Table.Th>Description</Table.Th>
                                <Table.Th>Identifiant</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {permissions.map((p) => (
                                <Table.Tr key={p.key}>
                                    <Table.Td fw={700}>{p.label}</Table.Td>
                                    <Table.Td>
                                        <Text size="sm" c="dimmed">{p.description}</Text>
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge variant="light" color="gray" radius="sm">{p.key}</Badge>
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
