const { Transaction } = require('../models');

// Barcha tranzaksiyalarni olish
exports.getTransactions = async (req, res) => {
  try {
    const list = await Transaction.findAll({ 
      order: [['createdAt', 'DESC']] 
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Ma'lumotlarni yuklashda xatolik yuz berdi" });
  }
};

// Yangi tranzaksiya qo'shish
exports.addTransaction = async (req, res) => {
  try {
    const { person_name, amount_usd, amount_uzs, type, comment } = req.body;
    
    // Miqdorlarni raqamga o'tkazish (xavfsizlik uchun)
    const newData = await Transaction.create({
      person_name,
      amount_usd: parseFloat(amount_usd) || 0,
      amount_uzs: parseFloat(amount_uzs) || 0,
      type, // 'gave' yoki 'took'
      comment
    });

    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: "Saqlashda xatolik yuz berdi" });
  }
};

// Tranzaksiyani o'chirish
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ where: { id } });
    res.json({ message: "Muvaffaqiyatli o'chirildi" });
  } catch (err) {
    res.status(500).json({ error: "O'chirishda xatolik yuz berdi" });
  }
};

// Tranzaksiyani tahrirlash
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { person_name, amount_usd, amount_uzs, type, comment } = req.body;
    await Transaction.update(
      { person_name, amount_usd, amount_uzs, type, comment },
      { where: { id } }
    );
    res.json({ message: "Muvaffaqiyatli yangilandi" });
  } catch (err) {
    res.status(500).json({ error: "Yangilashda xatolik yuz berdi" });
  }
};