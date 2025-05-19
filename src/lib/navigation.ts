/**
 * Utilitário para navegação entre domínios
 */

// URLs dos domínios
export const domains = {
  dashboard: process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://dash.agentesdeconversao.com.br",
  login: process.env.NEXT_PUBLIC_LOGIN_URL || "https://login.agentesdeconversao.com.br",
  api: process.env.NEXT_PUBLIC_API_URL || "https://api.agentesdeconversao.com.br",
  docs: process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.agentesdeconversao.com.br",
}

/**
 * Gera uma URL completa para o domínio do dashboard
 */
export function getDashboardUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${domains.dashboard}${normalizedPath}`
}

/**
 * Gera uma URL completa para o domínio de login
 */
export function getLoginUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${domains.login}${normalizedPath}`
}

/**
 * Gera uma URL completa para o domínio da API
 */
export function getApiUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${domains.api}${normalizedPath}`
}

/**
 * Gera uma URL completa para o domínio da documentação
 */
export function getDocsUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${domains.docs}${normalizedPath}`
}

/**
 * Redireciona para o domínio do dashboard
 */
export function redirectToDashboard(path = "/"): void {
  if (typeof window !== "undefined") {
    window.location.href = getDashboardUrl(path)
  }
}

/**
 * Redireciona para o domínio de login
 */
export function redirectToLogin(path = "/"): void {
  if (typeof window !== "undefined") {
    window.location.href = getLoginUrl(path)
  }
}

/**
 * Redireciona para o domínio da API
 */
export function redirectToApi(path = "/"): void {
  if (typeof window !== "undefined") {
    window.location.href = getApiUrl(path)
  }
}

/**
 * Redireciona para o domínio da documentação
 */
export function redirectToDocs(path = "/"): void {
  if (typeof window !== "undefined") {
    window.location.href = getDocsUrl(path)
  }
}
