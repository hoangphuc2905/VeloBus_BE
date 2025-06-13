const Invoice = require("../models/Invoice");
const mongoose = require("mongoose");
const InvoiceDetail = require("../models/InvoiceDetail");

const invoiceController = {
  //GET ALL INVOICES
  getAllInvoices: async (req, res) => {
    try {
      const invoices = await Invoice.find();
      res.status(200).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // CREATE INVOICE WITH GENERATING INVOICE NUMBER
  createInvoice: async (req, res) => {
    try {
      // Kiểm tra dữ liệu nhập
      const {
        user,
        trip,
        totalAmount,
        status,
        paymentMethod,
        notes,
        invoiceDetails,
      } = req.body;

      if (!user || !trip || !totalAmount) {
        return res
          .status(400)
          .json({ error: "Vui lòng cung cấp đầy đủ thông tin." });
      }

      // Tạo số hóa đơn
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const pattern = `^INV${year}${month}${day}`;

      const lastInvoice = await Invoice.findOne({
        invoiceNumber: new RegExp(pattern, "i"),
      }).sort({ invoiceNumber: -1 });

      let nextNumber = 1;

      if (lastInvoice) {
        const lastNumber = parseInt(lastInvoice.invoiceNumber.slice(-3), 10);
        nextNumber = lastNumber + 1;
      }

      const invoiceNumber = `INV${year}${month}${day}${nextNumber
        .toString()
        .padStart(3, "0")}`;
      console.log("New Invoice Number:", invoiceNumber);

      const newInvoice = new Invoice({
        invoiceNumber,
        user,
        trip,
        totalAmount,
        status,
        paymentMethod,
        notes,
      });

      await newInvoice.save();

      const updatedInvoiceDetails = invoiceDetails.map((detail) => ({
        ...detail,
        invoice: newInvoice.invoiceNumber,
      }));

      const createdInvoiceDetails = await InvoiceDetail.insertMany(
        updatedInvoiceDetails
      );

      newInvoice.invoiceDetails = createdInvoiceDetails.map(
        (detail) => detail._id
      );
      await newInvoice.save();

      res.status(201).json(newInvoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get invoice by user id
  getInvoiceByUserId: async (req, res) => {
    try {
      // Sử dụng req.params.userId hoặc req.params.id tùy thuộc vào cách bạn định nghĩa URL
      const userId = req.params.userId || req.params.id;
      const invoices = await Invoice.find({ user: userId }).populate(
        "invoiceDetails"
      ); // Thay 'invoiceDetails' với trường cần populate

      if (invoices.length === 0) {
        return res
          .status(404)
          .json({ message: "No invoices found for this user." });
      }

      res.status(200).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get invoice by trip id
  getInvoiceByTripId: async (req, res) => {
    try {
      const invoices = await Invoice.find({ trip: req.params.id });
      res.status(200).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get invoice by invoice number and phone number
  getInvoiceByInvoiceNumberAndPhone: async (req, res) => {
    try {
      const { invoiceNumber, phoneNumber } = req.params;

      const invoice = await Invoice.findOne({
        invoiceNumber,
        user: phoneNumber,
      });

      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found." });
      }

      res.status(200).json(invoice);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = invoiceController;
