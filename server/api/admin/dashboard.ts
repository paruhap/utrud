import db from '../../database/database';

export default defineEventHandler(async (event) => {
  const newLeads = db.prepare(`
    SELECT * FROM leads 
    WHERE status = 'Новая' 
    ORDER BY created_at DESC
  `).all();

  const recentContents = db.prepare(`
    SELECT * FROM contents 
    ORDER BY created_at DESC 
    LIMIT 3
  `).all();

  return {
    newLeads,
    recentContents
  };
});
