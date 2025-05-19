import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Rotas que podem ser acessadas sem autenticação
  publicRoutes: ["/", "/sign-in", "/sign-up", "/about", "/pricing", "/api/webhooks/clerk"],

  // Rotas que sempre podem ser acessadas e não têm informações de autenticação
  ignoredRoutes: ["/api/public", "/_next", "/favicon.ico"],
})

export const config = {
  // Corresponde a todos os caminhos de requisição, exceto os que começam com:
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
