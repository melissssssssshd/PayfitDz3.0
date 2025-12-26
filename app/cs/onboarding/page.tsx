"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
    Title,
    Text,
    Card,
    Stack,
    Stepper,
    Button,
    TextInput,
    NumberInput,
    Select,
    Group,
    Box,
    Textarea,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { IconCheck, IconBuilding, IconUsers, IconKey } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

const WILAYAS = [
    "Alger", "Oran", "Constantine", "Blida", "Annaba", "Sétif", "Batna", "Tlemcen",
    "Béjaïa", "Biskra", "Tizi Ouzou", "Mostaganem", "Sidi Bel Abbès", "Skikda"
]

export default function OnboardingPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const leadId = searchParams.get("leadId")

    const [active, setActive] = useState(0)
    const [loading, setLoading] = useState(false)
    const [lead, setLead] = useState<any>(null)

    const form = useForm({
        initialValues: {
            companyName: "",
            siret: "",
            rc: "",
            address: "",
            wilaya: "",
            sector: "",
            size: "",
            adminName: "",
            adminEmail: "",
            adminPassword: "",
        },
        validate: (values) => {
            if (active === 0) {
                return {
                    companyName: !values.companyName ? "Requis" : null,
                    siret: !values.siret ? "Requis" : null,
                    wilaya: !values.wilaya ? "Requis" : null,
                }
            }
            if (active === 2) {
                return {
                    adminEmail: !/^\\S+@\\S+$/.test(values.adminEmail) ? "Email invalide" : null,
                    adminPassword: values.adminPassword.length < 8 ? "Minimum 8 caractères" : null,
                }
            }
            return {}
        },
    })

    useEffect(() => {
        if (leadId) {
            fetch(`/api/admin/leads/${leadId}`)
                .then(res => res.json())
                .then(data => {
                    setLead(data)
                    form.setValues({
                        companyName: data.companyName || "",
                        wilaya: data.wilaya || "",
                        sector: data.sector || "",
                        size: data.employees ? `${data.employees}` : "",
                        adminName: `${data.firstName} ${data.lastName}`,
                        adminEmail: data.email || "",
                    })
                })
        }
    }, [leadId])

    const nextStep = () => {
        const validation = form.validate()
        if (!validation.hasErrors) {
            setActive((current) => (current < 3 ? current + 1 : current))
        }
    }

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/cs/onboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form.values,
                    leadId,
                }),
            })

            if (response.ok) {
                notifications.show({
                    title: "Client créé !",
                    message: "Le compte client a été provisionné avec succès.",
                    color: "payfit",
                    icon: <IconCheck size={18} />,
                })
                router.push("/cs")
            } else {
                throw new Error("Failed to onboard")
            }
        } catch (error) {
            notifications.show({
                title: "Erreur",
                message: "Impossible de créer le compte client.",
                color: "red",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Stack gap="xl" p="xl">
            <Box>
                <Title order={2} fw={800} c="dark.9">Onboarding Client</Title>
                <Text c="dimmed" size="sm">Créer un nouveau compte client PayFit</Text>
            </Box>

            <Card shadow="sm" radius="md" padding="xl" withBorder>
                <Stepper active={active} onStepClick={setActive} color="payfit">
                    <Stepper.Step label="Entreprise" description="Informations légales" icon={<IconBuilding size={18} />}>
                        <Stack gap="md" mt="xl">
                            <TextInput
                                label="Nom de l'entreprise"
                                placeholder="SARL Tech Solutions"
                                required
                                {...form.getInputProps("companyName")}
                            />
                            <Group grow>
                                <TextInput
                                    label="SIRET / NIF"
                                    placeholder="123456789012345"
                                    required
                                    {...form.getInputProps("siret")}
                                />
                                <TextInput
                                    label="Registre de Commerce"
                                    placeholder="RC 12/34567"
                                    {...form.getInputProps("rc")}
                                />
                            </Group>
                            <Textarea
                                label="Adresse"
                                placeholder="123 Rue de la Liberté, Alger"
                                {...form.getInputProps("address")}
                            />
                            <Group grow>
                                <Select
                                    label="Wilaya"
                                    placeholder="Sélectionner"
                                    data={WILAYAS}
                                    required
                                    {...form.getInputProps("wilaya")}
                                />
                                <TextInput
                                    label="Secteur d'activité"
                                    placeholder="Technologie"
                                    {...form.getInputProps("sector")}
                                />
                            </Group>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Employés" description="Configuration RH" icon={<IconUsers size={18} />}>
                        <Stack gap="md" mt="xl">
                            <NumberInput
                                label="Nombre d'employés"
                                placeholder="50"
                                min={1}
                                {...form.getInputProps("size")}
                            />
                            <Text size="sm" c="dimmed">
                                💡 L'import des employés se fera après la création du compte.
                            </Text>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Administrateur" description="Compte principal" icon={<IconKey size={18} />}>
                        <Stack gap="md" mt="xl">
                            <TextInput
                                label="Nom complet"
                                placeholder="Ahmed Benali"
                                required
                                {...form.getInputProps("adminName")}
                            />
                            <TextInput
                                label="Email"
                                placeholder="ahmed@entreprise.dz"
                                type="email"
                                required
                                {...form.getInputProps("adminEmail")}
                            />
                            <TextInput
                                label="Mot de passe temporaire"
                                placeholder="Minimum 8 caractères"
                                type="password"
                                required
                                {...form.getInputProps("adminPassword")}
                            />
                            <Text size="xs" c="dimmed">
                                Le client devra changer ce mot de passe à la première connexion.
                            </Text>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Completed>
                        <Stack gap="md" mt="xl" align="center">
                            <IconCheck size={64} color="var(--mantine-color-payfit-6)" />
                            <Title order={3}>Prêt à créer le compte !</Title>
                            <Text c="dimmed" ta="center">
                                Vérifiez les informations et cliquez sur "Créer le compte client"
                            </Text>
                        </Stack>
                    </Stepper.Completed>
                </Stepper>

                <Group justify="space-between" mt="xl">
                    <Button variant="default" onClick={prevStep} disabled={active === 0}>
                        Retour
                    </Button>
                    {active < 3 ? (
                        <Button onClick={nextStep} color="payfit">
                            Suivant
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} color="payfit" loading={loading}>
                            Créer le compte client
                        </Button>
                    )}
                </Group>
            </Card>
        </Stack>
    )
}
