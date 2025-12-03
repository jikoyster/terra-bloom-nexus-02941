// models/SoilAssessment.js
module.exports = (sequelize, DataTypes) => {
  const SoilAssessment = sequelize.define(
    "SoilAssessment",
    {
      assessment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      farm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ph_level: {
        type: DataTypes.FLOAT,
      },
      nitrogen: {
        type: DataTypes.FLOAT,
      },
      phosphorus: {
        type: DataTypes.FLOAT,
      },
      potassium: {
        type: DataTypes.FLOAT,
      },
      organic_matter: {
        type: DataTypes.FLOAT,
      },
      assessment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      notes: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "soil_assessment",
      timestamps: false,
    }
  );

  return SoilAssessment;
};
