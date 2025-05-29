// server/api/leads.post.ts
import db from '../database/database';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  try {
    const stmt = db.prepare(`
      INSERT INTO services (category, subcategory, title, subtitle, body, price, link)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      body.category,
      body.subcategory,
      body.title,
      body.subtitle,
      body.body,
      body.price,
      body.link
    );

    return { success: true, id: info.lastInsertRowid };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка при создании услуги'
    });
  }
});