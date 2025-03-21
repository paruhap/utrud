export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  if (to.path.startsWith('/admin') && to.path !== '/admin/login' && !authStore.isAuthenticated) {
    return navigateTo('/admin/login')
  }
})
