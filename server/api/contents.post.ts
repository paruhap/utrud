// server/api/leads.post.ts
import db from '../database/database';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const stmt = db.prepare(`
    INSERT INTO contents (block, title, subtitle, description, body, image, image2, anchor, anchor2)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  try {
    const info = stmt.run(
      body.block,
      body.title,
      body.subtitle,
      body.description,
      body.body,
      body.image,
      body.image2,
      body.anchor,
      body.anchor2
    );
    return { success: true, id: info.lastInsertRowid };
  } catch (error) {
    throw createError({ statusCode: 400, message: 'Ошибка при создании лида' });
  }
});