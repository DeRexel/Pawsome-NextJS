// import mysql from 'mysql2/promise';

// let connection: mysql.Connection | null = null;

// export const createConnection = async () => {
//   if (!connection) {
//     connection = await mysql.createConnection({
//       host: process.env.DATABASE_HOST,
//       user: process.env.DATABASE_USER,
//       password: process.env.DATABASE_PASSWORD,
//       database: process.env.DATABASE_NAME,
//     });
//   }
//   return connection;
// };

// export const query = async (sql: string, values?: any[]) => {
//   const conn = await createConnection();
//   try {
//     const [rows] = await conn.execute(sql, values);
//     return rows;
//   } catch (error) {
//     console.error('Database query error:', error);
//     throw error;
//   }
// };

// database/config.ts
import mysql from 'mysql2/promise';

let connection: mysql.Connection | null = null;

export const createConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }
  return connection;
};

export const query = async (sql: string, values?: any[]) => {
  if (typeof window !== 'undefined') {
    throw new Error('Database queries cannot be run in the browser');
  }
  
  const conn = await createConnection();
  try {
    const [rows] = await conn.execute(sql, values);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};