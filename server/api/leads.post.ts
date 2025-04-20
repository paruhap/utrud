// server/api/leads.post.ts
import db from '../database/database';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const stmt = db.prepare(`
    INSERT INTO leads (name, email, phone, status, service_id)
    VALUES (?, ?, ?, ?, ?)
  `);

  try {
    const info = stmt.run(body.name, body.email, body.phone, body.status, body.service_id);
    return { success: true, id: info.lastInsertRowid };
  } catch (error) {
    throw createError({ statusCode: 400, message: 'Ошибка при создании лида' });
  }
});