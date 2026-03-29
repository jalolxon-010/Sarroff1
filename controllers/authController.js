const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  console.log("Login so'rovi keldi:", req.body); // SHU QATORNI QO'SHING
  // ... qolgan kodlar
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("1. Kelgan username:", username);

    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log("2. Foydalanuvchi topilmadi!");
      return res.status(401).json({ message: "Bunday foydalanuvchi yo'q!" });
    }

    console.log("3. Foydalanuvchi topildi, parolni tekshiramiz...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("4. Parol mos keldimi?:", isMatch);

    if (isMatch) {
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );
      return res.json({ token, username: user.username });
    }

    res.status(401).json({ message: "Parol xato!" });
  } catch (error) {
    console.log("Xatolik:", error.message);
    res.status(500).json({ message: error.message });
  }
};