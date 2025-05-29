// server/api/leads.get.ts
import db from '../database/database';

export default defineEventHandler(() => {
  const leads = db.prepare('SELECT * FROM leads').all();
  return leads;
});