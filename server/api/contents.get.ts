// server/api/leads.get.ts
import db from '../database/database';

export default defineEventHandler(() => {
  const contents = db.prepare('SELECT * FROM contents').all();
  return contents;
});