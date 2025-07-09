const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(connection => {
    console.log('yhdistetty');
    connection.release();
  })
  .catch(err => {
    console.error('virhe:', err.message);
    process.exit(1);
  });

module.exports = pool;