import db from '../database/database';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);

  try {
    const stmt = db.prepare(`
      UPDATE services 
      SET category = ?, subcategory = ?, title = ?, subtitle = ?, 
          body = ?, price = ?, link = ?
      WHERE id = ?
    `);
    
    stmt.run(
      body.category,
      body.subcategory,
      body.title,
      body.subtitle,
      body.body,
      body.price,
      body.link,
      id
    );

    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка при обновлении услуги'
    });
  }
});
