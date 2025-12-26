"use client"

import { useState } from "react"
import {
  IconBell,
  IconX,
  IconCheck,
  IconClock,
  IconAlertCircle,
  IconUserCheck,
  IconFileText,
  IconCalendar,
} from "@tabler/icons-react"
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Indicator,
  Paper,
  Popover,
  ScrollArea,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core"

interface Notification {
  id: string
  type: "info" | "warning" | "success" | "error"
  title: string
  message: string
  time: string
  read: boolean
  icon: "check" | "clock" | "alert" | "user" | "file" | "calendar"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Demande en attente",
    message: "Emma Lambert a demandé un congé payé du 15 au 20 juillet",
    time: "Il y a 2h",
    read: false,
    icon: "clock",
  },
  {
    id: "2",
    type: "success",
    title: "Note de frais approuvée",
    message: "Votre note de frais de 156€ a été approuvée",
    time: "Il y a 5h",
    read: false,
    icon: "check",
  },
  {
    id: "3",
    type: "info",
    title: "Bulletin de paie disponible",
    message: "Votre bulletin de février 2024 est disponible",
    time: "Il y a 1j",
    read: true,
    icon: "file",
  },
  {
    id: "4",
    type: "warning",
    title: "Entretien annuel",
    message: "N'oubliez pas votre entretien avec Thomas demain à 14h",
    time: "Il y a 1j",
    read: true,
    icon: "calendar",
  },
]

const iconMap = {
  check: IconCheck,
  clock: IconClock,
  alert: IconAlertCircle,
  user: IconUserCheck,
  file: IconFileText,
  calendar: IconCalendar,
}

const colorMap = {
  info: "blue",
  warning: "yellow",
  success: "green",
  error: "red",
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <Popover width={380} position="bottom-end" shadow="md" withArrow>
      <Popover.Target>
        <Indicator disabled={unreadCount === 0} color="red" size={16} offset={4} label={unreadCount}>
          <ActionIcon variant="subtle" color="gray" size="lg" radius="md">
            <IconBell style={{ width: rem(20), height: rem(20) }} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>

      <Popover.Dropdown p={0}>
        <Paper>
          <Group justify="space-between" p="md" style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}>
            <Box>
              <Text fw={600} size="sm">
                Notifications
              </Text>
              <Text size="xs" c="dimmed">
                {unreadCount} non lues
              </Text>
            </Box>
            {unreadCount > 0 && (
              <Button variant="subtle" size="xs" onClick={markAllAsRead}>
                Tout marquer comme lu
              </Button>
            )}
          </Group>

          <ScrollArea h={350}>
            {notifications.length === 0 ? (
              <Box p="xl" style={{ textAlign: "center" }}>
                <IconBell style={{ width: rem(48), height: rem(48), opacity: 0.2 }} />
                <Text size="sm" c="dimmed" mt="md">
                  Aucune notification
                </Text>
              </Box>
            ) : (
              <Box>
                {notifications.map((notification) => {
                  const Icon = iconMap[notification.icon]
                  return (
                    <Box
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      p="md"
                      style={{
                        width: "100%",
                        borderBottom: "1px solid var(--mantine-color-gray-1)",
                        backgroundColor: notification.read ? "transparent" : "var(--mantine-color-gray-0)",
                        cursor: "pointer",
                      }}
                    >
                      <Group align="flex-start" wrap="nowrap">
                        <ThemeIcon
                          variant="light"
                          color={colorMap[notification.type]}
                          size="lg"
                          radius="xl"
                        >
                          <Icon style={{ width: rem(18), height: rem(18) }} />
                        </ThemeIcon>

                        <Box style={{ flex: 1 }}>
                          <Group justify="space-between" align="flex-start" wrap="nowrap" mb={4}>
                            <Text size="sm" fw={500} style={{ lineHeight: 1.2 }}>
                              {notification.title}
                            </Text>
                            {!notification.read && <Badge size="xs" circle color="primary" />}
                          </Group>
                          <Text size="xs" c="dimmed" mb={4} lineClamp={2}>
                            {notification.message}
                          </Text>
                          <Text size="xs" c="dimmed" style={{ fontSize: rem(10) }}>
                            {notification.time}
                          </Text>
                        </Box>

                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          size="sm"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => deleteNotification(notification.id, e)}
                        >
                          <IconX style={{ width: rem(14), height: rem(14) }} />
                        </ActionIcon>
                      </Group>
                    </Box>
                  )
                })}
              </Box>
            )}
          </ScrollArea>

          <Box p="xs" style={{ borderTop: "1px solid var(--mantine-color-gray-2)", textAlign: "center" }}>
            <Button variant="subtle" fullWidth size="xs">
              Voir toutes les notifications
            </Button>
          </Box>
        </Paper>
      </Popover.Dropdown>
    </Popover>
  )
}
