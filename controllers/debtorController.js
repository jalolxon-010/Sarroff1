const { Debtor } = require('../models');
const { Op } = require('sequelize');

exports.getAllDebtors = async (req, res) => {
  try {
    const data = await Debtor.findAll({ order: [['id', 'DESC']] });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addDebtor = async (req, res) => {
  try {
    const debtorData = {
      fullname: req.body.fullname,
      amount_usd: parseFloat(req.body.amount_usd),
      rate: req.body.rate ? parseFloat(req.body.rate) : null,
      return_date: req.body.return_date || null,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };

    const debtor = await Debtor.create(debtorData);
    res.status(201).json(debtor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchDebtor = async (req, res) => {
  try {
    const { name } = req.query;
    const data = await Debtor.findAll({
      where: {
        fullname: { [Op.iLike]: `%${name}%` }
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDebtor = async (req, res) => {
  try {
    await Debtor.destroy({ where: { id: req.params.id } });
    res.json({ message: "Qazor muvaffaqiyatli o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};