const express = require("express");
const router = express.Router();
const farmController = require("../controllers/farmController");

router.get("/", farmController.getAllFarms);
router.post("/", farmController.createFarm);

router.get('/farms/:id', getFarmById);
router.get('/soil_assessment/farm/:id', getSoilByFarmId);


module.exports = router;
