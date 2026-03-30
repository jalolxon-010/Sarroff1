const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Tizim sozlamalari
 */

/**
 * @swagger
 * /api/settings/usd-rate:
 *   get:
 *     summary: Joriy dollar kursini olish
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Joriy kurs muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rate:
 *                   type: string
 *                   example: "12850"
 */
router.get('/usd-rate', settingsController.getUsdRate);

/**
 * @swagger
 * /api/settings/usd-rate:
 *   post:
 *     summary: Dollar kursini yangilash
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rate:
 *                 type: string
 *                 description: Yangi dollar kursi
 *                 example: "12900"
 *     responses:
 *       200:
 *         description: Kurs muvaffaqiyatli yangilandi
 *       500:
 *         description: Serverda xatolik yuz berdi
 */
router.post('/usd-rate', settingsController.updateUsdRate);

module.exports = router;