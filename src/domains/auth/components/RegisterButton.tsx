"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { getLoginUrl } from "@/lib/navigation"
import Link from "next/link"
import { useSignUp } from "@clerk/nextjs"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface RegisterButtonProps {
  redirectUrl?: string
  mode?: "redirect" | "modal"
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
}

/**
 * Botão para iniciar o processo de registro
 */
export function RegisterButton({
  redirectUrl = "/dashboard",
  mode = "redirect",
  className,
  variant = "default",
  size = "default",
  children,
}: RegisterButtonProps) {
  const router = useRouter()
  const { signUp, isLoaded } = useSignUp()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async () => {
    if (!isLoaded) return

    setIsLoading(true)

    try {
      if (mode === "redirect") {
        // Redirecionar para a página de registro do Clerk
        await signUp.create({
          strategy: "oauth_google",
          redirectUrl: `${window.location.origin}/sso-callback?redirect=${redirectUrl}`,
        })
      } else {
        // Redirecionar para a página de registro personalizada
        router.push("/sign-up")
      }
    } catch (error) {
      console.error("Erro ao iniciar registro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      onClick={handleRegister}
      disabled={isLoading || !isLoaded}
      className={className}
    >
      {isLoading ? "Carregando..." : <Link href={getLoginUrl("/sign-up")}>{children || "Criar conta"}</Link>}
    </Button>
  )
}
