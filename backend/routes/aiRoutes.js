const express = require("express");
const router = express.Router();
const {
  chat,
  soilRecommendation
} = require("../controllers/aiController");

router.post("/chat", chat);
router.post("/soil-recommendation", soilRecommendation);

module.exports = router;
