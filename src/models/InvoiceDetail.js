const mongoose = require("mongoose");

const invoiceDetailSchema = new mongoose.Schema(
  {
    invoice: {
      type: String,
      ref: "Invoice",
      required: true,
    },
    trip: {
      type: String,
      ref: "Trip", 
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: function () {
        return this.quantity * this.unitPrice;
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InvoiceDetail", invoiceDetailSchema);
