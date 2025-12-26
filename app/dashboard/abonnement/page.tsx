"use client"

import { useState } from "react"
import {
    Container,
    Stack,
    Title,
    Text,
    SimpleGrid,
    Card,
    Button,
    Group,
    ThemeIcon,
    List,
    rem,
    Paper,
    Badge,
    Box,
    Divider,
    SegmentedControl,
} from "@mantine/core"
import {
    IconCheck,
    IconRocket,
    IconBuildingArch,
    IconCrown,
    IconCreditCard,
    IconLock,
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"

const plans = [
    {
        name: "Starter",
        price: "49",
        description: "Idéal pour les petites entreprises jusqu'à 10 salariés.",
        icon: IconRocket,
        color: "blue",
        features: ["Paie automatisée", "DSN incluse", "Support standard email", "Coffre-fort salarié"],
    },
    {
        name: "Pro",
        price: "159",
        description: "Le meilleur choix pour les entreprises en croissance.",
        icon: IconBuildingArch,
        color: "payfit",
        features: [
            "Tout ce qu'il y a dans Starter",
            "Gestion des absences & congés",
            "Notes de frais illimitées",
            "Support prioritaire chat",
            "Analyses RH avancées",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "349",
        description: "Solutions avancées pour les structures complexes.",
        icon: IconCrown,
        color: "indigo",
        features: [
            "Tout ce qu'il y a dans Pro",
            "Gestion multi-établissements",
            "API & Intégrations sur mesure",
            "Compte-clé dédié",
            "Audit de conformité annuel",
        ],
    },
]

export default function AbonnementPage() {
    const router = useRouter()
    const [billing, setBilling] = useState("monthly")
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)

    const handleSubscribe = async (planName: string) => {
        setLoading(true)
        setSelectedPlan(planName)

        try {
            const response = await fetch("/api/billing/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId: planName.toLowerCase() }), // Using plan name as mock ID
            })

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error("No URL returned")
            }
        } catch (error) {
            console.error("Subscription Error:", error)
            // Fallback for demo if Stripe isn't configured
            router.push("/dashboard/abonnement/confirmation")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container size="lg" py="xl">
            <Stack gap="xl" align="center" mb={50}>
                <Box ta="center">
                    <Title order={1} fw={800} lts={-0.5} size={rem(42)}>
                        Choisissez le plan adapté à votre <Text component="span" c="payfit.6" inherit>ambition</Text>
                    </Title>
                    <Text c="dimmed" size="lg" mt="sm">
                        Toutes nos offres incluent la conformité légale et la simplicité PayFit.
                    </Text>
                </Box>

                <SegmentedControl
                    value={billing}
                    onChange={setBilling}
                    data={[
                        { label: 'Mensuel', value: 'monthly' },
                        { label: 'Annuel (-20%)', value: 'yearly' },
                    ]}
                    color="payfit"
                    radius="xl"
                    size="md"
                />
            </Stack>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        shadow="sm"
                        padding="xl"
                        radius="md"
                        withBorder
                        style={{
                            borderColor: plan.popular ? 'var(--mantine-color-payfit-5)' : undefined,
                            transform: plan.popular ? 'scale(1.02)' : 'none',
                            zIndex: plan.popular ? 1 : 0,
                        }}
                    >
                        {plan.popular && (
                            <Badge
                                color="payfit.6"
                                variant="filled"
                                radius="sm"
                                style={{ position: 'absolute', top: 15, right: 15 }}
                            >
                                Populaire
                            </Badge>
                        )}

                        <Stack gap="md" h="100%">
                            <Group>
                                <ThemeIcon size={40} radius="md" color={plan.color} variant="light">
                                    <plan.icon size={24} />
                                </ThemeIcon>
                                <Title order={3} size="h4">{plan.name}</Title>
                            </Group>

                            <Text size="sm" c="dimmed" h={40}>{plan.description}</Text>

                            <Group align="flex-end" gap={4} my="lg">
                                <Text fw={800} size={rem(36)} style={{ lineHeight: 1 }}>{plan.price}€</Text>
                                <Text size="sm" c="dimmed" mb={4}>/mois{billing === 'yearly' ? ' (facturé annuellement)' : ''}</Text>
                            </Group>

                            <Divider variant="dashed" />

                            <List
                                spacing="xs"
                                size="sm"
                                center
                                icon={
                                    <ThemeIcon color="payfit" size={20} radius="xl">
                                        <IconCheck size={12} stroke={3} />
                                    </ThemeIcon>
                                }
                                flex={1}
                            >
                                {plan.features.map((feature) => (
                                    <List.Item key={feature}>{feature}</List.Item>
                                ))}
                            </List>

                            <Button
                                color="payfit.6"
                                fullWidth
                                radius="md"
                                size="md"
                                mt="xl"
                                onClick={() => handleSubscribe(plan.name)}
                            >
                                Choisir ce plan
                            </Button>
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>

            <Paper shadow="xs" radius="md" p="xl" withBorder mt={50} bg="gray.0">
                <Group justify="space-between">
                    <Group gap="xl">
                        <Box>
                            <Text fw={700}>Besoin d'une offre personnalisée ?</Text>
                            <Text size="sm" c="dimmed">Pour les entreprises de plus de 500 salariés, contactez nos experts.</Text>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box>
                            <Group gap="xs">
                                <IconLock size={16} color="var(--mantine-color-gray-5)" />
                                <Text size="xs" c="dimmed">Paiement sécurisé par Stripe & 3D Secure</Text>
                            </Group>
                            <Group gap="xs" mt={4}>
                                <IconCreditCard size={16} color="var(--mantine-color-gray-5)" />
                                <Text size="xs" c="dimmed">CB, Visa, Mastercard, SEPA</Text>
                            </Group>
                        </Box>
                    </Group>
                    <Button variant="outline" color="gray" radius="md">Contacter le Sales</Button>
                </Group>
            </Paper>
        </Container>
    )
}
