"use client"

import { useState } from "react"
import { TextInput, SimpleGrid, Select, Button, Stack, Title, Text, Box } from "@mantine/core"
import { useRouter } from "next/navigation"
import { useForm } from "@mantine/form"

export default function CompanyOnboardingPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            siret: "",
            rc: "",
            address: "",
            sector: "",
            size: "",
        },
        validate: {
            siret: (value) => (value.length < 14 ? "SIRET invalide" : null),
            address: (value) => (value.length < 5 ? "Adresse requise" : null),
            sector: (value) => (value.length === 0 ? "Secteur requis" : null),
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true)
        // In a real app, update the tenant in the database here
        console.log("Saving company details:", values)

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))

        router.push("/onboarding/modules")
        setLoading(false)
    }

    return (
        <Stack gap="xl">
            <Box>
                <Title order={2} fw={800} mb={5}>Parlons de votre entreprise</Title>
                <Text c="dimmed" size="sm">Ces informations sont nécessaires pour la configuration légale de votre compte.</Text>
            </Box>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                    <SimpleGrid cols={2}>
                        <TextInput
                            label="Numéro SIRET"
                            placeholder="123 456 789 00012"
                            required
                            {...form.getInputProps("siret")}
                        />
                        <TextInput
                            label="Numéro RC"
                            placeholder="B 123 456 789"
                            {...form.getInputProps("rc")}
                        />
                    </SimpleGrid>

                    <TextInput
                        label="Adresse du siège social"
                        placeholder="12 rue de la Paie, 75000 Paris"
                        required
                        {...form.getInputProps("address")}
                    />

                    <SimpleGrid cols={2}>
                        <Select
                            label="Secteur d'activité"
                            placeholder="Choisir..."
                            required
                            data={["Technologie", "Services", "Commerce", "Industrie", "Santé", "Autre"]}
                            {...form.getInputProps("sector")}
                        />
                        <Select
                            label="Taille de l'entreprise"
                            placeholder="Choisir..."
                            required
                            data={["1-10", "11-50", "51-250", "250+"]}
                            {...form.getInputProps("size")}
                        />
                    </SimpleGrid>

                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        color="payfit"
                        radius="md"
                        mt="xl"
                        loading={loading}
                    >
                        Continuer
                    </Button>
                </Stack>
            </form>
        </Stack>
    )
}
