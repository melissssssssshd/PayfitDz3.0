"use client"

import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Badge,
  TextInput,
  Switch,
  Tabs,
  Avatar,
  Box,
  rem,
  Divider,
} from "@mantine/core"
import {
  IconUser,
  IconLock,
  IconBell,
  IconWorld,
  IconFingerprint,
  IconShieldCheck,
  IconMail,
  IconDeviceMobile,
} from "@tabler/icons-react"

export default function ParametresPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Paramètres</Text>
          <Text size="sm" c="dimmed">Gérez vos préférences personnelles et la sécurité de votre compte</Text>
        </div>
      </Group>

      <Tabs defaultValue="account" color="payfit" variant="pills">
        <Tabs.List mb="xl">
          <Tabs.Tab value="account" leftSection={<IconUser size={16} />}>Compte</Tabs.Tab>
          <Tabs.Tab value="security" leftSection={<IconShieldCheck size={16} />}>Sécurité</Tabs.Tab>
          <Tabs.Tab value="notifications" leftSection={<IconBell size={16} />}>Notifications</Tabs.Tab>
          <Tabs.Tab value="preferences" leftSection={<IconWorld size={16} />}>Préférences</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="account">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <Card shadow="xs" radius="md" padding="lg" withBorder>
              <Text fw={700} mb="lg">Informations personnelles</Text>
              <Stack gap="md">
                <Group grow>
                  <TextInput label="Prénom" defaultValue="Catherine" radius="md" />
                  <TextInput label="Nom" defaultValue="Dupont" radius="md" />
                </Group>
                <TextInput label="Email professionnel" defaultValue="catherine.dupont@acmestudio.com" leftSection={<IconMail size={16} />} radius="md" />
                <TextInput label="Téléphone" defaultValue="+33 6 12 34 56 78" leftSection={<IconDeviceMobile size={16} />} radius="md" />
                <Button color="payfit" mt="md" radius="md">Enregistrer les modifications</Button>
              </Stack>
            </Card>

            <Card shadow="xs" radius="md" padding="lg" withBorder>
              <Text fw={700} mb="lg">Profil public</Text>
              <Group gap="xl">
                <Avatar size={100} radius="md" color="payfit">CD</Avatar>
                <Box>
                  <Text fw={700} size="lg">Catherine Dupont</Text>
                  <Text size="sm" c="dimmed">Designer UI/UX • Acme Studio</Text>
                  <Button variant="outline" color="gray" size="xs" mt="sm">Changer la photo</Button>
                </Box>
              </Group>
              <Divider my="lg" label="Ma bio" labelPosition="center" />
              <Text size="sm" c="dimmed">Passionnée par le design d'interface et l'expérience utilisateur chez Acme Studio depuis 2022.</Text>
            </Card>
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="security">
          <Card shadow="xs" radius="md" padding="lg" withBorder maw={600}>
            <Text fw={700} mb="lg">Sécurité du compte</Text>
            <Stack gap="md">
              <TextInput label="Mot de passe actuel" type="password" radius="md" />
              <TextInput label="Nouveau mot de passe" type="password" radius="md" />
              <TextInput label="Confirmer le nouveau mot de passe" type="password" radius="md" />
              <Divider label="Options avancées" my="sm" />
              <Group justify="space-between">
                <Box>
                  <Text size="sm" fw={600}>Double Authentification (2FA)</Text>
                  <Text size="xs" c="dimmed">Ajoutez une couche de sécurité supplémentaire à votre compte.</Text>
                </Box>
                <Switch color="payfit" />
              </Group>
              <Button color="payfit" mt="md" radius="md">Mettre à jour la sécurité</Button>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="notifications">
          <Card shadow="xs" radius="md" padding="lg" withBorder maw={600}>
            <Text fw={700} mb="lg">Préférences de notification</Text>
            <Stack gap="lg">
              <Group justify="space-between">
                <Box>
                  <Text size="sm" fw={600}>Notifications par email</Text>
                  <Text size="xs" c="dimmed">Recevoir un récapitulatif quotidien de vos activités.</Text>
                </Box>
                <Switch color="payfit" defaultChecked />
              </Group>
              <Group justify="space-between">
                <Box>
                  <Text size="sm" fw={600}>Alertes de paie</Text>
                  <Text size="xs" c="dimmed">Être notifié dès qu'un bulletin de salaire est disponible.</Text>
                </Box>
                <Switch color="payfit" defaultChecked />
              </Group>
              <Group justify="space-between">
                <Box>
                  <Text size="sm" fw={600}>Rappels de congés</Text>
                  <Text size="xs" c="dimmed">Recevoir des rappels pour vos demandes en attente.</Text>
                </Box>
                <Switch color="payfit" defaultChecked />
              </Group>
              <Group justify="space-between">
                <Box>
                  <Text size="sm" fw={600}>Messages en direct</Text>
                  <Text size="xs" c="dimmed">Notifications push pour les nouveaux messages.</Text>
                </Box>
                <Switch color="payfit" defaultChecked />
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="preferences">
          <Card shadow="xs" radius="md" padding="lg" withBorder maw={600}>
            <Text fw={700} mb="lg">Langue et Affichage</Text>
            <Stack gap="md">
              <TextInput label="Langue par défaut" defaultValue="Français (France)" radius="md" />
              <TextInput label="Fuseau horaire" defaultValue="Europe/Paris (GMT+1)" radius="md" />
              <Divider />
              <Group justify="space-between">
                <Box>
                  <Text size="sm" fw={600}>Mode Sombre</Text>
                  <Text size="xs" c="dimmed">Adapter l'interface pour un environnement peu éclairé.</Text>
                </Box>
                <Switch color="payfit" />
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  )
}
