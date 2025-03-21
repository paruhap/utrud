import type { User } from '~/types/users'

export const useUsers = () => {
  const config = useRuntimeConfig()
  
  const getUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch(`${config.public.apiUrl}/users`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
      return []
    }
  }

  const getUser = async (id: number): Promise<User | null> => {
    try {
      const response = await fetch(`${config.public.apiUrl}/users/${id}`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  return {
    getUsers,
    getUser
  }
}
