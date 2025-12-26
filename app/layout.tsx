import type React from "react"
import type { Metadata } from "next"
import { ColorSchemeScript } from "@mantine/core"
import { Analytics } from "@vercel/analytics/next"
import { MantineProvider } from "@/components/providers/mantine-provider"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/charts/styles.css"
import "@mantine/notifications/styles.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "PayFit - Logiciel de paie et RH en ligne",
  description:
    "PayFit est un logiciel de paie et de ressources humaines. Automatisez votre paie en ligne et vos process RH pour vous concentrer sur l'essentiel.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className="antialiased">
        <MantineProvider>
          {children}
        </MantineProvider>
        <Analytics />
      </body>
    </html>
  )
}
