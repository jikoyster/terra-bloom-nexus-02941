// backend/routes/vendors.js
const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

router.get("/", vendorController.getAllVendors);
router.post("/", vendorController.createVendor); // must match export

router.get("/unverified", vendorController.getUnverifiedVendors);
router.patch("/:id/approve", vendorController.approveVendor);

module.exports = router;
