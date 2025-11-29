const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// --------------------------------------------
// 1. INIT SEQUELIZE
// --------------------------------------------
const sequelize = new Sequelize("apdb", "postgres", "00000", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

// --------------------------------------------
// 2. LOAD MODEL (after sequelize is created)
// --------------------------------------------
const Farm = require("./models/Farms")(sequelize, DataTypes);

// --------------------------------------------
// 3. ROUTES
// --------------------------------------------
app.get("/api/farms", async (req, res) => {
  try {
    const list = await Farm.findAll();
    res.json(list);
  } catch (err) {
    console.error("Error fetching farms:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// --------------------------------------------
// 4. START SERVER
// --------------------------------------------
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL ✔");

    app.listen(5000, () => console.log("Server running at http://localhost:5000"));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
