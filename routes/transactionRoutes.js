const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Qarz va Balans boshqaruvi tizimi
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Barcha operatsiyalar ro'yxatini olish
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli ro'yxat
 */
router.get('/', controller.getTransactions);

/**
 * @swagger
 * /api/transactions/add:
 *   post:
 *     summary: Yangi qarz yoki amal qo'shish
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - person_name
 *               - type
 *             properties:
 *               person_name:
 *                 type: string
 *                 example: "Ali Vali"
 *               amount_usd:
 *                 type: number
 *                 example: 100
 *               amount_uzs:
 *                 type: number
 *                 example: 1250000
 *               type:
 *                 type: string
 *                 enum: [gave, took]
 *                 example: "gave"
 *               comment:
 *                 type: string
 *                 example: "Tushlik uchun qarz"
 *     responses:
 *       201:
 *         description: Muvaffaqiyatli yaratildi
 */
router.post('/add', controller.addTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Tranzaksiyani tahrirlash
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               person_name:
 *                 type: string
 *                 example: "Ali Vali"
 *               amount_usd:
 *                 type: number
 *                 example: 200
 *               amount_uzs:
 *                 type: number
 *                 example: 2500000
 *               type:
 *                 type: string
 *                 enum: [gave, took]
 *                 example: "took"
 *               comment:
 *                 type: string
 *                 example: "Qayta hisob-kitob"
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli yangilandi
 *       500:
 *         description: Server xatoligi
 */
router.put('/:id', controller.updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Operatsiyani o'chirish
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: O'chirildi
 */
router.delete('/:id', controller.deleteTransaction);

module.exports = router;