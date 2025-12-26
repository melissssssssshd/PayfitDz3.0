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
  Box,
  rem,
  ActionIcon,
  Divider,
} from "@mantine/core"
import {
  IconSearch,
  IconFilter,
  IconDownload,
  IconFileText,
  IconUpload,
  IconCalendar,
  IconDotsVertical,
  IconFileTypePdf,
} from "@tabler/icons-react"

const documents = [
  {
    id: 1,
    name: "Contrat de travail CDI",
    category: "Contrat",
    date: "15 janv. 2022",
    size: "256 KB",
    type: "PDF",
  },
  {
    id: 2,
    name: "Attestation employeur",
    category: "Administratif",
    date: "10 déc. 2024",
    size: "128 KB",
    type: "PDF",
  },
  {
    id: 3,
    name: "Certificat de travail",
    category: "Attestation",
    date: "05 nov. 2024",
    size: "98 KB",
    type: "PDF",
  },
  {
    id: 4,
    name: "Mutuelle d'entreprise",
    category: "Avantages",
    date: "01 sept. 2024",
    size: "512 KB",
    type: "PDF",
  },
]

export default function DocumentsPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Mes documents</Text>
          <Text size="sm" c="dimmed">Consultez et gérez vos documents administratifs sécurisés</Text>
        </div>
        <Button
          variant="filled"
          color="payfit"
          leftSection={<IconUpload size={16} />}
          radius="md"
        >
          Ajouter un document
        </Button>
      </Group>

      {/* Search and Filters */}
      <Card shadow="xs" radius="md" padding="md" withBorder>
        <Group>
          <TextInput
            placeholder="Rechercher par nom, catégorie..."
            leftSection={<IconSearch size={18} stroke={1.5} />}
            style={{ flex: 1 }}
            radius="md"
          />
          <Button variant="light" color="gray" leftSection={<IconFilter size={16} />} radius="md">
            Filtrer
          </Button>
        </Group>
      </Card>

      {/* Quick Access Folders/Stats maybe? Let's just do the list with nice UI */}
      <div>
        <Group justify="space-between" mb="md">
          <Text fw={700} size="lg">Tous les documents</Text>
          <Text size="xs" c="dimmed">{documents.length} fichiers au total</Text>
        </Group>

        <Stack gap="sm">
          {documents.map((doc) => (
            <Card key={doc.id} shadow="xs" radius="md" padding="md" withBorder className="hover:bg-gray-50 transition-colors cursor-pointer">
              <Group justify="space-between">
                <Group gap="md">
                  <ThemeIcon color="red.1" c="red.6" size={48} radius="md">
                    <IconFileTypePdf size={24} />
                  </ThemeIcon>
                  <div>
                    <Text fw={700} size="md" c="dark.8">{doc.name}</Text>
                    <Group gap={8} mt={4}>
                      <Badge size="xs" color="payfit" variant="light">{doc.category}</Badge>
                      <Text size="xs" c="dimmed">•</Text>
                      <Group gap={4}>
                        <IconCalendar size={12} color="var(--mantine-color-gray-5)" />
                        <Text size="xs" c="dimmed">{doc.date}</Text>
                      </Group>
                      <Text size="xs" c="dimmed">•</Text>
                      <Text size="xs" c="dimmed">{doc.size}</Text>
                    </Group>
                  </div>
                </Group>

                <Group gap="sm">
                  <Button variant="light" color="payfit" size="xs" radius="md" leftSection={<IconDownload size={14} />}>
                    Télécharger
                  </Button>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      </div>

      {/* Extra info card */}
      <Card shadow="sm" radius="md" padding="lg" withBorder bg="blue.0" mt="xl">
        <Group gap="md">
          <ThemeIcon color="blue.6" size="xl" radius="md">
            <IconFileText size={24} />
          </ThemeIcon>
          <Box style={{ flex: 1 }}>
            <Text fw={700} size="md" c="blue.9">Stockage sécurisé</Text>
            <Text size="sm" c="blue.8">Tous vos documents sont chiffrés et stockés conformément aux normes de sécurité en vigueur.</Text>
          </Box>
          <Button variant="white" color="blue" size="xs" radius="md">En savoir plus</Button>
        </Group>
      </Card>
    </Stack>
  )
}
