"use client"

import { useState } from "react"
import {
  IconSearch,
  IconSend,
  IconPaperclip,
  IconDotsVertical,
  IconPhone,
  IconVideo,
  IconCircleFilled,
} from "@tabler/icons-react"
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
  TextInput,
  ActionIcon,
  Box,
  ScrollArea,
  rem,
  Divider,
} from "@mantine/core"

const conversations = [
  {
    id: 1,
    name: "Sylvie Lessage",
    role: "Responsable RH",
    lastMessage: "Votre demande de congé a été approuvée",
    time: "2h",
    unread: 2,
    online: true,
    initials: "SL",
  },
  {
    id: 2,
    name: "Lucas Fontaine",
    role: "Analyste Financier",
    lastMessage: "Merci pour l'information",
    time: "Hier",
    unread: 0,
    online: false,
    initials: "LF",
  },
  {
    id: 3,
    name: "Émilie Lambert",
    role: "Cheffe de Projet",
    lastMessage: "Je suis disponible pour discuter",
    time: "3j",
    unread: 1,
    online: true,
    initials: "EL",
  },
]

const messagesData = [
  { id: 1, sender: "Sylvie Lessage", content: "Bonjour, j'ai bien reçu votre demande de congé pour le mois prochain.", time: "10:23", isOwn: false },
  { id: 2, sender: "Admin", content: "Bonjour Sylvie, merci de votre retour rapide. Avez-vous eu le temps de l'examiner ?", time: "10:25", isOwn: true },
  { id: 3, sender: "Sylvie Lessage", content: "Oui, tout est en ordre. Votre demande de congé du 15 au 22 janvier a été approuvée.", time: "14:15", isOwn: false },
  { id: 4, sender: "Admin", content: "Parfait, merci beaucoup !", time: "14:16", isOwn: true },
]

export default function MessagesPage() {
  const [selectedConv, setSelectedConv] = useState(conversations[0])
  const [input, setInput] = useState("")

  return (
    <Box h="calc(100vh - 120px)" display="flex" style={{ gap: '1rem' }}>
      {/* Sidebar List */}
      <Card shadow="sm" radius="md" padding={0} withBorder w={320} flex="none" display="flex" style={{ flexDirection: 'column' }}>
        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
          <Title order={3} size="h4" mb="md">Messagerie</Title>
          <TextInput
            placeholder="Rechercher..."
            leftSection={<IconSearch size={16} />}
            radius="md"
          />
        </Box>
        <ScrollArea flex={1}>
          <Stack gap={0}>
            {conversations.map(conv => (
              <Box
                key={conv.id}
                p="md"
                onClick={() => setSelectedConv(conv)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedConv.id === conv.id ? 'var(--mantine-color-payfit-0)' : 'transparent',
                  borderLeft: selectedConv.id === conv.id ? '4px solid var(--mantine-color-payfit-6)' : '4px solid transparent'
                }}
                className="hover:bg-gray-50 transition-colors"
              >
                <Group wrap="nowrap" gap="sm">
                  <Box style={{ position: 'relative' }}>
                    <Avatar radius="md" color="payfit">{conv.initials}</Avatar>
                    {conv.online && (
                      <IconCircleFilled
                        size={12}
                        color="var(--mantine-color-payfit-6)"
                        style={{ position: 'absolute', bottom: -2, right: -2, border: '2px solid white', borderRadius: '50%' }}
                      />
                    )}
                  </Box>
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Group justify="space-between" wrap="nowrap">
                      <Text fw={700} size="sm" truncate>{conv.name}</Text>
                      <Text size="xa-xs" c="dimmed">{conv.time}</Text>
                    </Group>
                    <Text size="xs" c="dimmed" truncate>{conv.lastMessage}</Text>
                  </Box>
                  {conv.unread > 0 && <Badge size="xs" color="payfit" variant="filled">{conv.unread}</Badge>}
                </Group>
              </Box>
            ))}
          </Stack>
        </ScrollArea>
      </Card>

      {/* Main Chat Area */}
      <Card shadow="sm" radius="md" padding={0} withBorder flex={1} display="flex" style={{ flexDirection: 'column' }}>
        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
          <Group justify="space-between">
            <Group gap="sm">
              <Avatar color="payfit" radius="md">{selectedConv.initials}</Avatar>
              <Box>
                <Text fw={700} size="sm">{selectedConv.name}</Text>
                <Text size="xs" c="dimmed">{selectedConv.role}</Text>
              </Box>
            </Group>
            <Group gap="xs">
              <ActionIcon variant="light" color="gray"><IconPhone size={18} /></ActionIcon>
              <ActionIcon variant="light" color="gray"><IconVideo size={18} /></ActionIcon>
              <ActionIcon variant="light" color="gray"><IconDotsVertical size={18} /></ActionIcon>
            </Group>
          </Group>
        </Box>

        <ScrollArea flex={1} p="xl">
          <Stack gap="md">
            {messagesData.map((m, i) => (
              <Box key={i} style={{ alignSelf: m.isOwn ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                <Card
                  padding="sm"
                  radius="lg"
                  bg={m.isOwn ? 'payfit.7' : 'gray.0'}
                  withBorder={!m.isOwn}
                >
                  <Text size="sm" c={m.isOwn ? 'white' : 'dark.8'}>{m.content}</Text>
                </Card>
                <Text size="10px" c="dimmed" mt={4} ta={m.isOwn ? 'right' : 'left'}>{m.time}</Text>
              </Box>
            ))}
          </Stack>
        </ScrollArea>

        <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
          <Group gap="sm">
            <ActionIcon variant="light" color="gray" size="xl" radius="md"><IconPaperclip size={20} /></ActionIcon>
            <TextInput
              placeholder="Écrivez votre message..."
              style={{ flex: 1 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              radius="md"
              size="md"
            />
            <ActionIcon color="payfit" size="xl" radius="md" variant="filled"><IconSend size={20} /></ActionIcon>
          </Group>
        </Box>
      </Card>
    </Box>
  )
}
