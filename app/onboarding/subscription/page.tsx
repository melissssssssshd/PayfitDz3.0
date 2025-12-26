"use client"

import { useState } from "react"
import { Stack, Title, Text, Button, Group, Card, Badge, List, rem, Box, Center, SimpleGrid, Paper } from "@mantine/core"
import { useRouter } from "next/navigation"
import { IconCheck, IconRocket, IconBuildingCommunity, IconCrown } from "@tabler/icons-react"
import { notifications } from "@mantine/notifications"

const PLANS = [
    {
        id: "starter",
        title: "Starter",
        price: "49€",
        description: "Pour les TPE",
        icon: IconRocket,
        features: ["Paie automatisée", "10 salariés max", "Support email"],
        color: "blue"
    },
    {
        id: "pro",
        title: "Pro",
        price: "99€",
        description: "Le plus populaire",
        icon: IconBuildingCommunity,
        features: ["Tout de Starter", "Salariés illimités", "Assistant IA", "Support expert"],
        color: "payfit",
        popular: true
    },
    {
        id: "enterprise",
        title: "Enterprise",
        price: "199€",
        description: "Sur mesure",
        icon: IconCrown,
        features: ["Tout de Pro", "SSO & Sécurité", "API ouverte", "Account Manager"],
        color: "indigo"
    },
]

export default function SubscriptionOnboardingPage() {
    const router = useRouter()
    const [selectedPlan, setSelectedPlan] = useState("pro")
    const [loading, setLoading] = useState(false)

    const handlePayment = async () => {
        setLoading(true)
        try {
            // Simulation of payment processing
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Actual activation in DB
            const response = await fetch("/api/onboarding/tenant", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "ACTIVE" }),
            })

            if (!response.ok) throw new Error("Activation failed")

            notifications.show({
                title: "Paiement validé !",
                message: "Votre abonnement est désormais actif. Bienvenue sur PayFit !",
                color: "green",
                icon: <IconCheck size={18} />,
            })

            setTimeout(() => {
                router.push("/dashboard")
            }, 1000)
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Un problème est survenu lors de l'activation.",
                color: "red",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Stack gap="xl">
            <Box ta="center">
                <Title order={2} fw={800} mb={5}>Choisissez votre abonnement</Title>
                <Text c="dimmed" size="sm">Mensuel, sans engagement. Annulez à tout moment.</Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                {PLANS.map((plan) => (
                    <Card
                        key={plan.id}
                        withBorder
                        p="xl"
                        radius="md"
                        style={{
                            position: 'relative',
                            borderColor: selectedPlan === plan.id ? `var(--mantine-color-${plan.color}-6)` : undefined,
                            borderWidth: selectedPlan === plan.id ? rem(2) : undefined,
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelectedPlan(plan.id)}
                    >
                        {plan.popular && (
                            <Badge color="payfit" variant="filled" style={{ position: 'absolute', top: rem(-10), left: '50%', transform: 'translateX(-50%)' }}>
                                Populaire
                            </Badge>
                        )}

                        <Stack align="center" gap="xs" mb="md">
                            <plan.icon size={32} color={`var(--mantine-color-${plan.color}-6)`} />
                            <Text fw={800}>{plan.title}</Text>
                            <Group gap={4} align="flex-end">
                                <Text fw={900} size={rem(28)}>{plan.price}</Text>
                                <Text size="xs" c="dimmed" mb={5}>/mois</Text>
                            </Group>
                        </Stack>

                        <List size="xs" spacing="xs" center icon={<IconCheck size={12} color="var(--mantine-color-green-6)" stroke={3} />}>
                            {plan.features.map(f => <List.Item key={f}>{f}</List.Item>)}
                        </List>
                    </Card>
                ))}
            </SimpleGrid>

            <Paper bg="gray.0" p="xl" radius="md" style={{ border: `1px dashed var(--mantine-color-gray-3)` }}>
                <Title order={4} mb="md">Simulation du paiement</Title>
                <Text size="sm" c="dimmed" mb="xl">En mode test, cliquez sur le bouton ci-dessous pour simuler une saisie de carte bancaire réussie.</Text>
                <Button
                    fullWidth
                    size="lg"
                    color="payfit"
                    radius="md"
                    onClick={handlePayment}
                    loading={loading}
                >
                    Payer {PLANS.find(p => p.id === selectedPlan)?.price} et Activer
                </Button>
            </Paper>

            <Button variant="subtle" color="gray" onClick={() => router.back()} disabled={loading}>Retour</Button>
        </Stack>
    )
}
