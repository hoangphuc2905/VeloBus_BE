const mongoose = require("mongoose");
const Seat = require("./Seat");

const tripSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Please provide an id"],
      unique: true,
    },
    from: {
      type: String,
      ref: "Station",
      required: [true, "Please provide a starting point"],
    },
    to: {
      type: String,
      ref: "Station",
      required: [true, "Please provide a destination"],
    },
    formTime: {
      type: Date,
      required: [true, "Please provide a starting time"],
    },
    toTime: {
      type: Date,
      required: [true, "Please provide an arrival time"],
    },
    duration: {
      type: String,
      required: [true, "Please provide a duration"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    busType: {
      type: String,
      required: [true, "Please provide a bus type"],
    },
    seats: {
      tangDuoi: [Seat.schema],
      tangTren: [Seat.schema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
