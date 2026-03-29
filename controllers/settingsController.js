const { Setting } = require('../models');

// 1. Dollar kursini olish
const getUsdRate = async (req, res) => {
    try {
        // Bazadan 'usd_rate' kalitiga ega qatorni qidiramiz
        const data = await Setting.findOne({ where: { key: 'usd_rate' } });
        
        if (data) {
            res.json({ rate: data.value });
        } else {
            res.status(404).json({ message: "Kurs topilmadi" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Dollar kursini yangilash
const updateUsdRate = async (req, res) => {
    const { rate } = req.body;
    try {
        // Kursni yangilaymiz
        const [updated] = await Setting.update(
            { value: String(rate) }, // Yangi qiymat
            { where: { key: 'usd_rate' } } // Qaysi qatorni yangilash kerak?
        );

        if (updated) {
            res.json({ message: "Kurs yangilandi", newRate: rate });
        } else {
            res.status(404).json({ message: "Yangilash uchun kurs topilmadi" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getUsdRate,
    updateUsdRate
};