const express = require("express");
const router = express.Router();
const soilController = require("../controllers/soilAssessmentController");

router.get("/farm/:farm_id", soilController.getByFarmId);

module.exports = router;
