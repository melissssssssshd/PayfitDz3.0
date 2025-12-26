import {
    Drawer,
    Stack,
    Group,
    Text,
    Badge,
    Button,
    Tabs,
    Timeline,
    Textarea,
    Paper,
    Avatar,
    Select,
    ActionIcon,
    Divider,
} from "@mantine/core"
import {
    IconUser,
    IconBuilding,
    IconMail,
    IconPhone,
    IconMapPin,
    IconCalendar,
    IconNotes,
    IconHistory,
    IconX,
    IconSend,
    IconRocket,
    IconPlus,
    IconCheck,
    IconVideo,
    IconBrandWhatsapp,
} from "@tabler/icons-react"
import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import { LeadScoreBadge } from "./lead-score-badge"
import { ScheduleDemoModal } from "./schedule-demo-modal"
import { AddInteractionModal } from "./add-interaction-modal"
import { DemoDebriefModal } from "./demo-debrief-modal"
import { notifications } from "@mantine/notifications"

interface LeadDetailDrawerProps {
    lead: any
    opened: boolean
    onClose: () => void
    onStatusUpdate: (leadId: string, status: string) => void
    onRefresh: () => void
}

export function LeadDetailDrawer({
    lead,
    opened,
    onClose,
    onStatusUpdate,
    onRefresh,
}: LeadDetailDrawerProps) {
    const [activeTab, setActiveTab] = useState<string | null>("info")
    const [noteContent, setNoteContent] = useState("")
    const [submittingNote, setSubmittingNote] = useState(false)
    const [demoModalOpened, { open: openDemoModal, close: closeDemoModal }] = useDisclosure(false)
    const [interactionModalOpened, { open: openInteractionModal, close: closeInteractionModal }] = useDisclosure(false)
    const [debriefModalOpened, { open: openDebriefModal, close: closeDebriefModal }] = useDisclosure(false)

    if (!lead) return null

    const getStatusColor = (status: string) => {
        switch (status) {
            case "NEW":
                return "blue"
            case "CONTACTED":
                return "cyan"
            case "DEMO_SCHEDULED":
                return "orange"
            case "DEMO_DONE":
                return "grape"
            case "CLOSED":
                return "green"
            case "LOST":
                return "red"
            default:
                return "gray"
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "NEW":
                return "Nouveau"
            case "CONTACTED":
                return "Contacté"
            case "DEMO_SCHEDULED":
                return "Démo planifiée"
            case "DEMO_DONE":
                return "Démo effectuée"
            case "CLOSED":
                return "Fermé"
            case "LOST":
                return "Perdu"
            default:
                return status
        }
    }

    const handleAddNote = async () => {
        if (!noteContent.trim()) return

        setSubmittingNote(true)
        try {
            const response = await fetch(`/api/sales/leads/${lead.id}/notes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: noteContent }),
            })

            if (!response.ok) throw new Error("Erreur lors de l'ajout de la note")

            notifications.show({
                title: "Note ajoutée",
                message: "La note a été ajoutée avec succès",
                color: "green",
            })

            setNoteContent("")
            onRefresh()
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Impossible d'ajouter la note",
                color: "red",
            })
        } finally {
            setSubmittingNote(false)
        }
    }

    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            position="right"
            size="xl"
            title={
                <Group>
                    <Text fw={700} size="lg">
                        {lead.firstName} {lead.lastName}
                    </Text>
                    <Badge color={getStatusColor(lead.status)} variant="light">
                        {getStatusLabel(lead.status)}
                    </Badge>
                    {lead.score !== undefined && <LeadScoreBadge score={lead.score} />}
                </Group>
            }
        >
            <Stack gap="md">
                {/* Quick Actions */}
                <Group>
                    <Select
                        placeholder="Changer le statut"
                        data={[
                            { value: "NEW", label: "Nouveau" },
                            { value: "CONTACTED", label: "Contacté" },
                            { value: "DEMO_SCHEDULED", label: "Démo planifiée" },
                            { value: "DEMO_DONE", label: "Démo effectuée" },
                            { value: "CLOSED", label: "Fermé" },
                            { value: "LOST", label: "Perdu" },
                        ]}
                        value={lead.status}
                        onChange={(value) => value && onStatusUpdate(lead.id, value)}
                        style={{ flex: 1 }}
                    />
                    <Button
                        variant="light"
                        color="blue"
                        leftSection={<IconPlus size={16} />}
                        onClick={openInteractionModal}
                    >
                        Interaction
                    </Button>
                    {lead.status === "DEMO_SCHEDULED" && (
                        <Button
                            variant="light"
                            color="green"
                            leftSection={<IconCheck size={16} />}
                            onClick={openDebriefModal}
                        >
                            Démo réalisée
                        </Button>
                    )}
                    <Button
                        variant="light"
                        color="grape"
                        leftSection={<IconRocket size={16} />}
                        onClick={openDemoModal}
                    >
                        {lead.demoDate ? "Replanifier Démo" : "Planifier Démo"}
                    </Button>
                    <Button variant="light" onClick={onRefresh}>
                        Rafraîchir
                    </Button>
                </Group>

                <Divider />

                {/* Tabs */}
                <Tabs value={activeTab} onChange={setActiveTab}>
                    <Tabs.List>
                        <Tabs.Tab value="info" leftSection={<IconUser size={16} />}>
                            Informations
                        </Tabs.Tab>
                        <Tabs.Tab value="history" leftSection={<IconHistory size={16} />}>
                            Historique
                        </Tabs.Tab>
                        <Tabs.Tab value="notes" leftSection={<IconNotes size={16} />}>
                            Notes ({lead.notes?.length || 0})
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="info" pt="md">
                        <Stack gap="md">
                            <Paper p="md" withBorder>
                                <Stack gap="sm">
                                    <Group>
                                        <IconUser size={18} />
                                        <div>
                                            <Text size="xs" c="dimmed">
                                                Contact
                                            </Text>
                                            <Text fw={500}>
                                                {lead.firstName} {lead.lastName}
                                            </Text>
                                        </div>
                                    </Group>

                                    <Group>
                                        <IconBuilding size={18} />
                                        <div>
                                            <Text size="xs" c="dimmed">
                                                Entreprise
                                            </Text>
                                            <Text fw={500}>{lead.companyName}</Text>
                                        </div>
                                    </Group>

                                    <Group>
                                        <IconMail size={18} />
                                        <div>
                                            <Text size="xs" c="dimmed">
                                                Email
                                            </Text>
                                            <Text fw={500}>{lead.email}</Text>
                                        </div>
                                    </Group>

                                    <Group>
                                        <IconPhone size={18} />
                                        <div>
                                            <Text size="xs" c="dimmed">
                                                Téléphone
                                            </Text>
                                            <Text fw={500}>{lead.phone}</Text>
                                        </div>
                                    </Group>

                                    <Group>
                                        <IconMapPin size={18} />
                                        <div>
                                            <Text size="xs" c="dimmed">
                                                Wilaya
                                            </Text>
                                            <Text fw={500}>{lead.wilaya}</Text>
                                        </div>
                                    </Group>

                                    <Group>
                                        <IconBuilding size={18} />
                                        <div>
                                            <Text size="xs" c="dimmed">
                                                Nombre d'employés
                                            </Text>
                                            <Text fw={500}>{lead.employeeCount}</Text>
                                        </div>
                                    </Group>

                                    {lead.lastInteraction && (
                                        <Group>
                                            <IconCalendar size={18} />
                                            <div>
                                                <Text size="xs" c="dimmed">
                                                    Dernière interaction
                                                </Text>
                                                <Text fw={500}>
                                                    {new Date(lead.lastInteraction).toLocaleDateString("fr-FR")}
                                                </Text>
                                            </div>
                                        </Group>
                                    )}

                                    {lead.demoDate && (
                                        <>
                                            <Group>
                                                <IconCalendar size={18} />
                                                <div>
                                                    <Text size="xs" c="dimmed">
                                                        Date de démo
                                                    </Text>
                                                    <Text fw={500}>
                                                        {new Date(lead.demoDate).toLocaleString("fr-FR", {
                                                            dateStyle: "full",
                                                            timeStyle: "short",
                                                        })}
                                                    </Text>
                                                </div>
                                            </Group>
                                            {lead.metadata && typeof lead.metadata === 'object' && (lead.metadata as any).meetingLink && (
                                                <Group>
                                                    <IconVideo size={18} />
                                                    <div style={{ flex: 1 }}>
                                                        <Text size="xs" c="dimmed">
                                                            Lien de visio
                                                        </Text>
                                                        <Text
                                                            fw={500}
                                                            component="a"
                                                            href={(lead.metadata as any).meetingLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{ color: "var(--mantine-color-blue-6)", textDecoration: "underline" }}
                                                        >
                                                            {(lead.metadata as any).meetingLink}
                                                        </Text>
                                                    </div>
                                                </Group>
                                            )}
                                        </>
                                    )}
                                </Stack>
                            </Paper>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="history" pt="md">
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text fw={500} size="sm">
                                    Historique des interactions
                                </Text>
                                <Button
                                    size="xs"
                                    variant="light"
                                    leftSection={<IconPlus size={14} />}
                                    onClick={openInteractionModal}
                                >
                                    Ajouter
                                </Button>
                            </Group>
                            <Timeline active={-1} bulletSize={24} lineWidth={2}>
                                {lead.interactions && lead.interactions.length > 0 ? (
                                    lead.interactions.map((interaction: any) => {
                                        const getInteractionIcon = () => {
                                            switch (interaction.type) {
                                                case "CALL":
                                                    return <IconPhone size={12} />
                                                case "EMAIL":
                                                    return <IconMail size={12} />
                                                case "WHATSAPP":
                                                    return <IconBrandWhatsapp size={12} />
                                                case "VIDEO":
                                                case "DEMO":
                                                    return <IconVideo size={12} />
                                                default:
                                                    return <IconHistory size={12} />
                                            }
                                        }
                                        return (
                                            <Timeline.Item
                                                key={interaction.id}
                                                title={interaction.type}
                                                bullet={getInteractionIcon()}
                                            >
                                                <Text size="sm" mt={4} style={{ whiteSpace: "pre-wrap" }}>
                                                    {interaction.content}
                                                </Text>
                                                <Text size="xs" c="dimmed" mt={4}>
                                                    {new Date(interaction.createdAt).toLocaleString("fr-FR")} par{" "}
                                                    {interaction.author?.name || "Système"}
                                                </Text>
                                            </Timeline.Item>
                                        )
                                    })
                                ) : (
                                    <Text c="dimmed" size="sm">
                                        Aucune interaction enregistrée
                                    </Text>
                                )}
                            </Timeline>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="notes" pt="md">
                        <Stack gap="md">
                            {/* Add Note Form */}
                            <Paper p="md" withBorder>
                                <Stack gap="sm">
                                    <Text fw={500} size="sm">
                                        Ajouter une note
                                    </Text>
                                    <Textarea
                                        placeholder="Écrivez votre note ici..."
                                        value={noteContent}
                                        onChange={(e) => setNoteContent(e.target.value)}
                                        minRows={3}
                                    />
                                    <Group justify="flex-end">
                                        <Button
                                            leftSection={<IconSend size={16} />}
                                            onClick={handleAddNote}
                                            loading={submittingNote}
                                            disabled={!noteContent.trim()}
                                        >
                                            Ajouter
                                        </Button>
                                    </Group>
                                </Stack>
                            </Paper>

                            {/* Notes List */}
                            {lead.notes && lead.notes.length > 0 ? (
                                lead.notes.map((note: any) => (
                                    <Paper key={note.id} p="md" withBorder>
                                        <Group align="flex-start" mb="xs">
                                            <Avatar size="sm" radius="xl" color="blue">
                                                {note.author?.name?.charAt(0) || "?"}
                                            </Avatar>
                                            <div style={{ flex: 1 }}>
                                                <Text size="sm" fw={500}>
                                                    {note.author?.name || "Utilisateur"}
                                                </Text>
                                                <Text size="xs" c="dimmed">
                                                    {new Date(note.createdAt).toLocaleString("fr-FR")}
                                                </Text>
                                            </div>
                                        </Group>
                                        <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                                            {note.content}
                                        </Text>
                                    </Paper>
                                ))
                            ) : (
                                <Text c="dimmed" size="sm" ta="center" py="xl">
                                    Aucune note pour ce lead
                                </Text>
                            )}
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </Stack>

            {/* Schedule Demo Modal */}
            <ScheduleDemoModal
                leadId={lead.id}
                leadName={`${lead.firstName} ${lead.lastName}`}
                currentDemoDate={lead.demoDate}
                opened={demoModalOpened}
                onClose={closeDemoModal}
                onSuccess={onRefresh}
            />

            {/* Add Interaction Modal */}
            <AddInteractionModal
                leadId={lead.id}
                leadName={`${lead.firstName} ${lead.lastName}`}
                opened={interactionModalOpened}
                onClose={closeInteractionModal}
                onSuccess={onRefresh}
            />

            {/* Demo Debrief Modal */}
            <DemoDebriefModal
                leadId={lead.id}
                leadName={`${lead.firstName} ${lead.lastName}`}
                opened={debriefModalOpened}
                onClose={closeDebriefModal}
                onSuccess={onRefresh}
            />
        </Drawer>
    )
}
