import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { LeadScoringService } from "@/domains/crm/services/lead-scoring.service"
import { LeadRoutingService } from "@/domains/crm/services/lead-routing.service"
import { NotificationService } from "@/lib/notifications"

const leadSchema = z.object({
    companyName: z.string().min(2),
    email: z.string().email(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    employees: z.number().optional(),
    sector: z.string().optional(),
    wilaya: z.string().optional(),
    companyType: z.string().optional(),
    jobTitle: z.string().optional(),
    needsPayroll: z.boolean().optional(),
    needsCNAS: z.boolean().optional(),
    needsLeaveManagement: z.boolean().optional(),
    currentSolution: z.string().optional(),
    // Champs spécifiques DZ
    payrollUrgency: z.preprocess((val) => (val === "" ? undefined : val), z.enum(["END_OF_MONTH", "NEXT_MONTH", "EXPLORATION"]).optional()),
    preferredLanguage: z.preprocess((val) => (val === "" ? undefined : val), z.enum(["FR", "AR"]).optional()),
    employeeRange: z.preprocess((val) => (val === "" ? undefined : val), z.enum(["1-10", "11-50", "51-250"]).optional()),
    // Legacy fields kept for compatibility or internal logic
    needs: z.array(z.string()).optional(),
    problems: z.string().optional(),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log("Received lead submission:", JSON.stringify(body, null, 2))

        const validatedData = leadSchema.parse(body)
        console.log("Validation successful")

        const lead = await prisma.lead.create({
            data: {
                companyName: validatedData.companyName,
                email: validatedData.email,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                phone: validatedData.phone,
                employees: validatedData.employees,
                sector: validatedData.sector,
                wilaya: validatedData.wilaya,
                companyType: validatedData.companyType,
                jobTitle: validatedData.jobTitle,
                needsPayroll: validatedData.needsPayroll,
                needsCNAS: validatedData.needsCNAS,
                needsLeaveManagement: validatedData.needsLeaveManagement,
                currentSolution: validatedData.currentSolution,
                // Champs spécifiques DZ
                payrollUrgency: validatedData.payrollUrgency,
                preferredLanguage: validatedData.preferredLanguage,
                employeeRange: validatedData.employeeRange,
                // Legacy mapping
                needs: validatedData.needs,
                problems: validatedData.problems,
                status: "NEW",
                score: 0, // Sera calculé après
            } as any,
        })

        // Calculer le score initial
        const score = LeadScoringService.calculateScore(lead)
        const leadWithScore = await prisma.lead.update({
            where: { id: lead.id },
            data: { score },
        })

        // Router le lead automatiquement
        let routingResult
        try {
            routingResult = await LeadRoutingService.routeLead(lead.id)
        } catch (error) {
            console.error("Error routing lead:", error)
            // Ne pas faire échouer la création si le routing échoue
        }

        // Envoyer les notifications de confirmation
        try {
            const preferredLanguage = (validatedData.preferredLanguage || "FR") as "FR" | "AR"

            // Récupérer le prochain webinar pour l'invitation
            const { WebinarService } = await import("@/domains/crm/services/webinar.service")
            const upcomingWebinars = await WebinarService.getUpcomingWebinars()
            const nextWebinar = upcomingWebinars[0]

            await NotificationService.sendDemoRequestConfirmation(
                validatedData.email,
                validatedData.phone || "",
                preferredLanguage,
                nextWebinar?.meetingLink
            )
        } catch (error) {
            console.error("Error sending notifications:", error)
            // Ne pas faire échouer la création si les notifications échouent
        }

        return NextResponse.json(leadWithScore, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }
        console.error("Lead submission error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
