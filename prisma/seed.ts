import { PrismaClient, LeadStatus } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("Seeding database...")

    // 1. Create System Admin
    // 1. Create Users with Roles
    const password = await bcrypt.hash("Payfit2024!", 10)

    // ADMIN
    await prisma.user.upsert({
        where: { email: "admin@payfit.com" },
        update: {},
        create: {
            email: "admin@payfit.com",
            name: "System Admin",
            passwordHash: password,
            appRole: "ADMIN",
            userType: "SYSTEM",
            isMainAdmin: true,
        },
    })

    // SALES
    const salesUser = await prisma.user.upsert({
        where: { email: "sales@payfit.com" },
        update: {},
        create: {
            email: "sales@payfit.com",
            name: "Amine Sales",
            passwordHash: password,
            appRole: "SALES",
            userType: "ENTERPRISE",
        },
    })

    // CUSTOMER SUCCESS
    await prisma.user.upsert({
        where: { email: "cs@payfit.com" },
        update: {},
        create: {
            email: "cs@payfit.com",
            name: "Sarah CS",
            passwordHash: password,
            appRole: "CUSTOMER_SUCCESS",
            userType: "ENTERPRISE",
        },
    })

    // CLIENT
    await prisma.user.upsert({
        where: { email: "client@payfit.com" },
        update: {},
        create: {
            email: "client@payfit.com",
            name: "Client Test",
            passwordHash: password,
            appRole: "CLIENT",
            userType: "ENTERPRISE",
        },
    })

    console.log("Users created: admin@payfit.com, sales@payfit.com, cs@payfit.com, client@payfit.com (Pass: Payfit2024!)")

    // 2. Create sample Leads
    await prisma.lead.create({
        data: {
            companyName: "SARL AlgeTech",
            email: "contact@algetech.dz",
            firstName: "Sami",
            lastName: "Brahimi",
            employees: 45,
            sector: "Technologie",
            wilaya: "Alger",
            companyType: "PME",
            jobTitle: "Directeur Général",
            needsPayroll: true,
            needsCNAS: true,
            currentSolution: "Excel",
            status: "NEW", // Valid status
            score: 85,
        } as any,
    })

    await prisma.lead.create({
        data: {
            companyName: "Global Solutions DZ",
            email: "hr@globalsolutions.dz",
            firstName: "Leila",
            lastName: "Mansouri",
            employees: 120,
            sector: "Services",
            wilaya: "Oran",
            companyType: "GRAND_COMPTE",
            jobTitle: "Responsable RH",
            needsLeaveManagement: true,
            currentSolution: "Sage",
            status: "CONTACTED", // Valid status
            score: 95,
            assignedToId: salesUser.id, // Assign to Sales user
        } as any,
    })

    console.log("Sample leads created.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
