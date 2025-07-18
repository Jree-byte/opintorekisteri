require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'testuser',
  PASSWORD: process.env.DB_PASSWORD || 'vittu', 
  DB: process.env.DB_NAME || 'opintorekisteri',
  PORT: process.env.DB_PORT || 3306,
};