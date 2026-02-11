const express = require("express");
const router = express.Router();
const farmController = require("../controllers/farmController");

// Create a new farm
router.post("/", farmController.createFarm);

// Get all farms
router.get("/", farmController.getAllFarms);

// Get farm by ID
router.get("/:id", farmController.getFarmById);

// Update farm by ID
router.put("/:id", farmController.updateFarm);

// Delete farm by ID
router.delete("/:id", farmController.deleteFarm);

// Get soil assessments for a farm
router.get("/:id/soil", farmController.getSoilByFarmId);

module.exports = router;
