import db from '../database/database';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  try {
    // Проверяем наличие обязательных полей
    if (!body.name || !body.phone) {
      throw createError({
        statusCode: 400,
        message: 'Отсутствуют обязательные поля'
      });
    }

    // Сохраняем в базу данных
    const stmt = db.prepare(`
      INSERT INTO leads (name, phone, status)
      VALUES (?, ?, 'new')
    `);
    
    stmt.run(body.name, body.phone);

    // Формируем сообщение для Telegram
    const messageText = encodeURIComponent(`🔔 Новая заявка с сайта!
👤 Имя: ${body.name}
📱 Телефон: ${body.phone}
${body.service ? `💼 Услуга: ${body.service}` : ''}`);

    // Отправляем в Telegram
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${messageText}`;
    const response = await fetch(telegramUrl);

    if (!response.ok) {
      console.error('Telegram API Response:', await response.text());
      throw new Error('Ошибка отправки в Telegram');
    }

    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    throw createError({
      statusCode: 400,
      message: error.message || 'Ошибка при обработке заявки'
    });
  }
});
