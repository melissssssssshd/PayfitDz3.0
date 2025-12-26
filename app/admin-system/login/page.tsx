"use client"

import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Box,
    rem,
    ThemeIcon,
    Stack,
} from "@mantine/core"
import { IconShieldLock } from "@tabler/icons-react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            })

            if (res?.error) {
                setError("Identifiants incorrects ou accès refusé")
            } else {
                router.push("/admin-system/leads")
            }
        } catch (err) {
            setError("Une erreur est survenue")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            bg="dark.8"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'radial-gradient(circle at top right, rgba(46, 125, 50, 0.1), transparent)',
            }}
        >
            <Container size={420} my={40}>
                <Stack align="center" mb={30}>
                    <ThemeIcon size={60} radius="xl" color="payfit" variant="light">
                        <IconShieldLock size={32} />
                    </ThemeIcon>
                    <Title ta="center" c="white" fw={900} size={rem(32)}>
                        Admin <Text component="span" c="payfit.5" inherit>System</Text>
                    </Title>
                    <Text c="gray.5" size="sm" ta="center">
                        Accès réservé aux administrateurs de la plateforme
                    </Text>
                </Stack>

                <Paper withBorder shadow="md" p={30} radius="md" bg="dark.7">
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Email"
                            name="email"
                            placeholder="admin@system.com"
                            required
                            variant="filled"
                            c="gray.3"
                        />
                        <PasswordInput
                            label="Mot de passe"
                            name="password"
                            placeholder="Votre mot de passe"
                            required
                            mt="md"
                            variant="filled"
                            c="gray.3"
                        />

                        {error && (
                            <Text c="red" size="sm" mt="sm">{error}</Text>
                        )}

                        <Button type="submit" fullWidth mt="xl" color="payfit" radius="md" loading={loading}>
                            Se connecter
                        </Button>
                    </form>
                </Paper>

                <Text ta="center" mt="md" c="gray.6" size="xs">
                    © 2025 PayFit - Console d'administration
                </Text>
            </Container>
        </Box>
    )
}
