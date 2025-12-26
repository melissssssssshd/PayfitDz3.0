import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Testing database connection...")
    try {
        const count = await prisma.lead.count()
        console.log(`Current lead count: ${count}`)

        console.log("Attempting to create a test lead...")
        const lead = await prisma.lead.create({
            data: {
                companyName: "Test Company Debug",
                email: "debug@test.com",
                firstName: "Debug",
                lastName: "User",
                status: "NEW",
                employees: 10,
                sector: "Test Sector",
                wilaya: "Alger",
                // specific fields to test new schema
                needs: ["PAIE"],
                problems: "Test problem"
            } as any
        })
        console.log("Successfully created lead:", lead)
    } catch (error) {
        console.error("Database Error:", error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
