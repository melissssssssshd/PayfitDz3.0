"use client"

import { useDisclosure } from "@mantine/hooks"
import { CSSidebar } from "@/components/cs/cs-sidebar"
import { CSHeader } from "@/components/cs/cs-header"
import { AppShell } from "@mantine/core"

export default function CSLayout({
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
                <CSHeader opened={opened} toggle={toggle} />
            </AppShell.Header>

            <AppShell.Navbar>
                <CSSidebar />
            </AppShell.Navbar>

            <AppShell.Main style={{ backgroundColor: "#f5f5f5" }}>{children}</AppShell.Main>
        </AppShell>
    )
}
