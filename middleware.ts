import { clerkMiddleware } from "@clerk/nextjs/server"

// Define as rotas públicas que não precisam de autenticação
const publicRoutes = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/about",
  "/pricing",
  "/api/webhooks/clerk",
  "/api/public/(.*)",
  "/docs/(.*)",
]

// Define as rotas que devem ser ignoradas completamente
const ignoredRoutes = ["/_next/(.*)", "/favicon.ico", "/static/(.*)"]

export default clerkMiddleware({
  publicRoutes,
  ignoredRoutes,
})

// Configuração do matcher usando a sintaxe correta do Next.js
export const config = {
  matcher: [
    // Rotas que devem passar pelo middleware
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/",
  ],
}
