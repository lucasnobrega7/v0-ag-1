import type React from "react"
// Adicione o import do ClerkProvider
import { ClerkProvider } from "@clerk/nextjs"

// No componente RootLayout, envolva o children com ClerkProvider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  )
}
