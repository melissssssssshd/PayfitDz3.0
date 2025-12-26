"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavLink, ScrollArea, Box, Text } from "@mantine/core"
import {
    IconLayoutDashboard,
    IconUsers,
    IconRocket, // For Sandbox
    IconSettings,
} from "@tabler/icons-react"

const menuItems = [
    {
        title: "Tableau de bord",
        href: "/sales",
        icon: IconLayoutDashboard,
    },
    {
        title: "Mes Leads",
        href: "/sales/leads",
        icon: IconUsers,
    },
    {
        title: "Démo Sandbox",
        href: "/sales/sandbox",
        icon: IconRocket,
    },
    {
        title: "Paramètres",
        href: "/sales/settings",
        icon: IconSettings,
    },
]

export function SalesSidebar() {
    const pathname = usePathname()

    return (
        <ScrollArea h="100%">
            <Box p="md">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.href}
                        component={Link}
                        href={item.href}
                        label={
                            <Text fw={600} size="sm">
                                {item.title}
                            </Text>
                        }
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
                        }}
                    />
                ))}
            </Box>
        </ScrollArea>
    )
}
