import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { resolveUniverse } from "@/lib/universe"

export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma), // Disabled for mock DB
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required")
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { tenant: true },
                })

                if (!user || !user.passwordHash) {
                    throw new Error("No user found with this email")
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.passwordHash
                )

                if (!isPasswordValid) {
                    throw new Error("Invalid password")
                }

                const universe = resolveUniverse(user.appRole)
                
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    tenantId: user.tenantId,
                    role: user.appRole as string,
                    appRole: user.appRole as string,
                    universe,
                    isMainAdmin: user.isMainAdmin,
                    userType: user.userType,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user?: any }) {
            if (user) {
                token.id = user.id
                token.tenantId = user.tenantId
                token.role = user.role
                token.appRole = user.appRole
                token.universe = user.universe
                token.isMainAdmin = user.isMainAdmin
                token.userType = user.userType
            }
            return token
        },
        async session({ session, token }: { session: any, token: any }) {
            if (session.user) {
                session.user.id = token.id
                session.user.tenantId = token.tenantId
                session.user.role = token.role
                session.user.appRole = token.appRole
                session.user.universe = token.universe
                session.user.isMainAdmin = token.isMainAdmin
                session.user.userType = token.userType
            }
            return session
        },
        async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
            // After sign in, redirect based on role
            if (url === baseUrl || url === `${baseUrl}/`) {
                // Get the session to check role (we'll use a workaround)
                // Since we can't access session here directly, we'll handle this in middleware
                return baseUrl
            }
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
}
