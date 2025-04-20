// server/api/user.get.ts
import db from '../database/database';

export default defineEventHandler(() => {
  const services = db.prepare('SELECT * FROM services').all();
  return services;
});