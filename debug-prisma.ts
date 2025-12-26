import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Attempting to connect to database...")
    try {
        await prisma.$connect()
        console.log("Successfully connected to database!")

        const count = await prisma.user.count()
        console.log(`Number of users in database: ${count}`)

        const leadFields = (prisma as any).lead?.fields || "N/A"
        console.log("Lead Fields (if available):", leadFields)
    } catch (e) {
        console.error("Failed to connect to database:")
        console.error(e)
    } finally {
        await prisma.$disconnect()
        process.exit(0)
    }
}

main()
