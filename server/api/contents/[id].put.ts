import db from '../../database/database';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  
  try {
    db.prepare(`
      UPDATE contents 
      SET block = ?, title = ?, subtitle = ?, description = ?, 
          body = ?, image = ?, image2 = ?, anchor = ?, anchor2 = ?
      WHERE id = ?
    `).run(
      body.block, body.title, body.subtitle, body.description,
      body.body, body.image, body.image2, body.anchor, body.anchor2,
      id
    );
    return { success: true };
  } catch (error) {
    throw createError({ statusCode: 400, message: 'Ошибка при обновлении' });
  }
});
