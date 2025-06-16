const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const tripRoutes = require("./src/routes/trip");
const invoiceRoutes = require("./src/routes/invoice");
const invoiceDetailRoutes = require("./src/routes/invoicedetail");
const statisticsRoutes = require("./src/routes/statistics");

dotenv.config();
const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VeloBus API Documentation',
      version: '1.0.0',
      description: 'API documentation for VeloBus application',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
  console.log("Swagger documentation is available at http://localhost:8000/api-docs");
});

//AUTHENTICATION(So sánh password)
//AUTHORIZATION(Kiểm tra quyền)
