const invoiceDetailController = require("../controllers/invoiceDetailController");

const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     InvoiceDetail:
 *       type: object
 *       required:
 *         - invoiceId
 *         - seatNumber
 *         - price
 *       properties:
 *         invoiceId:
 *           type: string
 *           description: ID of the associated invoice
 *         seatNumber:
 *           type: number
 *           description: Seat number in the trip
 *         price:
 *           type: number
 *           description: Price of the seat
 *         passengerName:
 *           type: string
 *           description: Name of the passenger
 *         passengerPhone:
 *           type: string
 *           description: Phone number of the passenger
 */

/**
 * @swagger
 * /invoiceDetail:
 *   get:
 *     summary: Get all invoice details
 *     tags: [Invoice Details]
 *     responses:
 *       200:
 *         description: List of all invoice details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InvoiceDetail'
 */
router.get("/", invoiceDetailController.getAllInvoiceDetails);

/**
 * @swagger
 * /invoiceDetail/create:
 *   post:
 *     summary: Create a new invoice detail
 *     tags: [Invoice Details]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceDetail'
 *     responses:
 *       201:
 *         description: Invoice detail created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create", invoiceDetailController.createInvoiceDetail);

/**
 * @swagger
 * /invoiceDetail/{id}:
 *   get:
 *     summary: Get invoice details by invoice ID
 *     tags: [Invoice Details]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: List of invoice details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InvoiceDetail'
 *       404:
 *         description: No invoice details found
 */
router.get("/:id", invoiceDetailController.getInvoiceDetailByInvoiceId);

module.exports = router;
