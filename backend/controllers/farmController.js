const { Farm } = require("../models");

exports.getAllFarms = async (req, res) => {
  try {
    const farms = await Farm.findAll();
    res.json(farms);
  } catch (err) {
    console.error("Error fetching farms:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createFarm = async (req, res) => {
  try {
    const farm = await Farm.create(req.body);
    res.json(farm);
  } catch (err) {
    console.error("Error creating farm:", err);
    res.status(500).json({ error: "Server error" });
  }
};
