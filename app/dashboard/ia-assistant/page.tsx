"use client"

import { useState } from "react"
import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
  ThemeIcon,
  Badge,
  TextInput,
  Avatar,
  Box,
  rem,
  ActionIcon,
  ScrollArea,
  SimpleGrid,
  Divider,
} from "@mantine/core"
import {
  IconRobot,
  IconSend,
  IconSparkles,
  IconTrendingUp,
  IconUsers,
  IconCalendar,
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
} from "@tabler/icons-react"

export default function IAAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant RH intelligent. Comment puis-je vous aider aujourd'hui ? Je peux analyser vos effectifs, prévoir vos besoins ou optimiser vos plannings.",
      timestamp: "10:30",
    },
  ])
  const [input, setInput] = useState("")

  const suggestions = [
    { icon: IconUsers, text: "Analyser le turnover de mon équipe", category: "Analyse", color: "blue" },
    { icon: IconCalendar, text: "Dates de congés optimales", category: "Planification", color: "payfit" },
    { icon: IconTrendingUp, text: "Prévoir les besoins en recrutement", category: "Prédiction", color: "indigo" },
    { icon: IconAlertTriangle, text: "Identifier les risques de surcharge", category: "Alerte", color: "orange" },
  ]

  const insights = [
    {
      type: "warning",
      title: "Risque de surcharge",
      description: "L'équipe Marketing a 15% d'heures sup ce mois",
      action: "Voir détails",
      color: "orange",
    },
    {
      type: "success",
      title: "Optimisation congés",
      description: "3 employés peuvent partir en S28 sans impact",
      action: "Planifier",
      color: "payfit",
    },
    {
      type: "info",
      title: "Tendance absentéisme",
      description: "Baisse de 8% des absences maladie vs mois dernier",
      action: "Rapport",
      color: "blue",
    },
  ]

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      },
      {
        role: "assistant",
        content: "D'après les données de décembre, je remarque une tendance stable. Souhaitez-vous que je génère un rapport détaillé sur ce point spécifique ?",
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setInput("")
  }

  return (
    <Stack gap="lg" h="calc(100vh - 120px)">
      <Group justify="space-between" align="center">
        <Group>
          <ThemeIcon size="xl" radius="md" color="payfit" variant="light">
            <IconRobot size={24} />
          </ThemeIcon>
          <div>
            <Title order={2} c="dark.8">Assistant IA RH</Title>
            <Text c="dimmed" size="sm">Votre copilote intelligent pour la gestion stratégique.</Text>
          </div>
        </Group>
        <Badge variant="dot" color="payfit" size="lg">IA Active • Multi-modale</Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg" h="100%" flex={1} mih={0}>
        {/* Chat Area */}
        <Stack h="100%" gap="lg" style={{ gridColumn: 'span 2' }}>
          <Card shadow="sm" radius="md" padding={0} withBorder flex={1} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
              <Group justify="space-between">
                <Group gap="xs">
                  <IconSparkles size={16} color="var(--mantine-color-payfit-6)" />
                  <Text fw={700} size="sm">Analyse en temps réel</Text>
                </Group>
                <Button variant="subtle" color="gray" size="xs">Effacer l'historique</Button>
              </Group>
            </Box>

            <ScrollArea flex={1} p="lg">
              <Stack gap="md">
                {messages.map((m, i) => (
                  <Box key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <Card
                      padding="sm"
                      radius="md"
                      bg={m.role === 'user' ? 'payfit.7' : 'gray.0'}
                      withBorder={m.role === 'assistant'}
                    >
                      <Text size="sm" c={m.role === 'user' ? 'white' : 'dark.8'}>{m.content}</Text>
                    </Card>
                    <Text size="10px" c="dimmed" mt={4} ta={m.role === 'user' ? 'right' : 'left'}>{m.timestamp}</Text>
                  </Box>
                ))}
              </Stack>
            </ScrollArea>

            <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
              <Group gap="sm">
                <TextInput
                  placeholder="Posez une question sur vos effectifs, la paie..."
                  style={{ flex: 1 }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  radius="md"
                  size="md"
                />
                <ActionIcon color="payfit" size="xl" radius="md" onClick={handleSend} variant="filled">
                  <IconSend size={20} />
                </ActionIcon>
              </Group>
            </Box>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Text fw={700} size="sm" mb="md">Suggestions rapides</Text>
            <SimpleGrid cols={2} spacing="sm">
              {suggestions.map((s, i) => (
                <Card
                  key={i}
                  padding="xs"
                  radius="md"
                  withBorder
                  className="hover:bg-payfit-50 transition-colors cursor-pointer"
                  onClick={() => setInput(s.text)}
                >
                  <Group gap="sm">
                    <ThemeIcon color={s.color} variant="light" radius="md">
                      <s.icon size={16} />
                    </ThemeIcon>
                    <Box>
                      <Text size="xs" fw={700}>{s.text}</Text>
                      <Badge size="9px" variant="outline" color={s.color}>{s.category}</Badge>
                    </Box>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          </Card>
        </Stack>

        {/* Insights Area */}
        <Stack gap="lg">
          <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Group gap="xs" mb="lg">
              <IconSparkles size={20} color="var(--mantine-color-payfit-6)" />
              <Text fw={700} size="md">Insights IA du jour</Text>
            </Group>
            <Stack gap="md">
              {insights.map((insight, i) => (
                <Box key={i} p="md" bg={`${insight.color}.0`} style={{ borderRadius: 12, border: `1px solid var(--mantine-color-${insight.color}-2)` }}>
                  <Group justify="space-between" mb={4}>
                    <Text fw={700} size="xs" c={`${insight.color}.9`}>{insight.title}</Text>
                    <ThemeIcon size="xs" color={insight.color} variant="light"><IconInfoCircle size={10} /></ThemeIcon>
                  </Group>
                  <Text size="xs" c={`${insight.color}.8`} mb="sm">{insight.description}</Text>
                  <Button variant="subtle" color={insight.color} size="xs" p={0}>{insight.action} →</Button>
                </Box>
              ))}
            </Stack>
          </Card>

          <Card shadow="sm" radius="md" padding="lg" withBorder bg="gray.0">
            <Text fw={700} size="sm" mb="md">Rapports IA</Text>
            <Stack gap="xs">
              <Box p="sm" bg="white" style={{ borderRadius: 8, border: '1px solid var(--mantine-color-gray-2)' }}>
                <Text fw={700} size="xs">Synthèse mensuelle Q4</Text>
                <Text size="10px" c="dimmed" mb="xs">Prêt pour téléchargement</Text>
                <Button variant="light" color="payfit" size="xs" fullWidth>Télécharger PDF</Button>
              </Box>
              <Box p="sm" bg="white" style={{ borderRadius: 8, border: '1px solid var(--mantine-color-gray-2)' }}>
                <Text fw={700} size="xs">Analyse Coût Salarial</Text>
                <Text size="10px" c="dimmed" mb="xs">Généré le 15/12/2024</Text>
                <Button variant="outline" color="gray" size="xs" fullWidth>Consulter</Button>
              </Box>
            </Stack>
          </Card>
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}
