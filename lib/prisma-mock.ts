// Mock database to allow the demo to run without a real database connection
// In a real production environment, this would be replaced by a real database

class MockDb {
    private leads: any[] = []
    private tenants: any[] = []
    private users: any[] = []
    private subscriptions: any[] = []

    lead = {
        create: async ({ data }: { data: any }) => {
            const newLead = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date() }
            this.leads.push(newLead)
            return newLead
        },
        findMany: async (args?: any) => {
            return [...this.leads].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        },
        findUnique: async ({ where }: { where: { id: string } }) => {
            return this.leads.find(l => l.id === where.id)
        },
        update: async ({ where, data }: { where: { id: string }, data: any }) => {
            const index = this.leads.findIndex(l => l.id === where.id)
            if (index !== -1) {
                this.leads[index] = { ...this.leads[index], ...data }
                return this.leads[index]
            }
            return null
        }
    }

    tenant = {
        create: async ({ data }: { data: any }) => {
            const newTenant = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date() }
            this.tenants.push(newTenant)
            return newTenant
        },
        findUnique: async ({ where, include }: { where: { id: string }, include?: any }) => {
            return this.tenants.find(t => t.id === where.id)
        },
        update: async ({ where, data }: { where: { id: string }, data: any }) => {
            const index = this.tenants.findIndex(t => t.id === where.id)
            if (index !== -1) {
                this.tenants[index] = { ...this.tenants[index], ...data }
                return this.tenants[index]
            }
            return null
        }
    }

    user = {
        create: async ({ data }: { data: any }) => {
            const newUser = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date() }
            this.users.push(newUser)
            return newUser
        },
        findUnique: async ({ where, include }: { where: { email: string }, include?: any }) => {
            return this.users.find(u => u.email === where.email)
        }
    }

    subscription = {
        create: async ({ data }: { data: any }) => {
            const newSub = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date() }
            this.subscriptions.push(newSub)
            return newSub
        }
    }
}

// Global singleton for the mock DB
const globalForMock = globalThis as unknown as {
    mockDb: MockDb | undefined
}

export const prisma = globalForMock.mockDb ?? new MockDb()

if (process.env.NODE_ENV !== "production") globalForMock.mockDb = prisma as MockDb
