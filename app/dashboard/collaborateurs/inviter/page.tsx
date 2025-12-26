"use client"

import { useState } from "react"
import {
    TextInput,
    Select,
    Button,
    Stack,
    Title,
    Text,
    Container,
    Paper,
    Group,
    rem,
    ThemeIcon,
    Box,
    ActionIcon,
    Divider,
    Badge,
    Avatar,
    Table,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import {
    IconUserPlus,
    IconCheck,
    IconMail,
    IconX,
    IconSend,
    IconShield,
    IconCircleCheck,
} from "@tabler/icons-react"
import Link from "next/link"

const mockInvitations = [
    { id: 1, email: "sophie.rh@techcorp.fr", role: "Responsable RH", status: "En attente", date: "Il y a 1h" },
    { id: 2, email: "compta@agence-ext.com", role: "Comptable", status: "En attente", date: "Il y a 3h" },
]

export default function InviterCollaborateur() {
    const [email, setEmail] = useState("")
    const [role, setRole] = useState<string | null>(null)
    const [invitations, setInvitations] = useState(mockInvitations)

    const handleSendInvite = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !role) return

        const newInvite = {
            id: Date.now(),
            email,
            role,
            status: "En attente",
            date: "À l'instant",
        }

        setInvitations([newInvite, ...invitations])
        setEmail("")
        setRole(null)

        notifications.show({
            title: "Invitation envoyée !",
            message: `Une invitation a été envoyée à ${email} avec le rôle ${role}.`,
            color: "payfit",
            icon: <IconSend size={18} />,
        })
    }

    return (
        <Container size="md" py="xl">
            <Stack gap="xl">
                <Group justify="space-between" align="center">
                    <Box>
                        <Title order={2} fw={800} lts={-0.5} mb="xs">Inviter des collaborateurs</Title>
                        <Text c="dimmed" size="sm">Ajoutez des membres à votre équipe et attribuez-leur des permissions spécifiques.</Text>
                    </Box>
                    <Button component={Link} href="/dashboard/collaborateurs" variant="subtle" color="gray">
                        Retour à la liste
                    </Button>
                </Group>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                    <Stack gap="lg">
                        <Paper shadow="sm" radius="md" p="xl" withBorder>
                            <Title order={3} size="h5" mb="lg">Nouvelle invitation</Title>
                            <form onSubmit={handleSendInvite}>
                                <Stack gap="md">
                                    <TextInput
                                        label="Email professionnel"
                                        placeholder="nom.prenom@entreprise.fr"
                                        required
                                        radius="md"
                                        leftSection={<IconMail size={16} color="var(--mantine-color-gray-5)" />}
                                        value={email}
                                        onChange={(e) => setEmail(e.currentTarget.value)}
                                    />
                                    <Select
                                        label="Rôle attribué"
                                        placeholder="Sélectionnez un rôle"
                                        required
                                        radius="md"
                                        data={[
                                            { value: 'Administrateur', label: 'Administrateur' },
                                            { value: 'Responsable RH', label: 'Responsable RH' },
                                            { value: 'Comptable', label: 'Comptable' },
                                            { value: 'Manager', label: 'Manager' },
                                        ]}
                                        leftSection={<IconShield size={16} color="var(--mantine-color-gray-5)" />}
                                        value={role}
                                        onChange={setRole}
                                    />
                                    <Button
                                        type="submit"
                                        color="payfit.6"
                                        fullWidth
                                        radius="md"
                                        mt="md"
                                        leftSection={<IconSend size={18} />}
                                    >
                                        Envoyer l'invitation
                                    </Button>
                                </Stack>
                            </form>
                        </Paper>

                        <Paper shadow="xs" radius="md" p="lg" withBorder bg="payfit.0">
                            <Group wrap="nowrap" align="flex-start">
                                <ThemeIcon color="payfit" variant="light" size="lg">
                                    <IconCircleCheck size={20} />
                                </ThemeIcon>
                                <Box>
                                    <Text fw={700} size="sm" c="payfit.9">Permissions prêtes</Text>
                                    <Text size="xs" c="payfit.8">
                                        L'utilisateur recevra un lien sécurisé pour créer son compte.
                                        Ses accès seront pré-configurés selon le rôle choisi.
                                    </Text>
                                </Box>
                            </Group>
                        </Paper>
                    </Stack>

                    <Paper shadow="sm" radius="md" p="xl" withBorder>
                        <Title order={3} size="h5" mb="lg">Invitations en attente</Title>
                        <Stack gap="md">
                            {invitations.length > 0 ? (
                                invitations.map((invite) => (
                                    <Box
                                        key={invite.id}
                                        p="sm"
                                        bg="gray.0"
                                        style={{ borderRadius: 8, border: '1px solid var(--mantine-color-gray-1)' }}
                                    >
                                        <Group justify="space-between">
                                            <Box>
                                                <Text fw={700} size="sm">{invite.email}</Text>
                                                <Group gap={6}>
                                                    <Badge color="gray" variant="light" size="xs">{invite.role}</Badge>
                                                    <Text size="xs" c="dimmed">Envoyé {invite.date}</Text>
                                                </Group>
                                            </Box>
                                            <ActionIcon variant="subtle" color="red" size="sm">
                                                <IconX size={14} />
                                            </ActionIcon>
                                        </Group>
                                    </Box>
                                ))
                            ) : (
                                <Text ta="center" c="dimmed" py="xl" size="sm">Aucune invitation en attente</Text>
                            )}
                        </Stack>
                    </Paper>
                </SimpleGrid>
            </Stack>
        </Container>
    )
}

import { SimpleGrid } from "@mantine/core"
