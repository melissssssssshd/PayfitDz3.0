"use client"

import { useState } from "react"
import { Stack, Title, Text, Button, Group, Table, Checkbox, Badge, rem, Box } from "@mantine/core"
import { useRouter } from "next/navigation"

const INITIAL_ROLES = [
    { id: "rh", name: "Responsable RH", permissions: ["payroll", "hr", "users"] },
    { id: "manager", name: "Manager", permissions: ["hr", "time"] },
    { id: "comptable", name: "Comptable", permissions: ["payroll"] },
]

export default function RolesOnboardingPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 800))
        router.push("/onboarding/users")
        setLoading(false)
    }

    return (
        <Stack gap="xl">
            <Box>
                <Title order={2} fw={800} mb={5}>Rôles et permissions</Title>
                <Text c="dimmed" size="sm">Nous avons pré-configuré les rôles standards pour vous. Vous pourrez les personnaliser plus tard.</Text>
            </Box>

            <Table withTableBorder withColumnBorders verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Rôle</Table.Th>
                        <Table.Th ta="center">Paie</Table.Th>
                        <Table.Th ta="center">RH</Table.Th>
                        <Table.Th ta="center">Salariés</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {INITIAL_ROLES.map((role) => (
                        <Table.Tr key={role.id}>
                            <Table.Td fw={700}>{role.name}</Table.Td>
                            <Table.Td ta="center"><Checkbox color="payfit" checked={role.permissions.includes("payroll")} readOnly /></Table.Td>
                            <Table.Td ta="center"><Checkbox color="payfit" checked={role.permissions.includes("hr")} readOnly /></Table.Td>
                            <Table.Td ta="center"><Checkbox color="payfit" checked={role.permissions.includes("users")} readOnly /></Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Group justify="space-between" mt="xl">
                <Button variant="subtle" color="gray" onClick={() => router.back()}>Retour</Button>
                <Button
                    color="payfit"
                    radius="md"
                    size="lg"
                    onClick={handleSubmit}
                    loading={loading}
                >
                    Valider et continuer
                </Button>
            </Group>
        </Stack>
    )
}
