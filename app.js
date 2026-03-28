const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const { sequelize, User } = require("./models"); // Transaction o'zi sequelize ichidan sync bo'ladi
const transactionRoutes = require("./routes/transactionRoutes"); // Yangi route
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Static papka
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ESKI apiRoutes YOKI exchangeRoutes'larni o'chirib tashlang!
// FAQAT SHU QATORNI QOLDIRING:
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    // alter: true yangi modellarni (Transaction) bazaga qo'shadi
    await sequelize.sync({ alter: true }); 
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running: http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("Xatolik:", e);
  }
};

start();