const { Farm, SoilAssessment } = require("../models");

exports.getByFarmId = async (req, res) => {
  const { farm_id } = req.params;
  try {
    const assessments = await SoilAssessment.findAll({
      where: { farm_id: farm_id },
      order: [["assessment_date", "DESC"]],
      limit: 1,
    });
    res.json(assessments);
  } catch (err) {
    console.error("Error fetching soil assessment:", err);
    res.status(500).json({ error: "Failed to fetch soil assessment" });
  }
};
