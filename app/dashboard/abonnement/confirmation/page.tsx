"use client"

import {
    Container,
    Stack,
    Title,
    Text,
    Button,
    Paper,
    ThemeIcon,
    rem,
    Group,
    Box,
    Divider,
    Badge,
} from "@mantine/core"
import {
    IconCircleCheck,
    IconArrowRight,
    IconReceipt,
    IconDownload,
    IconMail,
} from "@tabler/icons-react"
import Link from "next/link"

export default function ConfirmationPage() {
    return (
        <Container size="sm" py={rem(80)}>
            <Paper shadow="sm" radius="md" p={rem(50)} withBorder bg="white">
                <Stack align="center" gap="xl">
                    <ThemeIcon size={80} radius={rem(100)} color="payfit" variant="light">
                        <IconCircleCheck size={48} stroke={2.5} />
                    </ThemeIcon>

                    <Box ta="center">
                        <Title order={1} fw={800} lts={-0.5} mb="xs">Paiement Réussi !</Title>
                        <Text c="dimmed">Votre abonnement PayFit est désormais actif. Bienvenue parmi nous !</Text>
                    </Box>

                    <Paper w="100%" p="md" radius="md" bg="gray.0" withBorder>
                        <Group justify="space-between" mb="xs">
                            <Text size="sm" fw={700}>Détails de la transaction</Text>
                            <Badge color="payfit" variant="light">PAYÉ</Badge>
                        </Group>
                        <Stack gap={4}>
                            <Group justify="space-between">
                                <Text size="xs" c="dimmed">Facture n°</Text>
                                <Text size="xs" fw={600}>FT-2024-8942</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="xs" c="dimmed">Date</Text>
                                <Text size="xs" fw={600}>19 Décembre 2024</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="xs" c="dimmed">Plan</Text>
                                <Text size="xs" fw={600}>Offre Pro (Mensuel)</Text>
                            </Group>
                        </Stack>
                        <Divider my="md" variant="dashed" />
                        <Group justify="space-between">
                            <Text fw={800} size="md">Total</Text>
                            <Text fw={800} size="md">159.00 €</Text>
                        </Group>
                    </Paper>

                    <Group grow w="100%" gap="md">
                        <Button
                            variant="outline"
                            color="gray"
                            radius="md"
                            leftSection={<IconDownload size={16} />}
                        >
                            Télécharger la facture
                        </Button>
                        <Button
                            component={Link}
                            href="/dashboard"
                            color="payfit.6"
                            radius="md"
                            rightSection={<IconArrowRight size={16} />}
                        >
                            Accéder au Dashboard
                        </Button>
                    </Group>

                    <Group gap="xs">
                        <IconMail size={16} color="var(--mantine-color-gray-5)" />
                        <Text size="xs" c="dimmed">Un email de confirmation a été envoyé à admin@techcorp.fr</Text>
                    </Group>
                </Stack>
            </Paper>
        </Container>
    )
}
