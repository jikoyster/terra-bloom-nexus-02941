const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { sequelize } = require("./models");
const farmController = require("./controllers/farmController");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/api/farms", farmController.getAllFarms);
app.post("/api/farms", farmController.createFarm);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL ✔");

    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
