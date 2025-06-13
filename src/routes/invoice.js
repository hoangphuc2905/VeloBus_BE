const invoiceController = require('../controllers/invoiceController');

const router = require('express').Router();

//GET ALL INVOICES
router.get('/', invoiceController.getAllInvoices);

//CREATE INVOICE
router.post('/create', invoiceController.createInvoice);

//GET INVOICE BY ID
router.get('/:id', invoiceController.getInvoiceByTripId);

//GET INVOICE BY USER ID
router.get('/user/:id', invoiceController.getInvoiceByUserId);

// GET INVOICE BY INVOICE NUMBER AND USER PHONE
// getInvoiceByInvoiceNumberAndPhone
router.get('/invoiceandphone/:invoiceNumber/:phoneNumber', invoiceController.getInvoiceByInvoiceNumberAndPhone);
module.exports = router;