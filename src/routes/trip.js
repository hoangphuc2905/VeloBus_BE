const middlewareControllers = require("../controllers/middlewareControllers");
const tripController = require("../controllers/tripController");

const router = require("express").Router();

//GET ALL TRIPS
router.get("/", tripController.getAllTrips);

//CREATE TRIP
router.post("/create", tripController.createTrip);

//DELETE TRIP
router.delete("/:id", tripController.deleteTrip);

//UPDATE TRIP
router.put("/updatetrips/:id", tripController.updateTrip);

//GET TRIP BY ID
router.get("/:id", tripController.getTripById);

//GET TRIP BY FROM AND TO
router.get("/fromto/:from/:to", tripController.getTripByFromTo);
// update seats
router.put("/updateSeatStatus/:id", tripController.updateSeatStatus);

module.exports = router;
