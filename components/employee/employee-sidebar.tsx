"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavLink, ScrollArea, Box, Group, Text, ThemeIcon, Avatar, rem, Menu, UnstyledButton } from "@mantine/core"
import {
  IconLayoutDashboard,
  IconUsers,
  IconCalendar,
  IconFileText,
  IconClock,
  IconCurrencyEuro,
  IconBuilding,
  IconMessage,
  IconSettings,
  IconFolder,
  IconTarget,
  IconReceipt,
  IconBeach,
  IconChevronDown,
  IconLogout,
} from "@tabler/icons-react"
import { signOut } from "next-auth/react"

const navigation = [
  {
    title: "Tableau de Bord",
    items: [
      { name: "Accueil", href: "/employee", icon: IconLayoutDashboard },
      { name: "Calendrier", href: "/employee/calendrier", icon: IconCalendar },
    ],
  },
  {
    title: "Mes Activités",
    items: [
      { name: "Demandes", href: "/employee/demandes", icon: IconFileText, badge: "2" },
      { name: "Congés", href: "/employee/conges", icon: IconBeach },
      { name: "Temps de travail", href: "/employee/temps-travail", icon: IconClock },
      { name: "Notes de frais", href: "/employee/notes-frais", icon: IconReceipt },
      { name: "Entretiens", href: "/employee/entretiens", icon: IconTarget },
    ],
  },
  {
    title: "Mes Documents",
    items: [
      { name: "Bulletins de paie", href: "/employee/paie", icon: IconCurrencyEuro },
      { name: "Documents", href: "/employee/documents", icon: IconFolder },
    ],
  },
  {
    title: "Mon Organisation",
    items: [
      { name: "Mes collaborateurs", href: "/employee/collaborateurs", icon: IconUsers },
      { name: "Mon établissement", href: "/employee/etablissement", icon: IconBuilding },
      { name: "Messagerie", href: "/employee/messages", icon: IconMessage, badge: "3" },
    ],
  },
  {
    title: "Administration",
    items: [{ name: "Paramètres", href: "/employee/parametres", icon: IconSettings }],
  },
]

export function EmployeeSidebar() {
  const pathname = usePathname()

  return (
    <>
      <Box p="lg" mb="md">
        <Group gap="sm">
          <ThemeIcon size={40} radius="md" color="payfit.6" variant="filled">
            <IconLayoutDashboard size={24} />
          </ThemeIcon>
          <Text size="xl" fw={800} c="dark.9" style={{ letterSpacing: '-0.5px' }}>
            PayFit
          </Text>
        </Group>
      </Box>

      <ScrollArea style={{ flex: 1 }}>
        <Box px="md" py="md">
          {navigation.map((section) => (
            <Box key={section.title} mb="xl">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs" px="xs">
                {section.title}
              </Text>
              {section.items.map((item: any) => {
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
                    variant="filled"
                    active={isActive}
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
        <Menu position="top-start" shadow="md" width={200}>
          <Menu.Target>
            <UnstyledButton style={{ width: '100%' }}>
              <Group p="xs" style={{ borderRadius: 8 }} className="hover:bg-gray-50 cursor-pointer">
                <Avatar color="primary" radius="xl">
                  CD
                </Avatar>
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={500} c="dark.8">
                    Catherine Dupont
                  </Text>
                  <Text size="xs" c="dimmed">
                    Employée
                  </Text>
                </Box>
                <IconChevronDown size={16} style={{ color: "var(--mantine-color-gray-6)" }} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Mon Compte</Menu.Label>
            <Menu.Item leftSection={<IconSettings size={14} />}>Paramètres</Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={14} />}
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Déconnexion
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </>
  )
}
