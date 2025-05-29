import dotenv from 'dotenv'

dotenv.config()

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-auth-utils', '@nuxt/image'],
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
    apiSecret: process.env.NUXT_SESSION_PASSWORD,
    telegramToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    NUXT_SUPER_ADMIN_EMAIL: process.env.NUXT_SUPER_ADMIN_EMAIL,
    NUXT_SUPER_ADMIN_PASSWORD: process.env.NUXT_SUPER_ADMIN_PASSWORD,
    telegramUserName:process.env.STAFF_USERNAME,
    webHookUrl:process.env.WEBHOOK_URL,
    apiKeyAi:process.env.API_KEY,
    
    public: {
      // Public config
      telegramBotUsername: 'dCheFormBot',
      telegramToken: process.env.TELEGRAM_BOT_TOKEN,
      groupId: process.env.TELEGRAM_GROUP_ID,
      NUXT_SUPER_ADMIN_EMAIL: process.env.NUXT_SUPER_ADMIN_EMAIL,
      NUXT_SUPER_ADMIN_PASSWORD: process.env.NUXT_SUPER_ADMIN_PASSWORD,
    }
  },

  vite: {
    server: {
      allowedHosts: [
        'http://localhost:3000/',
        'nerimgoofeln.beget.app'
      ]
    }
  },

  compatibilityDate: '2025-04-21'
})