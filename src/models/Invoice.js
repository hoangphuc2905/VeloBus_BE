const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    trip: {
      type: String,
      ref: "Trip",
      required: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "CANCELLED"],
      default: "PENDING",
    },
    paymentMethod: {
      type: String,
      enum: ["CASH", "CREDIT_CARD", "BANK_TRANSFER"],
      required: true,
    },
    notes: {
      type: String,
    },
    invoiceDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InvoiceDetail",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
