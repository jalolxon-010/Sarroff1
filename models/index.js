const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/config"); 

const User = sequelize.define("user", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

// YANGI: Asosiy operatsiyalar modeli (Qarz va Balans uchun)
const Transaction = sequelize.define("transaction", {
  person_name: { 
    type: DataTypes.STRING, 
    allowNull: false // Kim bilan savdo bo'lyapti?
  },
  amount_usd: { 
    type: DataTypes.DECIMAL, 
    defaultValue: 0 // Dollardagi miqdor
  },
  amount_uzs: { 
    type: DataTypes.DECIMAL, 
    defaultValue: 0 // So'mdagi miqdor
  },
  type: { 
    type: DataTypes.ENUM('gave', 'took'), 
    allowNull: false // 'gave' - berdim (plyus), 'took' - oldim (minus)
  },
  comment: { 
    type: DataTypes.STRING, 
    allowNull: true // Izoh (ixtiyoriy)
  }
}, { 
  timestamps: true // Qachon sodir bo'lganini bilish uchun
});

// Eski modellarni (Debtor, ExchangeHistory) olib tashladik, 
// chunki endi hammasi Transaction ichida bo'ladi.
module.exports = { sequelize, User, Transaction };