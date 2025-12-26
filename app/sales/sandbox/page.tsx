"use client"

import { useState } from "react"
import {
    Title,
    Text,
    Card,
    Group,
    Stack,
    Table,
    Badge,
    Button,
    SimpleGrid,
    ThemeIcon,
    Box,
    Tabs,
    Avatar,
} from "@mantine/core"
import {
    IconUsers,
    IconCurrencyDollar,
    IconCalendar,
    IconFileText,
    IconCheck,
    IconAlertCircle,
} from "@tabler/icons-react"
import { formatCurrency } from "@/lib/utils"

// Dummy Algerian data for demonstration
const DUMMY_EMPLOYEES = [
    { id: 1, name: "Karim Benali", poste: "Directeur Général", salaire: 250000, wilaya: "Alger", matricule: "EMP001" },
    { id: 2, name: "Amina Meziane", poste: "Responsable RH", salaire: 180000, wilaya: "Alger", matricule: "EMP002" },
    { id: 3, name: "Youcef Hamidi", poste: "Développeur Senior", salaire: 150000, wilaya: "Oran", matricule: "EMP003" },
    { id: 4, name: "Samira Khelifi", poste: "Chef de Projet", salaire: 160000, wilaya: "Constantine", matricule: "EMP004" },
    { id: 5, name: "Mehdi Boudiaf", poste: "Commercial", salaire: 120000, wilaya: "Alger", matricule: "EMP005" },
    { id: 6, name: "Fatima Larbi", poste: "Comptable", salaire: 110000, wilaya: "Blida", matricule: "EMP006" },
    { id: 7, name: "Rachid Saadi", poste: "Technicien IT", salaire: 95000, wilaya: "Alger", matricule: "EMP007" },
    { id: 8, name: "Nadia Cherif", poste: "Assistante Administrative", salaire: 80000, wilaya: "Alger", matricule: "EMP008" },
]

const PAYROLL_DATA = {
    month: "Décembre 2024",
    totalGross: "1,345,000 DA",
    totalNet: "1,089,500 DA",
    cnasContribution: "255,500 DA",
    employeesCount: 8,
}

