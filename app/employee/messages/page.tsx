"use client"

import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Avatar,
  Box,
  rem,
  ActionIcon,
  TextInput,
  Textarea,
  Badge,
  ScrollArea,
  Indicator,
} from "@mantine/core"
import {
  IconSend,
  IconSearch,
  IconDotsVertical,
  IconCircleFilled,
} from "@tabler/icons-react"
import { useState } from "react"

const conversations = [
  {
    id: 1,
    name: "Emma Dupont",
    role: "RH",
    lastMessage: "Bonjour Catherine, votre demande de congé a été approuvée",
    time: "10:30",
    unread: 2,
    online: true,
    initials: "ED",
  },
  {
    id: 2,
    name: "Lucas Fontaine",
    role: "Finance",
    lastMessage: "Merci pour les documents",
    time: "Hier",
    unread: 0,
    online: false,
    initials: "LF",
  },
  {
    id: 3,
    name: "Romain Garnier",
    role: "Logistique",
    lastMessage: "À demain pour la réunion",
    time: "Lun",
    unread: 0,
    online: true,
    initials: "RG",
  },
]

const messages = [
  {
    id: 1,
    sender: "Emma Dupont",
    content: "Bonjour Catherine, j'ai bien reçu votre demande de congé",
    time: "10:25",
    isMe: false,
  },
  {
    id: 2,
    sender: "Moi",
    content: "Merci Emma, pouvez-vous me confirmer les dates ?",
    time: "10:27",
    isMe: true,
  },
  {
    id: 3,
    sender: "Emma Dupont",
    content: "Bien sûr ! Votre demande pour le 15-20 juillet a été approuvée. Bonnes vacances !",
    time: "10:30",
    isMe: false,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])

  return (
    <Box h="calc(100vh - 120px)">
      <Group h="100%" gap="md" align="flex-start" wrap="nowrap">
        {/* Conversations list */}
        <Card shadow="sm" radius="md" padding={0} withBorder w={350} h="100%" flex="0 0 auto">
          <Stack h="100%" gap={0}>
            <Box p="lg" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
              <Text fw={700} size="lg" mb="md">Messagerie</Text>
              <TextInput
                placeholder="Rechercher une conversation..."
                leftSection={<IconSearch size={16} />}
                radius="md"
              />
            </Box>

            <ScrollArea flex={1}>
              <Box p="xs">
                {conversations.map((conv) => (
                  <Box
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    p="sm"
                    style={{
                      borderRadius: 8,
                      cursor: 'pointer',
                      backgroundColor: selectedConversation.id === conv.id ? 'var(--mantine-color-payfit-0)' : 'transparent',
                      border: selectedConversation.id === conv.id ? '1px solid var(--mantine-color-payfit-2)' : '1px solid transparent'
                    }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <Group wrap="nowrap">
                      <Indicator color="green" offset={2} position="bottom-end" size={10} disabled={!conv.online} withBorder>
                        <Avatar color="payfit" radius="md">{conv.initials}</Avatar>
                      </Indicator>
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <Group justify="space-between" wrap="nowrap">
                          <Text fw={700} size="sm" truncate>{conv.name}</Text>
                          <Text size="10px" c="dimmed">{conv.time}</Text>
                        </Group>
                        <Text size="xs" c="payfit.7" fw={600}>{conv.role}</Text>
                        <Text size="xs" c="dimmed" truncate>{conv.lastMessage}</Text>
                      </div>
                      {conv.unread > 0 && (
                        <Badge color="payfit" size="xs" variant="filled" circle>
                          {conv.unread}
                        </Badge>
                      )}
                    </Group>
                  </Box>
                ))}
              </Box>
            </ScrollArea>
          </Stack>
        </Card>

        {/* Message View */}
        <Card shadow="sm" radius="md" padding={0} withBorder style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
            <Group justify="space-between">
              <Group>
                <Indicator color="green" offset={2} position="bottom-end" size={10} disabled={!selectedConversation.online} withBorder>
                  <Avatar color="payfit" radius="md">{selectedConversation.initials}</Avatar>
                </Indicator>
                <div>
                  <Text fw={700} size="md">{selectedConversation.name}</Text>
                  <Text size="xs" c="dimmed">{selectedConversation.role} • {selectedConversation.online ? 'En ligne' : 'Hors ligne'}</Text>
                </div>
              </Group>
              <ActionIcon variant="subtle" color="gray">
                <IconDotsVertical size={20} />
              </ActionIcon>
            </Group>
          </Box>

          {/* Messages Area */}
          <ScrollArea flex={1} p="lg">
            <Stack gap="md">
              {messages.map((message) => (
                <Box
                  key={message.id}
                  style={{
                    alignSelf: message.isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '70%'
                  }}
                >
                  <Card
                    padding="xs"
                    radius="md"
                    bg={message.isMe ? 'payfit.7' : 'gray.0'}
                    withBorder={!message.isMe}
                  >
                    <Text size="sm" c={message.isMe ? 'white' : 'dark.8'}>
                      {message.content}
                    </Text>
                  </Card>
                  <Text size="10px" c="dimmed" mt={2} ta={message.isMe ? 'right' : 'left'}>
                    {message.time}
                  </Text>
                </Box>
              ))}
            </Stack>
          </ScrollArea>

          {/* Input Area */}
          <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
            <Group align="flex-end" gap="sm">
              <Textarea
                placeholder="Écrivez votre message..."
                style={{ flex: 1 }}
                minRows={1}
                maxRows={4}
                autosize
                radius="md"
              />
              <ActionIcon color="payfit" size="xl" radius="md" variant="filled">
                <IconSend size={20} />
              </ActionIcon>
            </Group>
          </Box>
        </Card>
      </Group>
    </Box>
  )
}
