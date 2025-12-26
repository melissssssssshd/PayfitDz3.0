"use client"

import { useState } from "react"
import {
    Stepper,
    Button,
    Group,
    TextInput,
    Stack,
    Title,
    Text,
    Container,
    Paper,
    SimpleGrid,
    MultiSelect,
    rem,
    ThemeIcon,
    Box,
    Divider,
    Badge,
} from "@mantine/core"
import {
    IconBuildingSkyscraper,
    IconCheck,
    IconArrowRight,
    IconArrowLeft,
    IconUsers,
    IconSettings,
    IconConfetti,
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function OnboardingWizard() {
    const router = useRouter()
    const [active, setActive] = useState(0)
    const [formData, setFormData] = useState({
        companyName: "TechCorp SAS",
        siret: "",
        address: "",
        employees: "",
        modules: [],
        adminEmail: "admin@techcorp.fr",
    })

    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current))
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

    const handleFinish = () => {
        router.push("/app/admin/entreprises")
    }

    return (
        <Container size="md" py="xl">
            <Stack gap="xl">
                <Box>
                    <Title order={1} fw={800} lts={-0.5} mb="xs">Configuration de votre entreprise</Title>
                    <Text c="dimmed">Complétez ces étapes pour préparer votre environnement PayFit.</Text>
                </Box>

                <Stepper active={active} onStepClick={setActive} color="payfit">
                    <Stepper.Step
                        label="Profil Entreprise"
                        description="Informations légales"
                        icon={<IconBuildingSkyscraper size={18} />}
                    >
                        <Stack gap="md" mt="xl">
                            <SimpleGrid cols={2}>
                                <TextInput label="Nom de l'entreprise" value={formData.companyName} radius="md" readOnly />
                                <TextInput
                                    label="Numéro SIRET"
                                    placeholder="854 623 983 00023"
                                    radius="md"
                                    value={formData.siret}
                                    onChange={(e) => setFormData({ ...formData, siret: e.currentTarget.value })}
                                />
                            </SimpleGrid>
                            <TextInput
                                label="Adresse du siège social"
                                placeholder="12 bis rue de la Paie, 75001 Paris"
                                radius="md"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.currentTarget.value })}
                            />
                            <TextInput
                                label="Effectif estimé"
                                placeholder="Ex: 45"
                                radius="md"
                                value={formData.employees}
                                onChange={(e) => setFormData({ ...formData, employees: e.currentTarget.value })}
                            />
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step
                        label="Modules"
                        description="Personnalisation"
                        icon={<IconSettings size={18} />}
                    >
                        <Stack gap="md" mt="xl">
                            <Text fw={700}>Quels modules souhaitez-vous activer ?</Text>
                            <MultiSelect
                                label="Sélectionnez vos modules"
                                placeholder="Choisissez..."
                                data={[
                                    { value: 'paie', label: 'Gestion de la Paie' },
                                    { value: 'absences', label: 'Congés & Absences' },
                                    { value: 'frais', label: 'Notes de Frais' },
                                    { value: 'temps', label: 'Temps & Activité' },
                                    { value: 'entretiens', label: 'Entretiens individuels' },
                                ]}
                                radius="md"
                                searchable
                            />
                            <Text size="xs" c="dimmed">Vous pourrez modifier ces choix plus tard dans vos paramètres.</Text>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step
                        label="Configuration Admin"
                        description="Accès principal"
                        icon={<IconUsers size={18} />}
                    >
                        <Stack gap="md" mt="xl">
                            <Text fw={700}>Vérifiez l'administrateur principal</Text>
                            <Paper withBorder p="md" radius="md" bg="gray.0">
                                <Group justify="space-between">
                                    <Box>
                                        <Text fw={700} size="sm">Admin Principal</Text>
                                        <Text size="xs" c="dimmed">{formData.adminEmail}</Text>
                                    </Box>
                                    <Badge color="payfit" variant="light">Propriétaire</Badge>
                                </Group>
                            </Paper>
                            <TextInput label="Email de secours (optionnel)" placeholder="contact@techcorp.fr" radius="md" />
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Completed>
                        <Stack align="center" gap="md" mt="xl" py="xl">
                            <ThemeIcon size={80} radius={100} color="payfit" variant="light">
                                <IconConfetti size={48} />
                            </ThemeIcon>
                            <Title order={2}>Félicitations !</Title>
                            <Text ta="center" c="dimmed" maw={500}>
                                Le profil de <b>TechCorp SAS</b> est désormais complet.
                                Vous allez être redirigé vers votre tableau de bord pour inviter vos premiers collaborateurs.
                            </Text>
                        </Stack>
                    </Stepper.Completed>
                </Stepper>

                <Divider my="md" />

                <Group justify="flex-end">
                    {active !== 0 && active < 3 && (
                        <Button variant="default" onClick={prevStep} leftSection={<IconArrowLeft size={16} />}>
                            Précédent
                        </Button>
                    )}
                    {active < 3 ? (
                        <Button color="payfit" onClick={nextStep} rightSection={<IconArrowRight size={16} />}>
                            Suivant
                        </Button>
                    ) : (
                        <Button color="payfit" onClick={handleFinish} leftSection={<IconCheck size={16} />}>
                            Terminer & Accéder au dashboard
                        </Button>
                    )}
                </Group>
            </Stack>
        </Container>
    )
}
