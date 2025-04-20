// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'nuxt-auth-utils',
    '@nuxt/image',
  ],
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  image: {
    dir: 'assets/img'
  },
  runtimeConfig: {
    // Private config
    telegramToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    public: {
      // Public config
      telegramBotUsername: 'dCheFormBot',
      telegramToken: process.env.TELEGRAM_BOT_TOKEN,
      groupId: process.env.TELEGRAM_GROUP_ID
    }
  },
  vite: {
    server: {
      allowedHosts: [
        '69f2-178-16-94-94.ngrok-free.app'
      ]
    }
  }
})