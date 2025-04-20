// server/api/leads.post.ts
import db from '../database/database';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const stmt = db.prepare(`
    INSERT INTO user (login, name, secondname, lastname, email, phone, phone2, telegram, whatsapp, address, text)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  try {
    const info = stmt.run(body.login, body.name, body.secondname, body.lastname, body.email, body.phone, body.phone2, body.telegram, body.whatsapp, body.address, body.text);
    return { success: true, id: info.lastInsertRowid };
  } catch (error) {
    throw createError({ statusCode: 400, message: 'Ошибка при создании пользователя' });
  }
});