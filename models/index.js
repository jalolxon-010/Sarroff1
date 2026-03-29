const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/config"); 

const User = sequelize.define("user", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

const Transaction = sequelize.define("transaction", {
  person_name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  amount_usd: { 
    type: DataTypes.DECIMAL, 
    defaultValue: 0 
  },
  amount_uzs: { 
    type: DataTypes.DECIMAL, 
    defaultValue: 0 
  },
  type: { 
    type: DataTypes.ENUM('gave', 'took'), 
    allowNull: false 
  },
  comment: { 
    type: DataTypes.STRING, 
    allowNull: true 
  }
}, { 
  timestamps: true 
});

// YANGI: Sozlamalar modeli (Dollar kursi va boshqalar uchun)
const Setting = sequelize.define("setting", {
  key: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false // Masalan: 'usd_rate'
  },
  value: { 
    type: DataTypes.STRING, 
    allowNull: false // Masalan: '12800'
  }
}, { 
  timestamps: false // Sozlamalar uchun vaqt unchalik muhim emas
});

module.exports = { sequelize, User, Transaction, Setting };