"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavLink, ScrollArea, Box, UnstyledButton, Text, Collapse, rem } from "@mantine/core"
import {
  IconLayoutDashboard,
  IconBuilding,
  IconUsers,
  IconActivity,
  IconCreditCard,
  IconSettings,
  IconAlertTriangle,
  IconChevronDown,
  IconChevronRight,
  IconBell,
  IconFileText,
  IconDatabase,
  IconShield,
  IconUserPlus,
} from "@tabler/icons-react"
import { useState } from "react"

const menuItems = [
  {
    title: "Tableau de bord",
    href: "/admin",
    icon: IconLayoutDashboard,
  },
  {
    title: "Gestion des Leads",
    href: "/admin/leads",
    icon: IconUserPlus,
  },
  {
    title: "Gestion des entreprises",
    icon: IconBuilding,
    children: [
      { title: "Toutes les entreprises", href: "/admin/entreprises" },
      { title: "Créer une entreprise", href: "/admin/entreprises/nouveau" },
      { title: "Imports massifs", href: "/admin/entreprises/import" },
      { title: "Statistiques", href: "/admin/entreprises/stats" },
    ],
  },
  {
    title: "Gestion des utilisateurs",
    icon: IconUsers,
    children: [
      { title: "Tous les utilisateurs", href: "/admin/utilisateurs" },
      { title: "Inviter un utilisateur", href: "/admin/utilisateurs/inviter" },
      { title: "Administrateurs", href: "/admin/utilisateurs/admins" },
      { title: "Gestionnaires RH", href: "/admin/utilisateurs/rh" },
      { title: "Employés", href: "/admin/utilisateurs/employes" },
      { title: "Rôles & Permissions", href: "/admin/utilisateurs/roles" },
    ],
  },
  {
    title: "Supervision",
    icon: IconActivity,
    children: [
      { title: "Activité système", href: "/admin/supervision/activite" },
      { title: "Performance", href: "/admin/supervision/performance" },
      { title: "Logs d'audit", href: "/admin/supervision/logs" },
      { title: "Métriques", href: "/admin/supervision/metriques" },
    ],
  },
  {
    title: "Facturation",
    icon: IconCreditCard,
    children: [
      { title: "Plans tarifaires", href: "/admin/facturation/plans" },
      { title: "Factures", href: "/admin/facturation/factures" },
      { title: "Paiements", href: "/admin/facturation/paiements" },
      { title: "Statistiques", href: "/admin/facturation/stats" },
    ],
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: IconBell,
  },
  {
    title: "Rapports",
    icon: IconFileText,
    children: [
      { title: "Rapports utilisateurs", href: "/admin/rapports/utilisateurs" },
      { title: "Rapports financiers", href: "/admin/rapports/financiers" },
      { title: "Rapports d'activité", href: "/admin/rapports/activite" },
    ],
  },
  {
    title: "Base de données",
    icon: IconDatabase,
    children: [
      { title: "Sauvegardes", href: "/admin/database/sauvegardes" },
      { title: "Migrations", href: "/admin/database/migrations" },
      { title: "Optimisation", href: "/admin/database/optimisation" },
    ],
  },
  {
    title: "Sécurité",
    icon: IconShield,
    children: [
      { title: "Logs de sécurité", href: "/admin/securite/logs" },
      { title: "Tentatives d'accès", href: "/admin/securite/acces" },
      { title: "Certificats SSL", href: "/admin/securite/ssl" },
    ],
  },
  {
    title: "Configuration",
    icon: IconSettings,
    children: [
      { title: "Paramètres globaux", href: "/admin/config/parametres" },
      { title: "Intégrations", href: "/admin/config/integrations" },
      { title: "Variables d'environnement", href: "/admin/config/env" },
      { title: "API Keys", href: "/admin/config/api-keys" },
    ],
  },
  {
    title: "Support",
    icon: IconAlertTriangle,
    children: [
      { title: "Tickets support", href: "/admin/support/tickets" },
      { title: "Alertes système", href: "/admin/support/alertes" },
      { title: "Maintenance", href: "/admin/support/maintenance" },
      { title: "Documentation", href: "/admin/support/docs" },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleItem = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <ScrollArea h="100%">
      <Box p="md">
        {menuItems.map((item) => (
          <Box key={item.title} mb="xs">
            {item.children ? (
              <>
                <UnstyledButton
                  onClick={() => toggleItem(item.title)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: expandedItems.includes(item.title) ? "var(--mantine-color-payfit-0)" : "transparent",
                    transition: 'background-color 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!expandedItems.includes(item.title)) {
                      e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!expandedItems.includes(item.title)) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <item.icon size={20} style={{ marginRight: 12 }} color="var(--mantine-color-payfit-6)" stroke={2} />
                  <Text size="sm" fw={600} style={{ flex: 1, color: "var(--mantine-color-dark-8)" }}>
                    {item.title}
                  </Text>
                  {expandedItems.includes(item.title) ? (
                    <IconChevronDown size={16} color="var(--mantine-color-gray-6)" />
                  ) : (
                    <IconChevronRight size={16} color="var(--mantine-color-gray-6)" />
                  )}
                </UnstyledButton>
                <Collapse in={expandedItems.includes(item.title)}>
                  <Box ml={32} mt="xs">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        component={Link}
                        href={child.href}
                        label={child.title}
                        active={pathname === child.href}
                        variant="filled"
                        color="payfit.6"
                        styles={{
                          root: {
                            borderRadius: "10px",
                            marginBottom: "4px",
                            paddingLeft: rem(12),
                            backgroundColor: pathname === child.href ? 'var(--mantine-color-payfit-6)' : 'transparent',
                            color: pathname === child.href ? 'white' : 'var(--mantine-color-gray-7)',
                          },
                          label: {
                            fontSize: "13px",
                            fontWeight: 600,
                            color: pathname === child.href ? 'white' : 'inherit',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Collapse>
              </>
            ) : (
              <NavLink
                component={Link}
                href={item.href!}
                label={item.title}
                leftSection={<item.icon size={20} stroke={2} color={pathname === item.href ? "white" : "var(--mantine-color-gray-5)"} />}
                active={pathname === item.href}
                variant="filled"
                color="payfit.6"
                styles={{
                  root: {
                    borderRadius: "12px",
                    marginBottom: "8px",
                    padding: '10px 16px',
                    backgroundColor: pathname === item.href ? 'var(--mantine-color-payfit-6)' : 'transparent',
                    color: pathname === item.href ? 'white' : 'var(--mantine-color-gray-6)',
                  },
                  label: {
                    fontWeight: 600,
                    fontSize: 15,
                    color: pathname === item.href ? 'white' : 'var(--mantine-color-gray-7)',
                  },
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </ScrollArea>
  )
}
