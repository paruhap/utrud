import db from '../../database/database';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  
  try {
    db.prepare(`
      UPDATE leads 
      SET name = ?, email = ?, phone = ?, status = ?, service_id = ?
      WHERE id = ?
    `).run(body.name, body.email, body.phone, body.status, body.service_id, id);
    
    return { success: true };
  } catch (error) {
    throw createError({ statusCode: 400, message: 'Ошибка при обновлении' });
  }
});
