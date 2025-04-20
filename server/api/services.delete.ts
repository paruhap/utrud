import db from '../database/database';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  try {
    const stmt = db.prepare('DELETE FROM services WHERE id = ?');
    stmt.run(id);
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка при удалении услуги'
    });
  }
});
