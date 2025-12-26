"use client"

import { Menu, Group, ActionIcon, Text, Box, Burger } from "@mantine/core"
import { IconBell, IconUser } from "@tabler/icons-react"
import { signOut } from "next-auth/react"

interface CSHeaderProps {
    opened: boolean
    toggle: () => void
}

export function CSHeader({ opened, toggle }: CSHeaderProps) {
    return (
        <Box px="md" h="100%">
            <Group h="100%" justify="space-between">
                <Group gap="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" />
                    <Group gap="sm">
                        <Box
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                backgroundColor: 'var(--mantine-color-payfit-6)',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: '0 4px 10px rgba(45, 106, 79, 0.2)'
                            }}
                        >
                            <Text c="white" fw={800} size="md">
                                CS
                            </Text>
                        </Box>
                        <Box visibleFrom="sm">
                            <Text c="payfit.7" size="lg" fw={800} style={{ letterSpacing: '-0.5px' }}>
                                PayFit Customer Success
                            </Text>
                            <Text c="dimmed" size="xs" fw={500}>
                                Onboarding & Support
                            </Text>
                        </Box>
                    </Group>
                </Group>

                <Group gap="xs">
                    <ActionIcon variant="subtle" color="gray" size="lg">
                        <IconBell size={20} />
                    </ActionIcon>

                    <Menu position="bottom-end">
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray" size="lg">
                                <IconUser size={20} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Mon compte</Menu.Label>
                            <Menu.Divider />
                            <Menu.Item
                                color="red"
                                onClick={() => signOut({ callbackUrl: "/login" })}
                            >
                                Déconnexion
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
        </Box>
    )
}
