"use client"

import { useDisclosure } from "@mantine/hooks"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminChatbot } from "@/components/admin/admin-chatbot"
import { AppShell } from "@mantine/core"

export default function AdminLayout({
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
        <AdminHeader opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <AdminSidebar />
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: "#f5f5f5" }}>{children}</AppShell.Main>

      <AdminChatbot />
    </AppShell>
  )
}