export default function SandboxPage() {
    const [activeTab, setActiveTab] = useState<string | null>("employees")

    return (
        <Stack gap="xl" p="xl">
            <Box>
                <Group justify="space-between" mb="xs">
                    <div>
                        <Title order={2} fw={800} c="dark.9">Environnement de Démonstration</Title>
                        <Text c="dimmed" size="sm">Simulateur PayFit avec données algériennes fictives</Text>
                    </div>
                    <Badge size="lg" variant="light" color="orange" leftSection={<IconAlertCircle size={16} />}>
                        MODE DÉMO
                    </Badge>
                </Group>
                <Text size="sm" c="blue.7" fw={500}>
                    💡 Cet environnement simule une entreprise algérienne type pour vos démonstrations commerciales.
                </Text>
            </Box>

            {/* Stats Overview */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
                <StatCard
                    title="Employés"
                    value={PAYROLL_DATA.employeesCount.toString()}
                    icon={IconUsers}
                    color="payfit"
                />
                <StatCard
                    title="Masse Salariale"
                    value={PAYROLL_DATA.totalGross}
                    icon={IconCurrencyDollar}
                    color="blue"
                />
                <StatCard
                    title="Cotisations CNAS"
                    value={PAYROLL_DATA.cnasContribution}
                    icon={IconFileText}
                    color="orange"
                />
                <StatCard
                    title="Paie du Mois"
                    value={PAYROLL_DATA.month}
                    icon={IconCalendar}
                    color="indigo"
                />
            </SimpleGrid>

            {/* Main Content */}
            <Tabs value={activeTab} onChange={setActiveTab} color="payfit">
                <Tabs.List>
                    <Tabs.Tab value="employees" leftSection={<IconUsers size={16} />}>
                        Employés
                    </Tabs.Tab>
                    <Tabs.Tab value="payroll" leftSection={<IconCurrencyDollar size={16} />}>
                        Paie
                    </Tabs.Tab>
                    <Tabs.Tab value="declarations" leftSection={<IconFileText size={16} />}>
                        Déclarations
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="employees" pt="lg">
                    <Card shadow="sm" radius="md" padding="lg" withBorder>
                        <Group justify="space-between" mb="md">
                            <Title order={4}>Liste des Employés</Title>
                            <Button size="xs" variant="light" color="payfit">
                                + Ajouter un employé
                            </Button>
                        </Group>
                        <Table highlightOnHover verticalSpacing="md">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Matricule</Table.Th>
                                    <Table.Th>Nom</Table.Th>
                                    <Table.Th>Poste</Table.Th>
                                    <Table.Th>Wilaya</Table.Th>
                                    <Table.Th>Salaire Brut</Table.Th>
                                    <Table.Th>Statut</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {DUMMY_EMPLOYEES.map((emp) => (
                                    <Table.Tr key={emp.id}>
                                        <Table.Td>
                                            <Text size="sm" fw={600} c="dimmed">{emp.matricule}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Group gap="sm">
                                                <Avatar color="payfit" radius="xl" size="sm">
                                                    {emp.name.split(" ").map(n => n[0]).join("")}
                                                </Avatar>
                                                <Text size="sm" fw={600}>{emp.name}</Text>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm">{emp.poste}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">{emp.wilaya}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" fw={600}>{formatCurrency(emp.salaire)}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge color="green" variant="light" size="sm">Actif</Badge>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Card>
                </Tabs.Panel>

                <Tabs.Panel value="payroll" pt="lg">
                    <Card shadow="sm" radius="md" padding="lg" withBorder>
                        <Title order={4} mb="md">Bulletin de Paie - {PAYROLL_DATA.month}</Title>
                        <Stack gap="md">
                            <Group justify="space-between" p="md" bg="gray.0" style={{ borderRadius: 8 }}>
                                <Text fw={600}>Total Salaires Bruts</Text>
                                <Text fw={800} size="lg" c="payfit.7">{PAYROLL_DATA.totalGross}</Text>
                            </Group>
                            <Group justify="space-between" p="md" bg="gray.0" style={{ borderRadius: 8 }}>
                                <Text fw={600}>Cotisations CNAS</Text>
                                <Text fw={800} size="lg" c="orange.7">{PAYROLL_DATA.cnasContribution}</Text>
                            </Group>
                            <Group justify="space-between" p="md" bg="payfit.0" style={{ borderRadius: 8 }}>
                                <Text fw={700} c="payfit.9">Total Net à Payer</Text>
                                <Text fw={900} size="xl" c="payfit.9">{PAYROLL_DATA.totalNet}</Text>
                            </Group>
                            <Button color="payfit" size="md" fullWidth mt="md" leftSection={<IconCheck size={18} />}>
                                Valider et Générer les Bulletins
                            </Button>
                        </Stack>
                    </Card>
                </Tabs.Panel>

                <Tabs.Panel value="declarations" pt="lg">
                    <Card shadow="sm" radius="md" padding="lg" withBorder>
                        <Title order={4} mb="md">Déclarations Sociales</Title>
                        <Stack gap="md">
                            <DeclarationItem
                                title="Déclaration CNAS - Décembre 2024"
                                status="À soumettre"
                                deadline="31 Décembre 2024"
                                color="orange"
                            />
                            <DeclarationItem
                                title="Déclaration CASNOS - Novembre 2024"
                                status="Soumise"
                                deadline="30 Novembre 2024"
                                color="green"
                            />
                            <DeclarationItem
                                title="G50 - Trimestre 4 2024"
                                status="En attente"
                                deadline="15 Janvier 2025"
                                color="blue"
                            />
                        </Stack>
                    </Card>
                </Tabs.Panel>
            </Tabs>
        </Stack>
    )
}

function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Group justify="space-between" mb="xs">
                <ThemeIcon color={color} variant="light" size="lg" radius="md">
                    <Icon size={20} />
                </ThemeIcon>
            </Group>
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">{title}</Text>
            <Text fw={800} size="xl" mt={4}>{value}</Text>
        </Card>
    )
}

function DeclarationItem({ title, status, deadline, color }: any) {
    return (
        <Group justify="space-between" p="md" bg="gray.0" style={{ borderRadius: 8 }}>
            <Box>
                <Text fw={600} size="sm">{title}</Text>
                <Text size="xs" c="dimmed">Échéance: {deadline}</Text>
            </Box>
            <Badge color={color} variant="light">{status}</Badge>
        </Group>
    )
}
