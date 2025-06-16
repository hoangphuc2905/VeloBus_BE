const middlewareControllers = require("../controllers/middlewareControllers");
const tripController = require("../controllers/tripController");

const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Trip:
 *       type: object
 *       required:
 *         - from
 *         - to
 *         - departureTime
 *         - price
 *       properties:
 *         from:
 *           type: string
 *           description: Starting location
 *         to:
 *           type: string
 *           description: Destination location
 *         departureTime:
 *           type: string
 *           format: date-time
 *           description: Trip departure time
 *         price:
 *           type: number
 *           description: Trip price
 *         seats:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               seatNumber:
 *                 type: number
 *               isBooked:
 *                 type: boolean
 */

/**
 * @swagger
 * /trip:
 *   get:
 *     summary: Get all trips
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: List of all trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */
router.get("/", tripController.getAllTrips);

/**
 * @swagger
 * /trip/create:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       201:
 *         description: Trip created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create", tripController.createTrip);

/**
 * @swagger
 * /trip/{id}:
 *   delete:
 *     summary: Delete a trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 *       404:
 *         description: Trip not found
 */
router.delete("/:id", tripController.deleteTrip);

/**
 * @swagger
 * /trip/updatetrips/{id}:
 *   put:
 *     summary: Update a trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *       404:
 *         description: Trip not found
 */
router.put("/updatetrips/:id", tripController.updateTrip);

/**
 * @swagger
 * /trip/{id}:
 *   get:
 *     summary: Get trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Trip details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       404:
 *         description: Trip not found
 */
router.get("/:id", tripController.getTripById);

/**
 * @swagger
 * /trip/fromto/{from}/{to}:
 *   get:
 *     summary: Get trips by from and to locations
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: from
 *         schema:
 *           type: string
 *         required: true
 *         description: Starting location
 *       - in: path
 *         name: to
 *         schema:
 *           type: string
 *         required: true
 *         description: Destination location
 *     responses:
 *       200:
 *         description: List of matching trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */
router.get("/fromto/:from/:to", tripController.getTripByFromTo);

/**
 * @swagger
 * /trip/updateSeatStatus/{id}:
 *   put:
 *     summary: Update seat status for a trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seatNumber
 *               - isBooked
 *             properties:
 *               seatNumber:
 *                 type: number
 *               isBooked:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Seat status updated successfully
 *       404:
 *         description: Trip not found
 */
router.put("/updateSeatStatus/:id", tripController.updateSeatStatus);

module.exports = router;
