export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()

  nuxtApp.hook('app:created', () => {
    const defaultFetch = globalThis.fetch
    globalThis.fetch = async (input, init) => {
      if (authStore.token && init?.headers) {
        init.headers = {
          ...init.headers,
          'Authorization': `Bearer ${authStore.token}`
        }
      }
      return defaultFetch(input, init)
    }
  })
})
