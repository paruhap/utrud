import type { Content } from '~/types/content'

export const useBaners = () => {
  const config = useRuntimeConfig()
  
  const getBaners = async (): Promise<Content[]> => {
    try {
      const response = await fetch(`${config.public.apiUrl}/content`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching content:', error)
      return []
    }
  }

  const getBaner = async (id: number): Promise<Content | null> => {
    try {
      const response = await fetch(`${config.public.apiUrl}/content/${id}`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  return {
    getBaners,
    getBaner
  }
}
