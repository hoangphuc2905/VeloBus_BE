const router = require("express").Router();
const statisticsController = require("../controllers/statisticsControllers");

// Route thống kê doanh thu theo tháng
router.get("/revenue", statisticsController.getRevenue);

// Route thống kê số lượng vé bán theo tuyến
router.get("/tickets", statisticsController.getTickets);

// Route thống kê số lượng vé bán theo tháng
router.get("/tickets/month", statisticsController.getTicketsbyMonth);

module.exports = router;
