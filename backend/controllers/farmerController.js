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

exports.updateFarmer = async (req, res) => {
  const { id } = req.params;
  const { name, products, status, address, email } = req.body;
  try {
    const farmer = await Farmer.findByPk(id);
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    
    await farmer.update({ name, products, status, address, email });
    res.json(farmer);
  } catch (err) {
    console.error('Error updating farmer:', err);
    res.status(500).json({ error: 'Failed to update farmer' });
  }
};

exports.deleteFarmer = async (req, res) => {
  const { id } = req.params;
  try {
    const farmer = await Farmer.findByPk(id);
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    
    await farmer.destroy();
    res.json({ message: 'Farmer deleted successfully' });
  } catch (err) {
    console.error('Error deleting farmer:', err);
    res.status(500).json({ error: 'Failed to delete farmer' });
  }
};
