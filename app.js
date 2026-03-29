const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const sequelize = require("./config/config"); 
const bcrypt = require('bcryptjs'); 
require("dotenv").config();

// Modellarni yuklash
const { User, Setting } = require('./models'); // Setting modeli ham qo'shildi

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger dokumentatsiyasi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Static fayllar
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES ---
const apiRoutes = require("./routes/api"); 
const transactionRoutes = require("./routes/transactionRoutes");
const settingsRoutes = require("./routes/settings"); // YANGI: Settings route

app.use('/api', apiRoutes); 
app.use('/api/transactions', transactionRoutes);
app.use('/api/settings', settingsRoutes); // YANGI: Settings yo'nalishi

// Server holati
app.get('/', (req, res) => {
  res.send('Sarrof Backend is running muvaffaqiyatli...');
});

// --- INITIAL DATA (Foydalanuvchi va Kurs yaratish) ---
const createInitialData = async () => {
  try {
    // 1. Foydalanuvchi yaratish
    const hashedPassword = await bcrypt.hash('pass123', 10);
    const [user, userCreated] = await User.findOrCreate({
      where: { username: 'sarrof1' },
      defaults: { password: hashedPassword }
    });
    if (userCreated) console.log("✅ Yangi foydalanuvchi yaratildi: sarrof1");

    // 2. Dollar kursini tekshirish/yaratish (YANGI)
    const [rate, rateCreated] = await Setting.findOrCreate({
      where: { key: 'usd_rate' },
      defaults: { value: '12800' }
    });
    if (rateCreated) console.log("✅ Boshlang'ich dollar kursi o'rnatildi: 12800");

  } catch (error) {
    console.error("❌ Initial data yaratishda xato:", error.message);
  }
};

// --- SERVER START ---
const PORT = process.env.PORT || 10000;

const start = async () => {
  try {
    console.log("Bazaga ulanish boshlandi...");
    await sequelize.authenticate();
    console.log("✅ PostgreSQL bazasiga ulanish muvaffaqiyatli.");

    await sequelize.sync({ alter: true }); 
    console.log("✅ Ma'lumotlar bazasi jadvallari sinxronizatsiya qilindi.");

    // Dastlabki ma'lumotlarni tekshirish
    await createInitialData();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("❌ Serverni ishga tushirishda xatolik:", e.message);
  }
};

start();