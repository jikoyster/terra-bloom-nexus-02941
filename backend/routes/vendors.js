// backend/routes/vendors.js
const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

router.get("/", vendorController.getAllVendors);
router.post("/", vendorController.createVendor); // must match export

module.exports = router;
