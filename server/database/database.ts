// server/database/database.ts
import Database from 'better-sqlite3';

const db = new Database(process.env.DB_PATH || 'database.db');

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS contents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      block TEXT NOT NULL,
      title TEXT,
      subtitle TEXT,
      description TEXT,
      body TEXT,
      image TEXT,
      image2 TEXT,
      anchor TEXT,
      anchor2 TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT NOT NULL UNIQUE,
      name TEXT,
      secondname TEXT,
      lastname TEXT,
      email TEXT,
      phone TEXT,
      phone2 TEXT,
      telegram TEXT,
      whatsapp TEXT,
      address TEXT,
      text TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      subcategory TEXT,
      title TEXT,
      subtitle TEXT,
      body TEXT,
      price TEXT,
      link TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      status TEXT DEFAULT 'new',
      service_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(service_id) REFERENCES services(id)
    );
  `);
}

//Добавим функцию для пересоздания таблицы (использовать только при необходимости)
// function resetLeadsTable() {
//   db.exec(`
//     DROP TABLE IF EXISTS leads;
//      CREATE TABLE IF NOT EXISTS leads (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       email TEXT,
//       phone TEXT,
//       status TEXT DEFAULT 'new',
//       service_id INTEGER,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY(service_id) REFERENCES services(id)
//     );
//   `);
// }

initializeDatabase();
//resetLeadsTable(); // раскомментировать только когда нужно пересоздать таблицу

export default db;