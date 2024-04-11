const mysql = require('mysql');
const fs = require('fs').promises;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'english_emperor'
});

const initializeDatabase = async () => {
  try {
    await pool.query(`CREATE DATABASE IF NOT EXISTS english_emperor`);
    await pool.query(`USE english_emperor`);
    await pool.query(`CREATE TABLE IF NOT EXISTS files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      path VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log("Database and table initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initializeDatabase();

exports.uploadFile = async (filename, base64) => {
  const decodedImage = Buffer.from(base64, 'base64');
  await fs.writeFile(`uploads/${filename}`, decodedImage);
};
exports.saveFileDetails = async (filename) => {
    return new Promise((resolve, reject) => {
      const createdAt = new Date().toISOString(); // Get the current timestamp
      pool.query('INSERT INTO files (filename,created_at) VALUES (?,?)', [filename,createdAt], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId); // Return the ID of the inserted row
        }
      });
    });
  };
  
exports.getFileById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM files WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};
