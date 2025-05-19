import { apiConfig } from "./api-config"

/**
 * Cliente HTTP para fazer requisições à API
 */
class ApiClient {
  /**
   * Faz uma requisição GET
   */
  async get(url: string, options: RequestInit = {}) {
    return this.request(url, { ...options, method: "GET" })
  }

  /**
   * Faz uma requisição POST
   */
  async post(url: string, data?: any, options: RequestInit = {}) {
    return this.request(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * Faz uma requisição PUT
   */
  async put(url: string, data?: any, options: RequestInit = {}) {
    return this.request(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * Faz uma requisição DELETE
   */
  async delete(url: string, options: RequestInit = {}) {
    return this.request(url, { ...options, method: "DELETE" })
  }

  /**
   * Faz uma requisição HTTP genérica
   */
  private async request(url: string, options: RequestInit) {
    const { headers, ...restOptions } = options

    // Construir a URL completa
    const fullUrl = url.startsWith("http") ? url : `${apiConfig.baseUrl}${url}`

    // Configurar o timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout)

    try {
      const response = await fetch(fullUrl, {
        ...restOptions,
        headers: {
          ...apiConfig.headers,
          ...headers,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Request failed with status ${response.status}`)
      }

      // Verificar se a resposta é JSON
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        return await response.json()
      }

      return await response.text()
    } catch (error) {
      clearTimeout(timeoutId)

      if (error.name === "AbortError") {
        throw new Error("Request timeout")
      }

      throw error
    }
  }
}

export const apiClient = new ApiClient()
