// backend/routes/cooperatives.js
const express = require("express");
const router = express.Router();

const coopController = require("../controllers/cooperativeController");

router.get("/", coopController.getAllCooperatives);
router.post("/", coopController.createCooperative);

module.exports = router;
