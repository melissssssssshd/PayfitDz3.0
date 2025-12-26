"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavLink, ScrollArea, Box, TextInput, Group, Text, Avatar, ThemeIcon, rem } from "@mantine/core"
import {
  IconLayoutDashboard,
  IconUsers,
  IconCircleCheck,
  IconCreditCard,
  IconClock,
  IconCurrencyEuro,
  IconUsersGroup,
  IconFileText,
  IconFileStack,
  IconDatabase,
  IconChevronDown,
  IconReceipt,
  IconMessage,
  IconCalendar,
  IconTrendingUp,
  IconBuilding,
  IconDownload,
  IconShield,
  IconSearch,
} from "@tabler/icons-react"

const navigation = [
  {
    title: "Les essentiels",
    items: [
      { name: "Tableau de bord", href: "/dashboard", icon: IconLayoutDashboard },
      { name: "Mes collaborateurs", href: "/dashboard/collaborateurs", icon: IconUsers },
      { name: "Calendrier des événements", href: "/dashboard/calendrier", icon: IconCalendar },
      { name: "Demandes à valider", href: "/dashboard/demandes", icon: IconCircleCheck, badge: "6" },
      { name: "Absences", href: "/dashboard/absences", icon: IconCalendar, badge: "8" },
      { name: "Notes de frais", href: "/dashboard/notes-frais", icon: IconReceipt, badge: "2" },
      { name: "Acomptes sur salaire", href: "/dashboard/acomptes", icon: IconCurrencyEuro, badge: "1" },
      { name: "Vérifier et clôturer la paie", href: "/dashboard/paie", icon: IconCreditCard },
      { name: "Préparer la paie", href: "/dashboard/preparer-paie", icon: IconFileText },
      { name: "Clôturer la paie", href: "/dashboard/cloturer-paie", icon: IconCircleCheck },
    ],
  },
  {
    title: "Au quotidien",
    items: [
      { name: "Absences et temps de travail", href: "/dashboard/temps-travail", icon: IconClock },
      { name: "Suivi du temps", href: "/dashboard/suivi-temps", icon: IconClock },
      { name: "Planning", href: "/dashboard/planning", icon: IconCalendar },
      { name: "Éléments de rémunération", href: "/dashboard/remuneration", icon: IconCurrencyEuro },
      { name: "Primes", href: "/dashboard/primes", icon: IconTrendingUp },
      { name: "Variables", href: "/dashboard/variables", icon: IconCurrencyEuro },
      { name: "Gestion de l'équipe", href: "/dashboard/equipe", icon: IconUsersGroup },
      { name: "Organigramme", href: "/dashboard/organigramme", icon: IconUsersGroup },
      { name: "Entretiens et objectifs", href: "/dashboard/entretiens", icon: IconFileText },
      { name: "Messagerie", href: "/dashboard/messages", icon: IconMessage, badge: "3" },
      { name: "Documents", href: "/dashboard/documents", icon: IconFileStack },
    ],
  },
  {
    title: "Ma structure",
    items: [
      { name: "Données et exports", href: "/dashboard/donnees", icon: IconDatabase },
      { name: "Établissements et objectifs", href: "/dashboard/etablissements", icon: IconBuilding },
      { name: "Documents", href: "/dashboard/docs-structure", icon: IconFileStack },
      { name: "Variables", href: "/dashboard/variables-structure", icon: IconCurrencyEuro },
      { name: "Exports", href: "/dashboard/exports", icon: IconDownload },
      { name: "Contrats", href: "/dashboard/contrats", icon: IconFileText },
      { name: "Modes de paiement", href: "/dashboard/paiements", icon: IconReceipt },
    ],
  },
  {
    title: "Administration",
    items: [{ name: "Rôles et Permissions", href: "/dashboard/roles", icon: IconShield }],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <>
      <Box p="lg" mb="md">
        <Group gap="sm">
          <ThemeIcon size={40} radius="md" color="payfit.6" variant="filled">
            <Text fw={700} size="sm">P</Text>
          </ThemeIcon>
          <Text size="xl" fw={800} c="dark.9" style={{ letterSpacing: '-0.5px' }}>
            PayFit
          </Text>
        </Group>
      </Box>

      <Box p="md">
        <TextInput
          placeholder="Rechercher..."
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
        />
      </Box>

      <ScrollArea style={{ flex: 1 }}>
        <Box px="md" pb="md">
          {navigation.map((section) => (
            <Box key={section.title} mb="xl">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs" px="xs">
                {section.title}
              </Text>
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <NavLink
                    key={item.name}
                    component={Link}
                    href={item.href}
                    label={item.name}
                    leftSection={<item.icon size={20} stroke={2} color={isActive ? "white" : "var(--mantine-color-gray-5)"} />}
                    rightSection={
                      item.badge ? (
                        <ThemeIcon size="xs" color="red" radius="xl" variant="filled">
                          <Text size="xs" fw={700}>{item.badge}</Text>
                        </ThemeIcon>
                      ) : undefined
                    }
                    active={isActive}
                    variant="filled"
                    color="payfit.6"
                    styles={{
                      root: {
                        borderRadius: 12,
                        marginBottom: 8,
                        fontWeight: 600,
                        padding: '10px 16px',
                        backgroundColor: isActive ? 'var(--mantine-color-payfit-6)' : 'transparent',
                        color: isActive ? 'white' : 'var(--mantine-color-gray-6)',
                        '&:hover': {
                          backgroundColor: isActive ? 'var(--mantine-color-payfit-7)' : 'var(--mantine-color-gray-0)',
                        }
                      },
                      label: {
                        fontSize: 15,
                        color: isActive ? 'white' : 'var(--mantine-color-gray-7)',
                      },
                    }}
                  />
                )
              })}
            </Box>
          ))}
        </Box>
      </ScrollArea>

      <Box p="md" style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}>
        <Group p="xs" style={{ borderRadius: 8 }} className="hover:bg-gray-50 cursor-pointer">
          <Avatar color="orange" radius="xl">
            Ac
          </Avatar>
          <Box style={{ flex: 1 }}>
            <Text size="sm" fw={500} c="dark.8">
              Acme Studio
            </Text>
            <Text size="xs" c="dimmed">
              18 collaborators
            </Text>
          </Box>
          <IconChevronDown size={16} style={{ color: "var(--mantine-color-gray-6)" }} />
        </Group>
      </Box>
    </>
  )
}
