// server/api/user.get.ts
import db from '../database/database';

export default defineEventHandler(async (event) => {
  try {
    const services = db.prepare('SELECT * FROM services').all();
    if (!services) {
      throw createError({
        statusCode: 404,
        message: 'Услуги не найдены'
      });
    }
    return services;
  } catch (error) {
    console.error('Ошибка при получении услуг:', error);
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении данных из базы'
    });
  }
});