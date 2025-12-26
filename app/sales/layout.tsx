"use client"

import { useDisclosure } from "@mantine/hooks"
import { SalesSidebar } from "@/components/sales/sales-sidebar"
import { SalesHeader } from "@/components/sales/sales-header"
import { AppShell } from "@mantine/core"

export default function SalesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [opened, { toggle }] = useDisclosure()

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 280,
                breakpoint: "lg",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <SalesHeader opened={opened} toggle={toggle} />
            </AppShell.Header>

            <AppShell.Navbar>
                <SalesSidebar />
            </AppShell.Navbar>

            <AppShell.Main style={{ backgroundColor: "#f5f5f5" }}>{children}</AppShell.Main>
        </AppShell>
    )
}
