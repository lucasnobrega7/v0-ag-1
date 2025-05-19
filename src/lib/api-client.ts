import { getApiUrl } from "./navigation"

/**
 * Cliente para fazer requisições à API
 */
export const apiClient = {
  /**
   * Faz uma requisição GET à API
   */
  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = getApiUrl(endpoint)
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  /**
   * Faz uma requisição POST à API
   */
  async post<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
    const url = getApiUrl(endpoint)
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  /**
   * Faz uma requisição PUT à API
   */
  async put<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
    const url = getApiUrl(endpoint)
    const response = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  /**
   * Faz uma requisição DELETE à API
   */
  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = getApiUrl(endpoint)
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },
}
