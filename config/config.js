const { Sequelize } = require("sequelize");
require("dotenv").config();

// Render'dagi DATABASE_URL dan foydalanish uchun ulanish
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Render bazalari uchun SSL shart
    },
  },
});

module.exports = sequelize;