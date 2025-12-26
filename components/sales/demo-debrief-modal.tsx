"use client"

import { Modal, Stack, Button, Group, Text, Textarea } from "@mantine/core"
import { IconRocket, IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { notifications } from "@mantine/notifications"

interface DemoDebriefModalProps {
    leadId: string
    leadName: string
    opened: boolean
    onClose: () => void
    onSuccess: () => void
}

export function DemoDebriefModal({
    leadId,
    leadName,
    opened,
    onClose,
    onSuccess,
}: DemoDebriefModalProps) {
    const [debrief, setDebrief] = useState<string>("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async () => {
        if (!debrief.trim()) {
            notifications.show({
                title: "Erreur",
                message: "Veuillez saisir un compte-rendu de la démo",
                color: "red",
            })
            return
        }

        setSubmitting(true)
        try {
            const response = await fetch(`/api/sales/leads/${leadId}/demo/done`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ debrief: debrief.trim() }),
            })

            if (!response.ok) throw new Error("Erreur lors de l'enregistrement")

            notifications.show({
                title: "Démo marquée comme réalisée",
                message: "Le compte-rendu a été enregistré avec succès",
                color: "green",
                icon: <IconCheck size={18} />,
            })

            setDebrief("")
            onSuccess()
            onClose()
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Impossible d'enregistrer le compte-rendu",
                color: "red",
            })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Group gap="xs">
                    <IconRocket size={20} />
                    <Text fw={600}>Compte-rendu de la démo</Text>
                </Group>
            }
            size="md"
        >
            <Stack gap="md">
                <Text size="sm" c="dimmed">
                    Rédigez le compte-rendu de la démo avec <strong>{leadName}</strong>
                </Text>

                <Textarea
                    label="Compte-rendu"
                    placeholder="Points abordés, réactions du prospect, prochaines étapes, questions posées..."
                    value={debrief}
                    onChange={(e) => setDebrief(e.target.value)}
                    minRows={6}
                    required
                />

                <Group justify="flex-end" mt="md">
                    <Button variant="default" onClick={onClose} disabled={submitting}>
                        Annuler
                    </Button>
                    <Button
                        color="payfit.6"
                        onClick={handleSubmit}
                        loading={submitting}
                        disabled={!debrief.trim()}
                        leftSection={<IconCheck size={16} />}
                    >
                        Marquer comme réalisée
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}


