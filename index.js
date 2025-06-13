const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const tripRoutes = require("./src/routes/trip");
const invoiceRoutes = require("./src/routes/invoice");
const invoiceDetailRoutes = require("./src/routes/invoicedetail");
const statisticsRoutes = require("./src/routes/statistics");

dotenv.config();
const app = express();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/trip", tripRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/invoiceDetail", invoiceDetailRoutes);
app.use("/statistics", statisticsRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

//AUTHENTICATION(So sánh password)
//AUTHORIZATION(Kiểm tra quyền)
