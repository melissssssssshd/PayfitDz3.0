import { Badge } from "@mantine/core"

interface LeadScoreBadgeProps {
    score: number
}

export function LeadScoreBadge({ score }: LeadScoreBadgeProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return "green"
        if (score >= 60) return "blue"
        if (score >= 40) return "yellow"
        return "red"
    }

    const getScoreLabel = (score: number) => {
        if (score >= 80) return "Chaud"
        if (score >= 60) return "Tiède"
        if (score >= 40) return "Froid"
        return "Très froid"
    }

    return (
        <Badge color={getScoreColor(score)} variant="light" size="sm">
            {score} - {getScoreLabel(score)}
        </Badge>
    )
}
