import db from '../../database/database';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const method = event.method;

  try {
    if (method === 'DELETE') {
      const stmt = db.prepare('DELETE FROM services WHERE id = ?');
      stmt.run(id);
      return { success: true };
    }

    if (method === 'PUT') {
      const body = await readBody(event);
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
    }

    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    });

  } catch (error) {
    console.error('Service operation error:', error);
    throw createError({
      statusCode: 400,
      message: error.message || 'Error processing request'
    });
  }
});
