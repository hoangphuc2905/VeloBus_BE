const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide a seat ID"],
  },
  status: {
    type: String,
    enum: ["available", "sold", "selected"],
    default: "available",
    required: [true, "Please provide a seat status"],
  },
});

module.exports = mongoose.model("Seat", seatSchema);
