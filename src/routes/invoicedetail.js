const invoiceDetailController = require("../controllers/invoiceDetailController");

const router = require("express").Router();

//GET ALL INVOICE DETAILS
router.get("/", invoiceDetailController.getAllInvoiceDetails);

//CREATE INVOICE DETAIL
router.post("/create", invoiceDetailController.createInvoiceDetail);

// Get invoice detail by invoice id
router.get("/:id", invoiceDetailController.getInvoiceDetailByInvoiceId);


module.exports = router;
