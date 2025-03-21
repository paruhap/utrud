import type { Service } from '~/types/services'

export const useServices = () => {
  const getServices = async (category?: string): Promise<Service[]> => {
    const config = useRuntimeConfig()
    try {
      const response = await fetch(`${config.public.apiBase}/api/services${category ? `?category=${category}` : ''}`)
      const data = await response.json()
      if (!Array.isArray(data)) {
        console.error('API response is not an array:', data)
        return []
      }
      return data
    } catch (error) {
      console.error('Error fetching services:', error)
      return []
    }
  }

  return {
    getServices
  }
}
