const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

// GET all farmers
router.get('/', farmerController.getAllFarmers);

// POST create farmer
router.post('/', farmerController.createFarmer);

module.exports = router;
