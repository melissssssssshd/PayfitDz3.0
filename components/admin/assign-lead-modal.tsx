import { IconUserPlus, IconSelect } from "@tabler/icons-react"
import { Modal, Select, Button, Group, Text, Stack } from "@mantine/core"
import { useState } from "react"

// Add this component at the end of the file, before the StatsCard component

interface AssignLeadModalProps {
    opened: boolean
    onClose: () => void
    lead: any
    salesUsers: any[]
    onAssign: (leadId: string, salesUserId: string | null) => void
}

export function AssignLeadModal({ opened, onClose, lead, salesUsers, onAssign }: AssignLeadModalProps) {
    const [selectedSalesUser, setSelectedSalesUser] = useState<string | null>(
        lead?.assignedToId || null
    )

    const handleAssign = () => {
        if (lead) {
            onAssign(lead.id, selectedSalesUser)
        }
    }

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<Text fw={700} size="lg">Assigner le Lead</Text>}
            centered
        >
            <Stack gap="md">
                <Text size="sm">
                    Assigner <Text span fw={600}>{lead?.companyName}</Text> à un commercial
                </Text>

                <Select
                    label="Commercial"
                    placeholder="Sélectionner un commercial"
                    data={[
                        { value: "", label: "Non assigné" },
                        ...salesUsers.map(user => ({
                            value: user.id,
                            label: user.name || user.email,
                        }))
                    ]}
                    value={selectedSalesUser || ""}
                    onChange={(value) => setSelectedSalesUser(value || null)}
                    leftSection={<IconUserPlus size={16} />}
                />

                <Group justify="flex-end" mt="md">
                    <Button variant="light" color="gray" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button color="payfit" onClick={handleAssign}>
                        Assigner
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}
