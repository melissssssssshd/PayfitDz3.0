"use client"

import {
  Card,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Stack,
  Group,
  Box,
  ThemeIcon,
  Container,
  Anchor,
  rem,
} from "@mantine/core"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { notifications } from "@mantine/notifications"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        notifications.show({
          title: "Erreur de connexion",
          message: "Email ou mot de passe incorrect",
          color: "red",
        })
      } else {
        notifications.show({
          title: "Succès",
          message: "Connexion réussie",
          color: "green",
        })
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      notifications.show({
        title: "Erreur",
        message: "Une erreur inattendue est survenue",
        color: "red",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      bg="gray.0"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: rem(20)
      }}
    >
      <Container size={420} w="100%">
        <Card shadow="xl" p={40} radius="lg" withBorder>
          <Stack align="center" gap="xs" mb={30}>
            <ThemeIcon size={50} radius="md" color="payfit.6" variant="filled" mb="sm">
              <Text fw={800} size="xl">P</Text>
            </ThemeIcon>
            <Title order={2} ta="center" fw={800} c="dark.9">
              Bienvenue sur PayFit
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Connectez-vous pour accéder à votre espace sécurisé
            </Text>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="votre.email@entreprise.com"
                required
                radius="md"
                size="md"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <PasswordInput
                label="Mot de passe"
                placeholder="••••••••"
                required
                radius="md"
                size="md"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />

              <Group justify="space-between" mt="xs">
                <Checkbox label="Se souvenir de moi" color="payfit.6" radius="sm" />
                <Anchor component={Link} href="#" size="sm" c="payfit.6" fw={600}>
                  Mot de passe oublié ?
                </Anchor>
              </Group>

              <Button
                type="submit"
                fullWidth
                mt="xl"
                size="md"
                radius="md"
                color="payfit.6"
                loading={loading}
                style={{
                  boxShadow: '0 4px 12px rgba(45, 106, 79, 0.2)'
                }}
              >
                Se connecter
              </Button>
            </Stack>
          </form>

          <Text c="dimmed" size="sm" ta="center" mt="xl">
            Pas encore de compte ?{" "}
            <Anchor component={Link} href="/onboarding" size="sm" c="payfit.7" fw={700}>
              Créer un compte
            </Anchor>
          </Text>
        </Card>

        <Box mt="xl" ta="center">
          <Text size="xs" c="dimmed">
            © 2025 PayFit SAS. Tous droits réservés.
          </Text>
          <Group gap="xs" justify="center" mt={4}>
            <Anchor href="#" size="xs" c="dimmed">Mentions légales</Anchor>
            <Text size="xs" c="dimmed">•</Text>
            <Anchor href="#" size="xs" c="dimmed">Aide</Anchor>
          </Group>
        </Box>
      </Container>
    </Box>
  )
}
