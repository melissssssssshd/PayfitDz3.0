"use client"

import { useState } from "react"
import { Checkbox, Stack, Title, Text, Button, Paper, Group, ThemeIcon, Box, SimpleGrid } from "@mantine/core"
import { useRouter } from "next/navigation"
import { IconCreditCard, IconUsers, IconClock, IconReceipt2 } from "@tabler/icons-react"

const MODULES = [
    { id: "payroll", title: "Paie automatisée", description: "Bulletins de paie et déclarations DSN automatiques.", icon: IconCreditCard, color: "blue" },
    { id: "hr", title: "Gestion RH", description: "Dossiers RH, contrats et documents centralisés.", icon: IconUsers, color: "teal" },
    { id: "time", title: "Congés & Absences", description: "Suivi des temps et validation des congés.", icon: IconClock, color: "orange" },
    { id: "expenses", title: "Notes de frais", description: "Gestion simplifiée des remboursements.", icon: IconReceipt2, color: "indigo" },
]

export default function ModulesOnboardingPage() {
    const router = useRouter()
    const [selectedModules, setSelectedModules] = useState<string[]>(["payroll"])
    const [loading, setLoading] = useState(false)

    const toggleModule = (id: string) => {
        setSelectedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        )
    }

    const handleSubmit = async () => {
        setLoading(true)
        console.log("Selected modules:", selectedModules)
        await new Promise(resolve => setTimeout(resolve, 800))
        router.push("/onboarding/roles")
        setLoading(false)
    }

    return (
        <Stack gap="xl">
            <Box>
                <Title order={2} fw={800} mb={5}>Quels modules souhaitez-vous ?</Title>
                <Text c="dimmed" size="sm">Vous pourrez modifier ces choix plus tard dans vos paramètres.</Text>
            </Box>

            <SimpleGrid cols={1} spacing="md">
                {MODULES.map((module) => (
                    <Paper
                        key={module.id}
                        withBorder
                        p="md"
                        radius="md"
                        style={{
                            cursor: 'pointer',
                            borderColor: selectedModules.includes(module.id) ? 'var(--mantine-color-payfit-6)' : undefined,
                            backgroundColor: selectedModules.includes(module.id) ? 'var(--mantine-color-payfit-0)' : undefined,
                        }}
                        onClick={() => toggleModule(module.id)}
                    >
                        <Group wrap="nowrap">
                            <Checkbox
                                checked={selectedModules.includes(module.id)}
                                onChange={() => { }}
                                tabIndex={-1}
                                color="payfit"
                            />
                            <ThemeIcon variant="light" color={module.color} size="xl" radius="md">
                                <module.icon size={24} />
                            </ThemeIcon>
                            <Box style={{ flex: 1 }}>
                                <Text fw={700} size="sm">{module.title}</Text>
                                <Text size="xs" c="dimmed">{module.description}</Text>
                            </Box>
                        </Group>
                    </Paper>
                ))}
            </SimpleGrid>

            <Group justify="space-between" mt="xl">
                <Button variant="subtle" color="gray" onClick={() => router.back()}>Retour</Button>
                <Button
                    color="payfit"
                    radius="md"
                    size="lg"
                    onClick={handleSubmit}
                    loading={loading}
                >
                    Continuer
                </Button>
            </Group>
        </Stack>
    )
}
