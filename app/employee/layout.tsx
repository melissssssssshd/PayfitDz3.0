"use client"

import type { ReactNode } from "react"
import { AppShell } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { EmployeeSidebar } from "@/components/employee/employee-sidebar"
import { EmployeeHeader } from "@/components/employee/employee-header"
import { Chatbot } from "@/components/chatbot"

export default function EmployeeLayout({ children }: { children: ReactNode }) {
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
        <EmployeeHeader opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar bg="white" withBorder={false} style={{ borderRight: '1px solid var(--mantine-color-gray-1)' }}>
        <EmployeeSidebar />
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          background: "var(--mantine-color-gray-0)",
        }}
        bg="gray.0"
      >
        {children}
        <Chatbot />
      </AppShell.Main>
    </AppShell>
  )
}
