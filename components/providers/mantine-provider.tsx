"use client"

import { MantineProvider as BaseMantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { theme } from "@/lib/mantine-theme"

export function MantineProvider({ children }: { children: React.ReactNode }) {
    return (
        <BaseMantineProvider theme={theme} defaultColorScheme="light">
            <Notifications position="top-right" />
            {children}
        </BaseMantineProvider>
    )
}
