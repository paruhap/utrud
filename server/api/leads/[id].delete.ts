import db from '../../database/database';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  
  try {
    db.prepare('DELETE FROM leads WHERE id = ?').run(id);
    return { success: true };
  } catch (error) {
    throw createError({ statusCode: 400, message: 'Ошибка при удалении' });
  }
});
