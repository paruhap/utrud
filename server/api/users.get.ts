// server/api/user.get.ts
import db from '../database/database';

export default defineEventHandler(() => {
  const users = db.prepare('SELECT * FROM user').all();
  return users;
});