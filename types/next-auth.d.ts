import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Universe } from "@/lib/universe"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            tenantId?: string | null
            role?: string | null
            appRole?: string | null
            universe?: Universe
            isMainAdmin: boolean
            userType: string
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        tenantId?: string | null
        role?: string | null
        appRole?: string | null
        universe?: Universe
        isMainAdmin: boolean
        userType: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        tenantId?: string | null
        role?: string | null
        appRole?: string | null
        universe?: Universe
        isMainAdmin: boolean
        userType: string
    }
}
