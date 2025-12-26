import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // Allow access to landing page for non-authenticated users
        if (path === "/" && !token) {
            return NextResponse.next()
        }

        if (token) {
            const role = token.role as string

            // Redirect from root based on role (only if authenticated)
            if (path === "/") {
                if (role === "ADMIN") {
                    return NextResponse.redirect(new URL("/admin", req.url))
                }
                if (role === "SALES") {
                    return NextResponse.redirect(new URL("/sales", req.url))
                }
                if (role === "CUSTOMER_SUCCESS") {
                    return NextResponse.redirect(new URL("/cs", req.url))
                }
                if (role === "CLIENT") {
                    return NextResponse.redirect(new URL("/dashboard", req.url))
                }
            }

            // Redirect from /dashboard based on role
            if (path === "/dashboard") {
                if (role === "ADMIN") {
                    return NextResponse.redirect(new URL("/admin", req.url))
                }
                if (role === "SALES") {
                    return NextResponse.redirect(new URL("/sales", req.url))
                }
                if (role === "CUSTOMER_SUCCESS") {
                    return NextResponse.redirect(new URL("/cs", req.url))
                }
            }

            // ADMIN (System Admin) Routing
            if (role === "ADMIN") {
                if (path.startsWith("/dashboard") || path.startsWith("/onboarding")) {
                    return NextResponse.redirect(new URL("/admin", req.url))
                }
            }

            // SALES Routing
            if (role === "SALES") {
                if (path.startsWith("/admin") && !path.startsWith("/admin/leads")) {
                    // Sales might need specific admin pages, or better, a /sales route.
                    // For now, let's assume specific access or redirect to /sales dashboard
                    // If accessing forbidden admin pages:
                    return NextResponse.redirect(new URL("/sales", req.url))
                }
            }

            // CLIENT Routing
            if (role === "CLIENT") {
                if (path.startsWith("/admin") || path.startsWith("/sales") || path.startsWith("/cs")) {
                    return NextResponse.redirect(new URL("/dashboard", req.url))
                }
            }

            // CUSTOMER_SUCCESS Routing
            if (role === "CUSTOMER_SUCCESS") {
                // Logic for CS
            }
        }

        // 1. Protect Admin Routes (General)
        if (path.startsWith("/admin")) {
            const allowedRoles = ["ADMIN", "SALES", "CUSTOMER_SUCCESS"] // Sales/CS might need partial access
            if (!token || !allowedRoles.includes(token.role as string)) {
                return NextResponse.redirect(new URL("/login", req.url))
            }
        }

        // 2. Protect Sales Routes
        if (path.startsWith("/sales")) {
            if (!token || token.role !== "SALES") {
                return NextResponse.redirect(new URL("/login", req.url))
            }
        }

        // 3. Protect CS Routes
        if (path.startsWith("/cs")) {
            if (!token || token.role !== "CUSTOMER_SUCCESS") {
                return NextResponse.redirect(new URL("/login", req.url))
            }
        }

        // 4. Protect Client Dashboard
        if (path.startsWith("/dashboard")) {
            if (!token) return NextResponse.redirect(new URL("/login", req.url))

            // If internal user tries to access client dashboard, maybe allow for debugging?
            // Enforce tenantId for clients
            if (token.role === "CLIENT" && !token.tenantId) {
                return NextResponse.redirect(new URL("/onboarding/company", req.url))
            }
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname
                // Allow landing page without authentication
                if (path === "/") {
                    return true
                }
                // Require authentication for protected routes
                return !!token
            },
        },
    }
)

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/admin/:path*",
        "/sales/:path*",
        "/cs/:path*",
        "/onboarding/:path*",
        "/api/admin/:path*", // API protection matches logic above
    ],
}
