export default defineEventHandler(async (event) => {
 const config = useRuntimeConfig()
 const WEBHOOK_URL = config.webHookUrl // Замените на ваш актуальный URL
  const BOT_TOKEN = config.telegramToken;

  try {
    // Сначала удалим текущий вебхук
    await $fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`);

    // Установим новый вебхук
    const response = await $fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      body: {
        url: WEBHOOK_URL,
        allowed_updates: ['message', 'callback_query']
      }
    });

    return response;
  } catch (error) {
    console.error('Webhook setup error:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to setup webhook'
    });
  }
});
