import { Paper, Group, Text, ThemeIcon, Stack } from "@mantine/core"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

interface StatsCardProps {
    title: string
    value: string | number
    icon: React.ComponentType<any>
    color: string
    trend?: {
        value: string
        isPositive: boolean
    }
}

export function StatsCard({ title, value, icon: Icon, color, trend }: StatsCardProps) {
    return (
        <Paper p="md" radius="md" withBorder>
            <Group justify="space-between">
                <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                        {title}
                    </Text>
                    <Text fw={700} size="xl" mt="xs">
                        {value}
                    </Text>
                    {trend && (
                        <Group gap={4} mt={5}>
                            {trend.isPositive ? (
                                <IconTrendingUp size={16} color="green" />
                            ) : (
                                <IconTrendingDown size={16} color="red" />
                            )}
                            <Text size="xs" c={trend.isPositive ? "green" : "red"} fw={500}>
                                {trend.value}
                            </Text>
                        </Group>
                    )}
                </div>
                <ThemeIcon color={color} size={44} radius="md" variant="light">
                    <Icon size={24} />
                </ThemeIcon>
            </Group>
        </Paper>
    )
}
