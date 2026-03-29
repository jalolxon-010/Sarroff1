const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const sequelize = require("./config/config"); 
const bcrypt = require('bcryptjs'); // Parol shifrlash uchun
require("dotenv").config();

// Modellar (Yo'lni o'zingizniki bilan tekshiring)
const { User } = require('./models'); 

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

// Static fayllar (rasmlar uchun)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES ---
const apiRoutes = require("./routes/api"); 
const transactionRoutes = require("./routes/transactionRoutes");

// Barcha asosiy yo'llar (login, auth va h.k.)
app.use('/api', apiRoutes); 

// Tranzaksiyalar uchun alohida route
app.use('/api/transactions', transactionRoutes);

// Server holatini tekshirish
app.get('/', (req, res) => {
  res.send('Sarrof Backend is running muvaffaqiyatli...');
});

// --- TEST FOYDALANUVCHI YARATISH FUNKSIYASI ---
const createInitialUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash('pass123', 10);
    const [user, created] = await User.findOrCreate({
      where: { username: 'sarrof1' },
      defaults: {
        password: hashedPassword
      }
    });

    if (created) {
      console.log("✅ Yangi test foydalanuvchisi yaratildi: sarrof1 / pass123");
    } else {
      console.log("ℹ️ Foydalanuvchi allaqachon mavjud.");
    }
  } catch (error) {
    console.error("❌ Foydalanuvchi yaratishda xato:", error.message);
  }
};

// --- SERVERNI ISHGA TUSHIRISH ---
const PORT = process.env.PORT || 10000;

const start = async () => {
  try {
    console.log("Bazaga ulanishga urinish...");
    await sequelize.authenticate();
    console.log("✅ Bazaga muvaffaqiyatli ulandi.");

    // Jadvallarni sinxronizatsiya qilish
    // DIQQAT: alter: true jadvallarni o'zgartiradi
    await sequelize.sync({ alter: true }); 
    console.log("✅ Jadvallar yangilandi.");

    // Bazada foydalanuvchi borligini ta'minlash
    await createInitialUser();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server portda yonik: ${PORT}`);
    });
  } catch (e) {
    console.error("❌ Xatolik yuz berdi:", e.message);
  }
};

start();