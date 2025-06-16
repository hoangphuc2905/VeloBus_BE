const invoiceController = require('../controllers/invoiceController');

const router = require('express').Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       required:
 *         - tripId
 *         - userId
 *         - invoiceNumber
 *         - totalAmount
 *       properties:
 *         tripId:
 *           type: string
 *           description: ID of the associated trip
 *         userId:
 *           type: string
 *           description: ID of the user who made the booking
 *         invoiceNumber:
 *           type: string
 *           description: Unique invoice number
 *         totalAmount:
 *           type: number
 *           description: Total amount of the invoice
 *         status:
 *           type: string
 *           description: Status of the invoice
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date of the invoice
 */

/**
 * @swagger
 * /invoice:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of all invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 */
router.get('/', invoiceController.getAllInvoices);

/**
 * @swagger
 * /invoice/create:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/create', invoiceController.createInvoice);

/**
 * @swagger
 * /invoice/{id}:
 *   get:
 *     summary: Get invoice by trip ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Invoice details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
 */
router.get('/:id', invoiceController.getInvoiceByTripId);

/**
 * @swagger
 * /invoice/user/{id}:
 *   get:
 *     summary: Get invoices by user ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of user's invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: No invoices found for this user
 */
router.get('/user/:id', invoiceController.getInvoiceByUserId);

/**
 * @swagger
 * /invoice/invoiceandphone/{invoiceNumber}/{phoneNumber}:
 *   get:
 *     summary: Get invoice by invoice number and phone number
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: invoiceNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Invoice number
 *       - in: path
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: User's phone number
 *     responses:
 *       200:
 *         description: Invoice details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
 */
router.get('/invoiceandphone/:invoiceNumber/:phoneNumber', invoiceController.getInvoiceByInvoiceNumberAndPhone);

module.exports = router;