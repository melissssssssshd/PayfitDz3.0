"use client"

import { useState } from "react"
import {
  Button,
  Card,
  Group,
  Text,
  Title,
  Badge,
  TextInput,
  Select,
  Modal,
  Stack,
  Textarea,
  rem,
  ActionIcon,
  SimpleGrid,
  Box,
  ThemeIcon,
  Divider,
} from "@mantine/core"
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconCalendar,
  IconClock,
  IconInfoCircle,
} from "@tabler/icons-react"

type Event = {
  id: string
  title: string
  date: Date
  time: string
  type: "meeting" | "deadline" | "leave" | "training" | "review" | "other"
  employee?: string
  description?: string
}

const eventColors = {
  meeting: "blue",
  deadline: "red",
  leave: "grape",
  training: "payfit",
  review: "orange",
  other: "gray",
}

const eventLabels = {
  meeting: "Réunion",
  deadline: "Échéance",
  leave: "Absence",
  training: "Formation",
  review: "Entretien",
  other: "Autre",
}

export default function CalendrierPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)) // January 2025
  const [view, setView] = useState("month")
  const [modalOpened, setModalOpened] = useState(false)
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Monday standup",
      date: new Date(2025, 0, 6),
      time: "9:00 AM",
      type: "meeting",
      employee: "Équipe Dev",
    },
    {
      id: "2",
      title: "Marketing standup",
      date: new Date(2025, 0, 6),
      time: "9:00 AM",
      type: "meeting",
      employee: "Équipe Marketing",
    },
    {
      id: "3",
      title: "All-hands meeting",
      date: new Date(2025, 0, 10),
      time: "4:00 PM",
      type: "meeting",
      employee: "Tous",
    },
    {
      id: "5",
      title: "Quarterly review",
      date: new Date(2025, 0, 15),
      time: "3:00 PM",
      type: "review",
      employee: "Direction",
    },
    {
      id: "6",
      title: "Entretien annuel - Marie",
      date: new Date(2025, 0, 20),
      time: "10:00 AM",
      type: "review",
      employee: "Marie Dupont",
    },
    {
      id: "8",
      title: "Formation Sécurité",
      date: new Date(2025, 0, 22),
      time: "2:00 PM",
      type: "training",
      employee: "Tous",
    },
  ])

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ]

  const { daysInMonth, startingDayOfWeek, year, month } = (() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    return {
      daysInMonth: lastDay.getDate(),
      startingDayOfWeek: firstDay.getDay(),
      year,
      month
    }
  })()

  const previousMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
  const goToToday = () => setCurrentDate(new Date())

  const getEventsForDay = (day: number) => {
    return events.filter((e) =>
      e.date.getDate() === day && e.date.getMonth() === month && e.date.getFullYear() === year
    )
  }

  const renderCalendarDays = () => {
    const days = []
    const totalCells = 35

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<Box key={`empty-pre-${i}`} bg="gray.0" style={{ border: '1px solid var(--mantine-color-gray-2)' }} />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day)
      const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()

      days.push(
        <Box
          key={day}
          p="xs"
          h={120}
          bg="white"
          style={{
            border: '1px solid var(--mantine-color-gray-2)',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background-color 0.1s ease'
          }}
          className="hover:bg-payfit-50"
        >
          <Text
            size="xs"
            fw={700}
            c={isToday ? 'payfit.7' : 'dark.3'}
            ta="right"
          >
            {day}
          </Text>
          <Stack gap={4} mt={4}>
            {dayEvents.slice(0, 2).map(e => (
              <Box
                key={e.id}
                p={2}
                bg={`${eventColors[e.type]}.0`}
                style={{
                  borderRadius: 4,
                  borderLeft: `3px solid var(--mantine-color-${eventColors[e.type]}-6)`
                }}
              >
                <Text size="10px" fw={700} c={`${eventColors[e.type]}.9`} truncate>{e.title}</Text>
              </Box>
            ))}
            {dayEvents.length > 2 && (
              <Text size="10px" c="dimmed" ta="center">+{dayEvents.length - 2} autres</Text>
            )}
          </Stack>
        </Box>
      )
    }

    while (days.length < 35) {
      days.push(<Box key={`empty-post-${days.length}`} bg="gray.0" style={{ border: '1px solid var(--mantine-color-gray-2)' }} />)
    }

    return days
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">Calendrier d'entreprise</Title>
          <Text c="dimmed" size="sm">Pilotez les réunions, absences et échéances clés.</Text>
        </div>
        <Button
          color="payfit"
          leftSection={<IconPlus size={18} />}
          radius="md"
          onClick={() => setModalOpened(true)}
        >
          Nouvel événement
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, lg: 4 }} spacing="lg">
        {/* Calendar Grid Area */}
        <Card shadow="sm" radius="md" padding={0} withBorder style={{ gridColumn: 'span 3' }}>
          <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
            <Group justify="space-between">
              <Group gap="xs">
                <ActionIcon variant="light" color="gray" onClick={previousMonth}><IconChevronLeft size={18} /></ActionIcon>
                <Title order={3} size="h4">{monthNames[month]} {year}</Title>
                <ActionIcon variant="light" color="gray" onClick={nextMonth}><IconChevronRight size={18} /></ActionIcon>
                <Button variant="subtle" color="payfit" size="xs" onClick={goToToday}>Aujourd'hui</Button>
              </Group>
              <Select
                value={view}
                onChange={(v) => setView(v || "month")}
                data={[{ value: 'month', label: 'Mois' }, { value: 'week', label: 'Semaine' }]}
                radius="md"
                w={110}
              />
            </Group>
          </Box>

          <SimpleGrid cols={7} spacing={0}>
            {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map(d => (
              <Box key={d} p="xs" bg="gray.0" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)', borderRight: '1px solid var(--mantine-color-gray-2)' }}>
                <Text size="xs" fw={700} c="dimmed" ta="center">{d}</Text>
              </Box>
            ))}
            {renderCalendarDays()}
          </SimpleGrid>
        </Card>

        {/* Sidebar Widgets */}
        <Stack gap="lg">
          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Text fw={700} size="sm" mb="md">Événements à venir</Text>
            <Stack gap="md">
              {events.slice(0, 4).map(e => (
                <Group key={e.id} wrap="nowrap" gap="sm">
                  <ThemeIcon color={eventColors[e.type]} variant="light" radius="md">
                    <IconClock size={16} />
                  </ThemeIcon>
                  <Box style={{ flex: 1 }}>
                    <Text fw={700} size="xs">{e.title}</Text>
                    <Text size="10px" c="dimmed">{e.date.toLocaleDateString()} • {e.time}</Text>
                  </Box>
                </Group>
              ))}
            </Stack>
            <Button variant="light" color="payfit" fullWidth mt="xl" size="xs">Voir tout le planning</Button>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Text fw={700} size="sm" mb="md">Légende</Text>
            <Stack gap="xs">
              {Object.entries(eventLabels).map(([type, label]) => (
                <Group key={type} gap="xs">
                  <Box w={10} h={10} bg={`${eventColors[type as keyof typeof eventColors]}.6`} style={{ borderRadius: 2 }} />
                  <Text size="xs" c="dark.7">{label}</Text>
                </Group>
              ))}
            </Stack>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder bg="payfit.0">
            <Group gap="xs" mb="xs">
              <IconInfoCircle size={16} color="var(--mantine-color-payfit-7)" />
              <Text fw={700} size="xs" c="payfit.9">Astuce RH</Text>
            </Group>
            <Text size="11px" c="payfit.8">Planifiez les entretiens annuels directement depuis le calendrier pour synchroniser les invitations.</Text>
          </Card>
        </Stack>
      </SimpleGrid>

      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Créer un événement" radius="md">
        <Stack gap="md">
          <TextInput label="Titre" placeholder="Nom de la réunion ou échéance" radius="md" />
          <SimpleGrid cols={2}>
            <TextInput label="Date" type="date" radius="md" />
            <TextInput label="Heure" type="time" radius="md" />
          </SimpleGrid>
          <Select
            label="Type"
            data={Object.entries(eventLabels).map(([v, l]) => ({ value: v, label: l }))}
            radius="md"
          />
          <Textarea label="Description" placeholder="Détails optionnels..." radius="md" minRows={3} />
          <Button color="payfit" fullWidth mt="md" radius="md">Enregistrer</Button>
        </Stack>
      </Modal>
    </Stack>
  )
}
