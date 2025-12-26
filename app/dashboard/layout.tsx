"use client"

import type { ReactNode } from "react"
import { AppShell } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Chatbot } from "@/components/chatbot"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 256,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      layout="alt"
    >
      <AppShell.Header>
        <DashboardHeader opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <DashboardSidebar />
      </AppShell.Navbar>

      <AppShell.Main bg="gray.0">
        {children}
        <Chatbot />
      </AppShell.Main>
    </AppShell>
  )
}
