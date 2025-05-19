import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { Toaster } from "@/src/components/ui/toaster"
import "@/src/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI Agent Platform",
  description: "Create, customize, and deploy AI agents powered by large language models",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
