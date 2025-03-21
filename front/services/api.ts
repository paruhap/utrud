export const useApiService = () => {
  const config = useRuntimeConfig()
  
  const login = async (email: string, password: string) => {
    console.log('API Service: Sending login request') // отладочный вывод
    try {
      const response = await fetch(`${config.public.apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('API Service: Received response:', data) // отладочный вывод
      return { token: data.access_token }
    } catch (error) {
      console.error('API Service: Login error:', error)
      throw error
    }
  }

  return { login }
}
