"use client"

import {
  Card,
  Text,
  Group,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Badge,
  Avatar,
  Box,
  rem,
  Divider,
} from "@mantine/core"
import {
  IconBuildingSkyscraper,
  IconMapPin,
  IconPhone,
  IconMail,
  IconUsers,
  IconCalendar,
  IconWorld,
  IconFingerprint,
  IconScale,
  IconHeadset,
} from "@tabler/icons-react"

export default function EtablissementPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Mon établissement</Text>
          <Text size="sm" c="dimmed">Informations officielles et contacts de votre entreprise</Text>
        </div>
        <Badge variant="dot" color="payfit" size="lg">Active depuis 4 ans</Badge>
      </Group>

      {/* Main Company Profile Card */}
      <Card shadow="sm" radius="md" padding="xl" withBorder>
        <Group align="flex-start" gap="xl">
          <ThemeIcon size={80} radius="md" color="payfit.7">
            <IconBuildingSkyscraper size={48} />
          </ThemeIcon>
          <Box style={{ flex: 1 }}>
            <Text size="2rem" fw={800} c="dark.9">Acme Studio</Text>
            <Text size="sm" c="payfit.7" fw={600}>Agence de Design & Développement Web</Text>

            <Group gap="xl" mt="xl">
              <Box>
                <Text size="xs" c="dimmed" fw={600} tt="uppercase">Effectif</Text>
                <Group gap={4}>
                  <IconUsers size={16} color="var(--mantine-color-payfit-6)" />
                  <Text fw={700}>25 collaborateurs</Text>
                </Group>
              </Box>
              <Box>
                <Text size="xs" c="dimmed" fw={600} tt="uppercase">Localisation</Text>
                <Group gap={4}>
                  <IconMapPin size={16} color="var(--mantine-color-payfit-6)" />
                  <Text fw={700}>Paris, France</Text>
                </Group>
              </Box>
              <Box>
                <Text size="xs" c="dimmed" fw={600} tt="uppercase">Date de création</Text>
                <Group gap={4}>
                  <IconCalendar size={16} color="var(--mantine-color-payfit-6)" />
                  <Text fw={700}>15 Janvier 2020</Text>
                </Group>
              </Box>
            </Group>
          </Box>
        </Group>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        {/* Contact Info */}
        <Card shadow="sm" radius="md" padding="lg" withBorder>
          <Text fw={700} size="lg" mb="lg">Coordonnées</Text>
          <Stack gap="md">
            <Group gap="md">
              <ThemeIcon variant="light" color="gray" size="lg" radius="md">
                <IconMapPin size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" fw={600}>Adresse du siège</Text>
                <Text size="sm" c="dimmed">123 Avenue des Champs-Élysées, 75008 Paris</Text>
              </div>
            </Group>
            <Group gap="md">
              <ThemeIcon variant="light" color="gray" size="lg" radius="md">
                <IconPhone size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" fw={600}>Téléphone</Text>
                <Text size="sm" c="dimmed">+33 1 23 45 67 89</Text>
              </div>
            </Group>
            <Group gap="md">
              <ThemeIcon variant="light" color="gray" size="lg" radius="md">
                <IconMail size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" fw={600}>Email général</Text>
                <Text size="sm" c="dimmed">contact@acmestudio.com</Text>
              </div>
            </Group>
            <Group gap="md">
              <ThemeIcon variant="light" color="gray" size="lg" radius="md">
                <IconWorld size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" fw={600}>Site internet</Text>
                <Text size="sm" c="dimmed">www.acmestudio.com</Text>
              </div>
            </Group>
          </Stack>
        </Card>

        {/* Legal & HR Info */}
        <Stack gap="lg">
          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Group gap="sm" mb="md">
              <IconScale size={20} color="var(--mantine-color-payfit-6)" />
              <Text fw={700} size="lg">Informations légales</Text>
            </Group>
            <SimpleGrid cols={2}>
              <Box>
                <Text size="xs" c="dimmed">SIRET</Text>
                <Text size="sm" fw={700}>123 456 789 00012</Text>
              </Box>
              <Box>
                <Text size="xs" c="dimmed">Code APE</Text>
                <Text size="sm" fw={700}>6201Z</Text>
              </Box>
              <Box mt="sm">
                <Text size="xs" c="dimmed">Forme juridique</Text>
                <Text size="sm" fw={700}>SAS</Text>
              </Box>
              <Box mt="sm">
                <Text size="xs" c="dimmed">TVA Intra</Text>
                <Text size="sm" fw={700}>FR 12 123456789</Text>
              </Box>
            </SimpleGrid>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
            <Group gap="sm" mb="md">
              <IconHeadset size={20} color="var(--mantine-color-payfit-6)" />
              <Text fw={700} size="lg" c="payfit.9">Contact RH</Text>
            </Group>
            <Group gap="md">
              <Avatar size="md" radius="xl" color="payfit">ED</Avatar>
              <Box>
                <Text fw={700} size="sm">Emma Dupont</Text>
                <Text size="xs" c="payfit.7">Responsable Ressources Humaines</Text>
              </Box>
            </Group>
            <Stack gap={4} mt="md">
              <Text size="xs" c="payfit.8"><b>Email :</b> emma.dupont@acmestudio.com</Text>
              <Text size="xs" c="payfit.8"><b>Tél :</b> +33 6 12 34 56 78</Text>
            </Stack>
          </Card>
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}
