"use client"

import { Container, Stepper, Paper, Title, Box, rem, Text, Group, ThemeIcon } from "@mantine/core"
import { usePathname } from "next/navigation"
import { IconCheck, IconBuilding, IconListCheck, IconUsers, IconCreditCard } from "@tabler/icons-react"

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const getActiveStep = () => {
        if (pathname.includes("/onboarding/company")) return 0
        if (pathname.includes("/onboarding/modules")) return 1
        if (pathname.includes("/onboarding/roles")) return 2
        if (pathname.includes("/onboarding/users")) return 3
        if (pathname.includes("/onboarding/subscription")) return 4
        return 0
    }

    return (
        <Box bg="gray.0" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box bg="white" py="md" style={{ borderBottom: `1px solid var(--mantine-color-gray-2)` }}>
                <Container size="lg">
                    <Group justify="space-between">
                        <Group gap="xs">
                            <ThemeIcon size={32} radius="md" color="payfit.6">
                                <Text fw={800} size="sm">P</Text>
                            </ThemeIcon>
                            <Text fw={800} size="xl">Onboarding</Text>
                        </Group>
                        <Text size="sm" c="dimmed">Configuration de votre espace entreprise</Text>
                    </Group>
                </Container>
            </Box>

            {/* Stepper */}
            <Box bg="white" py="xl" style={{ borderBottom: `1px solid var(--mantine-color-gray-2)` }}>
                <Container size="lg">
                    <Stepper
                        active={getActiveStep()}
                        allowNextStepsSelect={false}
                        color="payfit"
                        size="sm"
                        completedIcon={<IconCheck size={rem(18)} stroke={3} />}
                    >
                        <Stepper.Step
                            label="Entreprise"
                            description="Informations légales"
                            icon={<IconBuilding size={rem(18)} />}
                        />
                        <Stepper.Step
                            label="Modules"
                            description="Config services"
                            icon={<IconListCheck size={rem(18)} />}
                        />
                        <Stepper.Step
                            label="Rôles"
                            description="Permissions"
                            icon={<IconUsers size={rem(18)} />}
                        />
                        <Stepper.Step
                            label="Invitations"
                            description="Équipe RH"
                            icon={<IconUsers size={rem(18)} />}
                        />
                        <Stepper.Step
                            label="Paiement"
                            description="Abonnement"
                            icon={<IconCreditCard size={rem(18)} />}
                        />
                    </Stepper>
                </Container>
            </Box>

            {/* Main Content */}
            <Box style={{ flex: 1, paddingBottom: rem(80) }}>
                <Container size="sm" py={50}>
                    <Paper shadow="sm" radius="md" p={40} withBorder>
                        {children}
                    </Paper>
                </Container>
            </Box>
        </Box>
    )
}
