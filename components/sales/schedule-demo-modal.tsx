"use client"

import { Modal, Stack, Button, Group, Text, TextInput, Select } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { IconCalendar, IconCheck, IconVideo } from "@tabler/icons-react"
import { useState } from "react"
import { notifications } from "@mantine/notifications"

interface ScheduleDemoModalProps {
    leadId: string
    leadName: string
    currentDemoDate?: Date | null
    opened: boolean
    onClose: () => void
    onSuccess: () => void
}

export function ScheduleDemoModal({
    leadId,
    leadName,
    currentDemoDate,
    opened,
    onClose,
    onSuccess,
}: ScheduleDemoModalProps) {
    const [demoDate, setDemoDate] = useState<Date | null>(
        currentDemoDate ? new Date(currentDemoDate) : null
    )
    const [meetingPlatform, setMeetingPlatform] = useState<string>("GOOGLE_MEET")
    const [meetingLink, setMeetingLink] = useState<string>("")
    const [submitting, setSubmitting] = useState(false)

    const handleScheduleDemo = async () => {
        if (!demoDate) {
            notifications.show({
                title: "Erreur",
                message: "Veuillez sélectionner une date et heure pour la démo",
                color: "red",
            })
            return
        }

        setSubmitting(true)
        try {
            const response = await fetch(`/api/sales/leads/${leadId}/demo`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    demoDate: demoDate.toISOString(),
                    meetingLink: meetingLink || undefined,
                }),
            })

            if (!response.ok) throw new Error("Erreur lors de la planification")

            notifications.show({
                title: "Démo planifiée",
                message: `La démo avec ${leadName} a été planifiée pour le ${demoDate.toLocaleString("fr-FR")}`,
                color: "green",
                icon: <IconCheck size={18} />,
            })

            onSuccess()
            onClose()
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Impossible de planifier la démo",
                color: "red",
            })
        } finally {
            setSubmitting(false)
        }
    }

    const handleCancelDemo = async () => {
        setSubmitting(true)
        try {
            const response = await fetch(`/api/sales/leads/${leadId}/demo`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Erreur lors de l'annulation")

            notifications.show({
                title: "Démo annulée",
                message: "La démo a été annulée avec succès",
                color: "blue",
            })

            onSuccess()
            onClose()
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Impossible d'annuler la démo",
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
                    <IconCalendar size={20} />
                    <Text fw={600}>
                        {currentDemoDate ? "Replanifier la démo" : "Planifier une démo"}
                    </Text>
                </Group>
            }
            size="md"
        >
            <Stack gap="md">
                <Text size="sm" c="dimmed">
                    Planifiez une démonstration du produit avec <strong>{leadName}</strong>
                </Text>

                <DateTimePicker
                    label="Date et heure de la démo"
                    placeholder="Sélectionner une date et heure"
                    value={demoDate}
                    onChange={setDemoDate}
                    minDate={new Date()}
                    clearable
                    valueFormat="DD/MM/YYYY HH:mm"
                />

                <Select
                    label="Plateforme de visio"
                    placeholder="Choisir une plateforme"
                    data={[
                        { value: "GOOGLE_MEET", label: "Google Meet" },
                        { value: "ZOOM", label: "Zoom" },
                        { value: "JITSI", label: "Jitsi Meet" },
                        { value: "OTHER", label: "Autre" },
                    ]}
                    value={meetingPlatform}
                    onChange={(value) => value && setMeetingPlatform(value)}
                    leftSection={<IconVideo size={16} />}
                />

                <TextInput
                    label="Lien de la visio (optionnel)"
                    placeholder="https://meet.google.com/xxx-xxxx-xxx ou lien Zoom/Jitsi"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    description="Collez le lien de la visio que vous avez créé"
                />

                {currentDemoDate && (
                    <Text size="xs" c="dimmed">
                        Démo actuellement planifiée :{" "}
                        <strong>{new Date(currentDemoDate).toLocaleString("fr-FR")}</strong>
                    </Text>
                )}

                <Group justify="flex-end" mt="md">
                    {currentDemoDate && (
                        <Button
                            variant="light"
                            color="red"
                            onClick={handleCancelDemo}
                            loading={submitting}
                        >
                            Annuler la démo
                        </Button>
                    )}
                    <Button variant="default" onClick={onClose} disabled={submitting}>
                        Fermer
                    </Button>
                    <Button
                        color="payfit.6"
                        onClick={handleScheduleDemo}
                        loading={submitting}
                        disabled={!demoDate}
                    >
                        {currentDemoDate ? "Replanifier" : "Planifier"}
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}
