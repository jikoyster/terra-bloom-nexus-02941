const { Farmer } = require('../models');

exports.getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.findAll();
    res.json(farmers);
  } catch (err) {
    console.error('Error fetching farmers:', err);
    res.status(500).json({ error: 'Failed to fetch farmers' });
  }
};

exports.createFarmer = async (req, res) => {
  const { name, products, status, address, email } = req.body;
  try {
    const newFarmer = await Farmer.create({ name, products, status, address, email });
    res.json(newFarmer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create farmer' });
  }
};
