const router = require("express").Router();
const statisticsController = require("../controllers/statisticsControllers");

/**
 * @swagger
 * components:
 *   schemas:
 *     Revenue:
 *       type: object
 *       properties:
 *         month:
 *           type: string
 *           description: Month of the revenue
 *         totalRevenue:
 *           type: number
 *           description: Total revenue for the month
 *     TicketStats:
 *       type: object
 *       properties:
 *         route:
 *           type: string
 *           description: Route name (from-to)
 *         totalTickets:
 *           type: number
 *           description: Total number of tickets sold
 *     MonthlyTicketStats:
 *       type: object
 *       properties:
 *         month:
 *           type: string
 *           description: Month of the statistics
 *         totalTickets:
 *           type: number
 *           description: Total number of tickets sold in the month
 */

/**
 * @swagger
 * /statistics/revenue:
 *   get:
 *     summary: Get monthly revenue statistics
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Monthly revenue statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Revenue'
 */
router.get("/revenue", statisticsController.getRevenue);

/**
 * @swagger
 * /statistics/tickets:
 *   get:
 *     summary: Get ticket statistics by route
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Ticket statistics by route
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketStats'
 */
router.get("/tickets", statisticsController.getTickets);

/**
 * @swagger
 * /statistics/tickets/month:
 *   get:
 *     summary: Get monthly ticket statistics
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Monthly ticket statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MonthlyTicketStats'
 */
router.get("/tickets/month", statisticsController.getTicketsbyMonth);

module.exports = router;
