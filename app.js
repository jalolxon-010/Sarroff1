const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const sequelize = require("./config/config"); 
require("dotenv").config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger hujjati
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Static fayllar
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES ---
const apiRoutes = require("./routes/api"); 
const transactionRoutes = require("./routes/transactionRoutes");

// Muhim: Agar routes/api.js ichida router.post('/login') bo'lsa, 
// quyidagi qator uni /api/login ko'rinishiga keltiradi.
app.use('/api', apiRoutes); 

// Tranzaksiyalar uchun (agar api.js dan alohida bo'lsa)
app.use('/api/transactions', transactionRoutes);

// Server status
app.get('/', (req, res) => {
  res.send('Sarrof Backend is running muvaffaqiyatli...');
});

// --- SERVER START ---
const PORT = process.env.PORT || 10000;

const start = async () => {
  try {
    console.log("Bazaga ulanishga urinish...");
    await sequelize.authenticate();
    console.log("✅ Bazaga muvaffaqiyatli ulandi.");

    // Jadvallarni sinxronizatsiya qilish (Render'da ehtiyotkorlik bilan)
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