const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const sequelize = require("./config/config"); 
const bcrypt = require('bcryptjs'); 
require("dotenv").config();

// Modellarni yuklash
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

// Swagger dokumentatsiyasi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Static fayllar (rasmlar va h.k.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES ---
const apiRoutes = require("./routes/api"); 
const transactionRoutes = require("./routes/transactionRoutes");

// Asosiy login va boshqa API yo'llari
app.use('/api', apiRoutes); 

// Tranzaksiyalar uchun alohida yo'nalish
app.use('/api/transactions', transactionRoutes);

// Server holatini tekshirish
app.get('/', (req, res) => {
  res.send('Sarrof Backend is running muvaffaqiyatli...');
});

// --- INITIAL DATA (Foydalanuvchi yaratish) ---
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
      console.log("✅ Yangi foydalanuvchi yaratildi: sarrof1 / pass123");
    } else {
      console.log("ℹ️ Foydalanuvchi 'sarrof1' allaqachon mavjud.");
    }
  } catch (error) {
    console.error("❌ Foydalanuvchi yaratishda xato:", error.message);
  }
};

// --- SERVER START ---
const PORT = process.env.PORT || 10000;

const start = async () => {
  try {
    console.log("Bazaga ulanish boshlandi...");
    await sequelize.authenticate();
    console.log("✅ PostgreSQL bazasiga ulanish muvaffaqiyatli.");

    // Jadvallarni bazadagi o'zgarishlar bilan moslash (alter: true)
    await sequelize.sync({ alter: true }); 
    console.log("✅ Ma'lumotlar bazasi jadvallari sinxronizatsiya qilindi.");

    // Dastlabki foydalanuvchini tekshirish/yaratish
    await createInitialUser();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("❌ Serverni ishga tushirishda xatolik:", e.message);
  }
};

start();