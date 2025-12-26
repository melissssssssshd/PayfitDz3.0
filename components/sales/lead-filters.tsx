import { Paper, TextInput, Select, Group, Button, NumberInput } from "@mantine/core"
import { IconSearch, IconFilter, IconX } from "@tabler/icons-react"

interface LeadFiltersProps {
    filters: {
        status: string
        wilaya: string
        minScore: number | null
        maxScore: number | null
        search: string
    }
    onFilterChange: (key: string, value: any) => void
    onClearFilters: () => void
}

const WILAYAS = [
    "Alger", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Sétif", "Tlemcen",
    "Béjaïa", "Biskra", "Tébessa", "Tiaret", "Djelfa", "Jijel", "Sidi Bel Abbès",
    "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Bordj Bou Arreridj", "Boumerdès",
    "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras",
    "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane",
    "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", "In Salah",
    "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"
]

export function LeadFilters({ filters, onFilterChange, onClearFilters }: LeadFiltersProps) {
    return (
        <Paper p="md" radius="md" withBorder>
            <Group gap="md" align="flex-end">
                <TextInput
                    placeholder="Rechercher par nom, entreprise, email..."
                    leftSection={<IconSearch size={16} />}
                    value={filters.search}
                    onChange={(e) => onFilterChange("search", e.target.value)}
                    style={{ flex: 1 }}
                />

                <Select
                    placeholder="Statut"
                    data={[
                        { value: "ALL", label: "Tous les statuts" },
                        { value: "NEW", label: "Nouveau" },
                        { value: "CONTACTED", label: "Contacté" },
                        { value: "DEMO_DONE", label: "Démo effectuée" },
                        { value: "CLOSED", label: "Fermé" },
                    ]}
                    value={filters.status}
                    onChange={(value) => onFilterChange("status", value || "ALL")}
                    clearable
                    style={{ minWidth: 180 }}
                />

                <Select
                    placeholder="Wilaya"
                    data={WILAYAS.map(w => ({ value: w, label: w }))}
                    value={filters.wilaya}
                    onChange={(value) => onFilterChange("wilaya", value || "")}
                    clearable
                    searchable
                    style={{ minWidth: 180 }}
                />

                <NumberInput
                    placeholder="Score min"
                    min={0}
                    max={100}
                    value={filters.minScore ?? undefined}
                    onChange={(value) => onFilterChange("minScore", value)}
                    style={{ width: 120 }}
                />

                <NumberInput
                    placeholder="Score max"
                    min={0}
                    max={100}
                    value={filters.maxScore ?? undefined}
                    onChange={(value) => onFilterChange("maxScore", value)}
                    style={{ width: 120 }}
                />

                <Button
                    variant="light"
                    color="gray"
                    leftSection={<IconX size={16} />}
                    onClick={onClearFilters}
                >
                    Réinitialiser
                </Button>
            </Group>
        </Paper>
    )
}
