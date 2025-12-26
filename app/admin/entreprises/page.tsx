"use client"

import {
  IconSearch,
  IconFilter,
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
  IconBuildingSkyscraper,
  IconUsers,
} from "@tabler/icons-react"
import {
  Button,
  TextInput,
  Badge,
  Table,
  Group,
  Stack,
  Title,
  Text,
  Card,
  ActionIcon,
  rem,
  Avatar,
  Box,
} from "@mantine/core"

export default function EntreprisesPage() {
  const companies = [
    {
      id: 784,
      name: "TechCorp",
      status: "Active",
      employees: 45,
      revenue: "€299",
      initials: "TC",
    },
    {
      id: 783,
      name: "GreenShop",
      status: "Active",
      employees: 12,
      revenue: "€99",
      initials: "GS",
    },
    {
      id: 782,
      name: "StartUpIO",
      status: "Trial",
      employees: 8,
      revenue: "€0",
      initials: "SI",
    },
    {
      id: 781,
      name: "LegacyCo",
      status: "Suspendu",
      employees: 0,
      revenue: "€0",
      initials: "LC",
    },
  ]

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} fw={800} c="dark.9">Gestion des entreprises</Title>
          <Text c="dimmed" size="sm">Gérez toutes les entreprises de la plateforme PayFit</Text>
        </div>
        <Button
          color="payfit.6"
          radius="md"
          leftSection={<IconPlus size={18} />}
        >
          Nouvelle entreprise
        </Button>
      </Group>

      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <Group mb="lg">
          <TextInput
            placeholder="Rechercher une entreprise..."
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
            style={{ flex: 1 }}
            radius="md"
          />
          <Button variant="light" color="gray" leftSection={<IconFilter size={16} />} radius="md">
            Filtres
          </Button>
        </Group>

        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Entreprise</Table.Th>
                <Table.Th>Statut</Table.Th>
                <Table.Th>Employés</Table.Th>
                <Table.Th>Abonnement</Table.Th>
                <Table.Th style={{ width: rem(120) }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {companies.map((company) => (
                <Table.Tr key={company.id}>
                  <Table.Td>
                    <Text size="xs" fw={700} c="dimmed">{company.id}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar color="payfit" radius="md" size="sm" variant="light">
                        {company.initials}
                      </Avatar>
                      <Text size="sm" fw={600}>{company.name}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="light"
                      color={
                        company.status === "Active"
                          ? "payfit"
                          : company.status === "Trial"
                            ? "blue"
                            : "red"
                      }
                      radius="sm"
                    >
                      {company.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      <IconUsers size={14} color="var(--mantine-color-gray-5)" />
                      <Text size="sm">{company.employees}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={700}>{company.revenue}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={0} justify="flex-end">
                      <ActionIcon variant="subtle" color="gray">
                        <IconEye size={16} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="blue">
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="red">
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>
    </Stack>
  )
}
