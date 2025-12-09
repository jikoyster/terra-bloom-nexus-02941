// backend/controllers/cooperativeController.js
const { Cooperative } = require("../models");

exports.getAllCooperatives = async (req, res) => {
  try {
    const cooperatives = await Cooperative.findAll();
    res.json(cooperatives);
  } catch (err) {
    console.error("Error fetching cooperatives:", err);
    res.status(500).json({ error: "Failed to fetch cooperatives" });
  }
};

exports.createCooperative = async (req, res) => {
  try {
    const {
      name,
      registration_no,
      status,
      address,
      region,
      contact_person,
      phone,
      email,
      members_count,
      established_at,
    } = req.body;

    const newCoop = await Cooperative.create({
      name,
      registration_no,
      status,
      address,
      region,
      contact_person,
      phone,
      email,
      members_count,
      established_at,
    });

    res.json(newCoop);
  } catch (err) {
    console.error("Error creating cooperative:", err);
    res.status(500).json({ error: "Failed to create cooperative" });
  }
};

exports.getCooperativeById = async (req, res) => {
  const { id } = req.params;
  const coop = await Cooperative.findByPk(id);
  if (!coop) return res.status(404).json({ error: "Cooperative not found" });
  res.json(coop);
};
