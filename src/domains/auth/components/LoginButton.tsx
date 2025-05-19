import { Button } from "@/components/ui/button"
import { getLoginUrl } from "@/lib/navigation"
import Link from "next/link"

interface LoginButtonProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function LoginButton({ className, variant = "default", size = "default" }: LoginButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={getLoginUrl("/sign-in")}>Entrar</Link>
    </Button>
  )
}
