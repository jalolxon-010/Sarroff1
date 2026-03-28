const { Sequelize } = require("sequelize");
require("dotenv").config();

// DATABASE_URL bo'lsa (Render'da), undan foydalanadi. Bo'lmasa lokal o'zgaruvchilardan yig'adi.
const dbUrl = process.env.DATABASE_URL || 
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    // FAQAT DATABASE_URL mavjud bo'lsa (ya'ni Render'da) SSL yoqiladi
    ...(process.env.DATABASE_URL ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {})
  }
});

module.exports = sequelize;