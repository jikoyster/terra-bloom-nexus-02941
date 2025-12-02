// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize, Farm } = require("./models");
const authRoutes = require("./routes/auth");
const farmController = require("./controllers/farmController"); // keep your farm logic
const farmerController = require("./controllers/farmerController");

const farmerRoutes = require("./routes/farmers");
const vendorRoutes = require("./routes/vendors");
const cooperativeRoutes = require("./routes/cooperatives");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Farm routes
app.get("/api/farms", farmController.getAllFarms);
app.post("/api/farms", farmController.createFarm);

// Farmer routes
app.use("/api/farmers", farmerRoutes);
// Vendor routes
app.use("/api/vendors", vendorRoutes);
// Cooperative routes
app.use("/api/cooperatives", cooperativeRoutes);
// Authentication routes
app.use("/api/auth", authRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL ✔");

    // Optional: sync models (creates tables if not exist)
    await sequelize.sync({ alter: true });

    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
