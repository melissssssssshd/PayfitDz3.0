"use client"

import { useState } from "react"
import { Stack, Title, Text, Button, Group, TextInput, Select, ActionIcon, Box, rem, Divider } from "@mantine/core"
import { useRouter } from "next/navigation"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { useForm } from "@mantine/form"

export default function UsersOnboardingPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            invitations: [{ email: "", role: "manager" }],
        },
    })

    const addInvitation = () => {
        form.insertListItem("invitations", { email: "", role: "manager" })
    }

    const handleSubmit = async () => {
        setLoading(true)
        console.log("Sending invitations:", form.values.invitations)
        await new Promise(resolve => setTimeout(resolve, 800))
        router.push("/onboarding/subscription")
        setLoading(false)
    }

    const fields = form.values.invitations.map((item, index) => (
        <Group key={index} align="flex-end" mb="sm">
            <TextInput
                placeholder="exemple@entreprise.fr"
                label={index === 0 ? "Email de l'invité" : null}
                style={{ flex: 1 }}
                {...form.getInputProps(`invitations.${index}.email`)}
            />
            <Select
                placeholder="Rôle"
                label={index === 0 ? "Rôle" : null}
                style={{ width: rem(150) }}
                data={[
                    { value: "rh", label: "RH" },
                    { value: "manager", label: "Manager" },
                    { value: "comptable", label: "Comptable" },
                ]}
                {...form.getInputProps(`invitations.${index}.role`)}
            />
            {form.values.invitations.length > 1 && (
                <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem("invitations", index)} mb={5}>
                    <IconTrash size={16} />
                </ActionIcon>
            )}
        </Group>
    ))

    return (
        <Stack gap="xl">
            <Box>
                <Title order={2} fw={800} mb={5}>Invitez votre équipe</Title>
                <Text c="dimmed" size="sm">Ajoutez les personnes qui vous aideront à gérer la paie et les RH.</Text>
            </Box>

            <Box>
                {fields}
                <Button
                    variant="subtle"
                    color="payfit"
                    leftSection={<IconPlus size={16} />}
                    onClick={addInvitation}
                    mt="md"
                >
                    Ajouter un collaborateur
                </Button>
            </Box>

            <Divider />

            <Group justify="space-between" mt="xl">
                <Button variant="subtle" color="gray" onClick={() => router.back()}>Retour</Button>
                <Group>
                    <Button variant="outline" color="gray" onClick={handleSubmit}>Plus tard</Button>
                    <Button
                        color="payfit"
                        radius="md"
                        size="lg"
                        onClick={handleSubmit}
                        loading={loading}
                    >
                        Envoyer les invitations
                    </Button>
                </Group>
            </Group>
        </Stack>
    )
}
