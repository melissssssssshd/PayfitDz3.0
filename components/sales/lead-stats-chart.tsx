"use client"

import { Paper, Title, Group, Stack, Text } from "@mantine/core"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface LeadStatsChartProps {
    data: {
        newLeads: number
        contactedLeads: number
        demoScheduledLeads?: number
        demoDoneLeads: number
        closedLeads: number
        lostLeads?: number
    }
}

const COLORS = {
    NEW: "#339AF0", // blue
    CONTACTED: "#22B8CF", // cyan
    DEMO_SCHEDULED: "#FD7E14", // orange
    DEMO_DONE: "#9775FA", // grape
    CLOSED: "#51CF66", // green
    LOST: "#FA5252", // red
}

const STATUS_LABELS = {
    NEW: "Nouveau",
    CONTACTED: "Contacté",
    DEMO_SCHEDULED: "Démo planifiée",
    DEMO_DONE: "Démo effectuée",
    CLOSED: "Fermé",
    LOST: "Perdu",
}

export function LeadStatsChart({ data }: LeadStatsChartProps) {
    const chartData = [
        { name: STATUS_LABELS.NEW, value: data.newLeads, color: COLORS.NEW },
        { name: STATUS_LABELS.CONTACTED, value: data.contactedLeads, color: COLORS.CONTACTED },
        { name: STATUS_LABELS.DEMO_SCHEDULED, value: data.demoScheduledLeads || 0, color: COLORS.DEMO_SCHEDULED },
        { name: STATUS_LABELS.DEMO_DONE, value: data.demoDoneLeads, color: COLORS.DEMO_DONE },
        { name: STATUS_LABELS.CLOSED, value: data.closedLeads, color: COLORS.CLOSED },
        { name: STATUS_LABELS.LOST, value: data.lostLeads || 0, color: COLORS.LOST },
    ].filter(item => item.value > 0) // Only show non-zero values

    const total = data.newLeads + data.contactedLeads + (data.demoScheduledLeads || 0) + data.demoDoneLeads + data.closedLeads + (data.lostLeads || 0)

    if (total === 0) {
        return (
            <Paper p="md" radius="md" withBorder h={300}>
                <Title order={5} mb="md">
                    Distribution des Leads par Statut
                </Title>
                <Stack align="center" justify="center" h={200}>
                    <Text c="dimmed" size="sm">
                        Aucune donnée disponible
                    </Text>
                </Stack>
            </Paper>
        )
    }

    return (
        <Paper p="md" radius="md" withBorder h={300}>
            <Title order={5} mb="md">
                Distribution des Leads par Statut
            </Title>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    )
}
