import { defineStore } from 'pinia'
import { useApiService } from '~/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false
  }),
  
  actions: {
    async login(email: string, password: string) {
      console.log('Login attempt with:', email, password) // отладочный вывод
      const { login } = useApiService()
      try {
        const response = await login(email, password)
        console.log('Login response:', response) // отладочный вывод
        
        if (response?.token) {
          this.token = response.token
          this.isAuthenticated = true
          return true
        }
        return false
      } catch (error) {
        console.error('Login error in store:', error)
        return false
      }
    },
    
    logout() {
      this.token = null
      this.isAuthenticated = false
    }
  },

  persist: true
})
