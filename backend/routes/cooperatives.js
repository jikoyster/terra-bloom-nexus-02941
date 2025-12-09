// backend/routes/cooperatives.js
const express = require("express");
const router = express.Router();

const coopController = require("../controllers/cooperativeController");

router.get("/", coopController.getAllCooperatives);
router.post("/", coopController.createCooperative);

router.get("/cooperatives/:id", async (req, res) => {
  const coop = await Cooperative.findByPk(req.params.id);
  res.json(coop);
});

module.exports = router;
