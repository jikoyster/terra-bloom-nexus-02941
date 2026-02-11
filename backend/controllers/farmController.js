// controllers/farmController.js
const { Farm, SoilAssessment } = require("../models");

// Create a new farm
exports.createFarm = async (req, res) => {
  try {
    const { name, region, crops, hectares, yield, address, carbon_sequestered } = req.body;
    
    if (!name || !region) {
      return res.status(400).json({ error: "Name and region are required" });
    }

    const farm = await Farm.create({
      name,
      region,
      crops: crops || null,
      hectares: hectares || null,
      yield: yield || null,
      address: address || null,
      carbon_sequestered: carbon_sequestered || 0,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(farm);
  } catch (error) {
    console.error("Error creating farm:", error);
    res.status(500).json({ error: "Failed to create farm" });
  }
};

// Get all farms
exports.getAllFarms = async (req, res) => {
  try {
    const farms = await Farm.findAll();
    res.json(farms);
  } catch (error) {
    console.error("Error fetching farms:", error);
    res.status(500).json({ error: "Failed to fetch farms" });
  }
};

// Get farm by ID
exports.getFarmById = async (req, res) => {
  try {
    const { id } = req.params;
    const farm = await Farm.findByPk(id);
    if (!farm) return res.status(404).json({ error: "Farm not found" });
    res.json(farm);
  } catch (error) {
    console.error("Error fetching farm:", error);
    res.status(500).json({ error: "Failed to fetch farm" });
  }
};

// Update farm
exports.updateFarm = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, region, crops, hectares, yield, address, carbon_sequestered } = req.body;
    
    const farm = await Farm.findByPk(id);
    if (!farm) return res.status(404).json({ error: "Farm not found" });
    
    await farm.update({
      name: name || farm.name,
      region: region || farm.region,
      crops: crops !== undefined ? crops : farm.crops,
      hectares: hectares !== undefined ? hectares : farm.hectares,
      yield: yield !== undefined ? yield : farm.yield,
      address: address !== undefined ? address : farm.address,
      carbon_sequestered: carbon_sequestered !== undefined ? carbon_sequestered : farm.carbon_sequestered,
      updated_at: new Date()
    });
    res.json(farm);
  } catch (error) {
    console.error("Error updating farm:", error);
    res.status(500).json({ error: "Failed to update farm" });
  }
};

// Delete farm
exports.deleteFarm = async (req, res) => {
  try {
    const { id } = req.params;
    const farm = await Farm.findByPk(id);
    if (!farm) return res.status(404).json({ error: "Farm not found" });
    
    await farm.destroy();
    res.json({ message: "Farm deleted successfully" });
  } catch (error) {
    console.error("Error deleting farm:", error);
    res.status(500).json({ error: "Failed to delete farm" });
  }
};

// Get soil assessments by farm ID
exports.getSoilByFarmId = async (req, res) => {
  try {
    const { id } = req.params;
    const soil = await SoilAssessment.findAll({ where: { farm_id: id } });
    res.json(soil);
  } catch (error) {
    console.error("Error fetching soil assessments:", error);
    res.status(500).json({ error: "Failed to fetch soil assessments" });
  }
};
