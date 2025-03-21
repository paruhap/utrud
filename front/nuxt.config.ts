// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    baseURL: '/',
  },
  server: {
    port: process.env.NUXT_PORT || 3001,
    host: '0.0.0.0'
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: [
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
    '/assets/css/main.css', // путь к вашему CSS файлу
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      apiBase: 'http://localhost:3000' // убираем /api из базового URL
    }
  },
  modules: [
    '@pinia/nuxt'
  ],
  imports: {
    dirs: ['stores']
  }
})
