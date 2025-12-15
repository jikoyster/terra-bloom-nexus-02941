// backend/server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { sequelize } = require("./models"); // don't destructure Farm here
const farmController = require("./controllers/farmController");
const farmerController = require("./controllers/farmerController");

const cooperativeController = require("./controllers/cooperativeController");

const authRoutes = require("./routes/auth");
const farmerRoutes = require("./routes/farmers");
const vendorRoutes = require("./routes/vendors");
const cooperativeRoutes = require("./routes/cooperatives");
const soilRoutes = require("./routes/soilAssessmentRoutes"); // soil assessment

const app = express(); // <-- app must be declared BEFORE using it

app.use(cors());
app.use(bodyParser.json());

// AI routes
app.use(express.json());

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);
//\ 

// Farm routes
app.get("/api/farms", farmController.getAllFarms);
app.post("/api/farms", farmController.createFarm);
app.get("/api/farms/:id", farmController.getFarmById);

// Soil assessment routes
app.use("/api/soil_assessment", soilRoutes);

// Farmer routes
app.use("/api/farmers", farmerRoutes);
// Vendor routes
app.use("/api/vendors", vendorRoutes);
// Cooperative routes
app.use("/api/cooperatives", cooperativeRoutes);
app.get("/api/cooperatives/:id", cooperativeController.getCooperativeById);
// Auth routes
app.use("/api/auth", authRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL ✔");

    // Sync tables
    await sequelize.sync({ alter: true });

    app.listen(5000, () =>
      console.log("Server running on http://localhost:5000")
    );
  } catch (err) {
    console.error("Failed to start server:", err);
  }

  console.log("OpenAI key loaded:", !!process.env.OPENAI_API_KEY);
})();
