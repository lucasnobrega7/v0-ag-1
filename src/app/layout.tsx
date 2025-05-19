import type React from "react"
import { MultiDomainClerkProvider } from "@/lib/auth/clerk-multi-domain"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AnalyticsProvider } from "@/components/providers/analytics-provider"
import { Suspense } from "react"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <MultiDomainClerkProvider>
            <ThemeProvider>
              <AnalyticsProvider>{children}</AnalyticsProvider>
            </ThemeProvider>
          </MultiDomainClerkProvider>
        </Suspense>
      </body>
    </html>
  )
}
