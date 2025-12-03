// controllers/farmController.js
const { Farm, SoilAssessment } = require("../models");

exports.getAllFarms = async (req, res) => {
  const farms = await Farm.findAll();
  res.json(farms);
};

exports.createFarm = async (req, res) => {
  const { name, region, crops, hectares, yield } = req.body;
  const farm = await Farm.create({ name, region, crops, hectares, yield });
  res.json(farm);
};

// Add these two:
exports.getFarmById = async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findByPk(id);
  if (!farm) return res.status(404).json({ error: "Farm not found" });
  res.json(farm);
};

exports.getSoilByFarmId = async (req, res) => {
  const { id } = req.params;
  const soil = await SoilAssessment.findAll({ where: { farm_id: id } });
  res.json(soil);
};
