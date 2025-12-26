"use client"

import { useState } from "react"
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Badge,
  ActionIcon,
  Select,
  Box,
  rem,
  Divider,
  Progress,
} from "@mantine/core"
import {
  IconChevronLeft,
  IconChevronRight,
  IconCalendar,
  IconUsers,
  IconClock,
  IconCircleFilled,
  IconTarget,
  IconPlaneTilt,
  IconSchool,
  IconUserCheck,
  IconPlus,
} from "@tabler/icons-react"

type Event = {
  id: string
  title: string
  date: Date
  time: string
  type: "meeting" | "deadline" | "leave" | "training" | "review" | "personal"
  description?: string
  location?: string
}

const eventStyles = {
  meeting: { color: "blue", label: "Réunion", icon: IconUsers },
  deadline: { color: "red", label: "Échéance", icon: IconTarget },
  leave: { color: "payfit", label: "Absence", icon: IconPlaneTilt },
  training: { color: "indigo", label: "Formation", icon: IconSchool },
  review: { color: "orange", label: "Entretien", icon: IconUserCheck },
  personal: { color: "gray", label: "Personnel", icon: IconClock },
}

export default function EmployeeCalendrierPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1))
  const [view, setView] = useState<string | null>("month")
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Réunion d'équipe",
      date: new Date(2025, 0, 6),
      time: "9:00 AM",
      type: "meeting",
      location: "Salle A",
    },
    {
      id: "2",
      title: "Revue de projet",
      date: new Date(2025, 0, 8),
      time: "2:00 PM",
      type: "meeting",
      location: "Visio",
    },
    {
      id: "3",
      title: "Formation Sécurité",
      date: new Date(2025, 0, 13),
      time: "10:00 AM",
      type: "training",
      location: "Salle formation",
    },
    {
      id: "4",
      title: "Entretien annuel",
      date: new Date(2025, 0, 15),
      time: "3:00 PM",
      type: "review",
      location: "Bureau manager",
    },
    {
      id: "5",
      title: "Rendu rapport",
      date: new Date(2025, 0, 17),
      time: "5:00 PM",
      type: "deadline",
    },
    {
      id: "6",
      title: "Présentation client",
      date: new Date(2025, 0, 20),
      time: "9:00 AM",
      type: "meeting",
      location: "Chez le client",
    },
    {
      id: "7",
      title: "Congé payé",
      date: new Date(2025, 0, 23),
      time: "Journée",
      type: "leave",
    },
    {
      id: "10",
      title: "RDV médical",
      date: new Date(2025, 0, 29),
      time: "2:00 PM",
      type: "personal",
    },
  ])

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    return {
      daysInMonth: lastDay.getDate(),
      startingDayOfWeek: firstDay.getDay(),
      year,
      month
    }
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate)

  const getEventsForDay = (day: number) => {
    return events.filter((e) =>
      e.date.getDate() === day && e.date.getMonth() === month && e.date.getFullYear() === year
    )
  }

  const renderCalendarDays = () => {
    const days = []
    const totalCells = 35

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<Box key={`empty-start-${i}`} bg="gray.0" h={120} style={{ border: '1px solid var(--mantine-color-gray-2)' }} />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day)
      const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()

      days.push(
        <Box
          key={day}
          h={120}
          p="xs"
          bg="white"
          style={{ border: '1px solid var(--mantine-color-gray-2)', borderCollapse: 'collapse' }}
          className="hover:bg-payfit-0 cursor-pointer transition-colors"
        >
          <Text size="xs" fw={700} c={isToday ? "payfit.6" : "dimmed"}>{day}</Text>
          <Stack gap={4} mt={4}>
            {dayEvents.slice(0, 2).map((event) => (
              <Badge
                key={event.id}
                variant="light"
                color={eventStyles[event.type].color}
                size="xs"
                fullWidth
                radius="sm"
                styles={{ label: { textOverflow: 'ellipsis' } }}
              >
                {event.title}
              </Badge>
            ))}
            {dayEvents.length > 2 && <Text size="10px" c="dimmed" ta="center">+{dayEvents.length - 2} autres</Text>}
          </Stack>
        </Box>
      )
    }

    const remainingCells = totalCells - days.length
    for (let i = 0; i < remainingCells; i++) {
      days.push(<Box key={`empty-end-${i}`} bg="gray.0" h={120} style={{ border: '1px solid var(--mantine-color-gray-2)' }} />)
    }

    return days
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="dark.8">Mon calendrier</Text>
          <Text size="sm" c="dimmed">Planifiez vos réunions et suivez vos échéances</Text>
        </div>
        <Button variant="light" color="payfit" leftSection={<IconPlus size={16} />}>
          Nouvel événement
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, lg: 4 }} spacing="lg">
        {/* Main Calendar Card */}
        <Card shadow="sm" radius="md" padding={0} withBorder style={{ gridColumn: 'span 3' }}>
          <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
            <Group justify="space-between">
              <Group gap="xs">
                <ActionIcon variant="subtle" color="gray" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
                  <IconChevronLeft size={20} />
                </ActionIcon>
                <Text fw={700} size="lg" w={140} ta="center">{monthNames[month]} {year}</Text>
                <ActionIcon variant="subtle" color="gray" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
                  <IconChevronRight size={20} />
                </ActionIcon>
              </Group>
              <Group gap="xs">
                <Button variant="subtle" color="gray" size="xs" onClick={() => setCurrentDate(new Date())}>Aujourd'hui</Button>
                <Select
                  size="xs"
                  w={100}
                  data={['Mois', 'Semaine']}
                  value={view === 'month' ? 'Mois' : 'Semaine'}
                  onChange={(val) => setView(val === 'Mois' ? 'month' : 'week')}
                />
              </Group>
            </Group>
          </Box>

          <Box>
            <SimpleGrid cols={7} spacing={0}>
              {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((d) => (
                <Box key={d} p="xs" bg="gray.0" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)', borderRight: '1px solid var(--mantine-color-gray-2)' }}>
                  <Text ta="center" size="xs" fw={700} c="dimmed">{d}</Text>
                </Box>
              ))}
            </SimpleGrid>
            <SimpleGrid cols={7} spacing={0}>
              {renderCalendarDays()}
            </SimpleGrid>
          </Box>
        </Card>

        {/* Sidebar widgets */}
        <Stack gap="lg">
          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Text fw={700} size="md" mb="md">Événements à venir</Text>
            <Stack gap="md">
              {events.slice(0, 4).map((event) => {
                const EventIcon = eventStyles[event.type].icon;
                return (
                  <Group key={event.id} wrap="nowrap" gap="sm">
                    <ThemeIcon variant="light" color={eventStyles[event.type].color} size="md" radius="md">
                      <EventIcon size={18} />
                    </ThemeIcon>
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={700} lineClamp={1}>{event.title}</Text>
                      <Text size="xs" c="dimmed">{event.time} • {event.date.toLocaleDateString()}</Text>
                    </div>
                  </Group>
                );
              })}
            </Stack>
            <Button variant="subtle" color="payfit" fullWidth mt="md" size="xs">Voir tout le planning</Button>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
            <Text fw={700} size="md" mb="xs" c="payfit.9">Solde de congés</Text>
            <Group justify="space-between" mb={4}>
              <Text size="xs" fw={600} c="payfit.7">DISPONIBLE</Text>
              <Text size="lg" fw={800} c="payfit.9">12 jours</Text>
            </Group>
            <Progress value={48} color="payfit" size="sm" radius="xl" />
            <Text size="xs" c="payfit.7" mt={4}>Sur 25 jours annuels</Text>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Text fw={700} size="sm" mb="sm">Légende</Text>
            <Stack gap={4}>
              {Object.entries(eventStyles).map(([type, style]) => (
                <Group key={type} gap="xs">
                  <IconCircleFilled size={10} color={`var(--mantine-color-${style.color}-6)`} />
                  <Text size="xs" c="dimmed">{style.label}</Text>
                </Group>
              ))}
            </Stack>
          </Card>
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}
