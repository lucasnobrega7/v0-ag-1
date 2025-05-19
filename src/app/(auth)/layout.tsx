import type React from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { ClerkProvider } from "@clerk/nextjs"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect("/login")
  }

  return (
    <ClerkProvider>
      <div className="flex min-h-screen bg-[#0e0e10] text-white">
        <DashboardSidebar />
        <div className="flex flex-col flex-1">
          <DashboardHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ClerkProvider>
  )
}
