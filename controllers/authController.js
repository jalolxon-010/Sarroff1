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
    const user = await User.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );
      return res.json({ token, username: user.username });
    }

    res.status(401).json({ message: "Login yoki parol xato!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};