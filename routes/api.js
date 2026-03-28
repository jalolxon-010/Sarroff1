const router = require('express').Router();
const authController = require('../controllers/authController');
const debtorController = require('../controllers/debtorController');
const multer = require('multer');
const path = require('path');

// Multer sozlamasi
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Tizimga kirish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: sarrof1
 *               password:
 *                 type: string
 *                 example: pass123
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/debtors:
 *   get:
 *     summary: Barcha qarzdorlarni olish
 *     tags: [Debtors]
 *     responses:
 *       200:
 *         description: Ro'yxat qaytdi
 */
router.get('/debtors', debtorController.getAllDebtors);

/**
 * @swagger
 * /api/debtors/search:
 *   get:
 *     summary: Ism bo'yicha qidirish
 *     tags: [Debtors]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: Ali
 *     responses:
 *       200:
 *         description: Natija qaytdi
 */
router.get('/debtors/search', debtorController.searchDebtor);

/**
 * @swagger
 * /api/debtors/add:
 *   post:
 *     summary: Yangi qarzdor qo'shish
 *     tags: [Debtors]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - amount_usd
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Muhammadali Valiyev
 *               amount_usd:
 *                 type: number
 *                 example: 1000
 *               rate:
 *                 type: number
 *                 example: 12000
 *               return_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-01
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Yaratildi
 */
router.post('/debtors/add', upload.single('image'), debtorController.addDebtor);

/**
 * @swagger
 * /api/debtors/{id}:
 *   delete:
 *     summary: Qarzdorni o'chiris
 *     tags: [Debtors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: O'chirildi
 */
router.delete('/debtors/:id', debtorController.deleteDebtor);

module.exports = router;