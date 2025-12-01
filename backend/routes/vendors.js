// backend/routes/vendors.js
const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

// GET all vendors
router.get("/", vendorController.getAllVendors);

// POST new vendor
router.post("/", vendorController.createVendor); // must match export

module.exports = router;
