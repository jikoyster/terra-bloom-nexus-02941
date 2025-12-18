const { Crop } = require("../models");

/**
 * GET /api/crops
 */
const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.findAll({
      order: [["name", "ASC"]],
    });
    res.json(crops);
  } catch (err) {
    console.error("Error fetching crops:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

/**
 * GET /api/crops/:id
 */
const getCropById = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);
    if (!crop) {
      return res.status(404).json({ error: "Crop not found" });
    }
    res.json(crop);
  } catch (err) {
    console.error("Error fetching crop:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * POST /api/crops
 */
const createCrop = async (req, res) => {
  try {
    const crop = await Crop.create(req.body);
    res.status(201).json(crop);
  } catch (err) {
    console.error("Error creating crop:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

/**
 * PUT /api/crops/:id
 */
const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);
    if (!crop) {
      return res.status(404).json({ error: "Crop not found" });
    }

    await crop.update(req.body);
    res.json(crop);
  } catch (err) {
    console.error("Error updating crop:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

/**
 * DELETE /api/crops/:id
 */
const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);
    if (!crop) {
      return res.status(404).json({ error: "Crop not found" });
    }

    await crop.destroy();
    res.json({ message: "Crop deleted successfully" });
  } catch (err) {
    console.error("Error deleting crop:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
};
