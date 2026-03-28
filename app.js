const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const sequelize = require("./config/config"); 
require("dotenv").config();

const app = express();

// CORS - Tashqi so'rovlarga ruxsat berish
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger - Hujjatlashtirish
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Static papka (yuklangan rasmlar uchun)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES ---
// Senda barcha route'lar api.js faylida ekanligini hisobga olib:
const apiRoutes = require("./routes/api"); 
const transactionRoutes = require("./routes/transactionRoutes");

// Endi login va debtor'lar uchun URL: https://.../api/login ko'rinishida bo'ladi
app.use('/api', apiRoutes); 

// Tranzaksiyalar uchun alohida route bo'lsa:
app.use('/api/transactions', transactionRoutes);

// Server holatini tekshirish uchun
app.get('/', (req, res) => {
  res.send('Sarrof Backend is running muvaffaqiyatli...');
});

const PORT = process.env.PORT || 10000;

const start = async () => {
  try {
    console.log("Bazaga ulanishga urinish...");
    await sequelize.authenticate();
    console.log("✅ Bazaga muvaffaqiyatli ulandi.");

    // Jadvallarni sinxronizatsiya qilish
    await sequelize.sync({ alter: true }); 
    console.log("✅ Jadvallar yangilandi.");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server portda yonik: ${PORT}`);
    });
  } catch (e) {
    console.error("❌ Xatolik yuz berdi:", e.message);
  }
};

start();