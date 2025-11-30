// models/Farm.js
module.exports = (sequelize, DataTypes) => {
  const Farm = sequelize.define(
    "Farm",
    {
      farm_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      name: DataTypes.TEXT,
      region: DataTypes.TEXT,
      address: DataTypes.TEXT,
      crops: DataTypes.TEXT,
      hectares: DataTypes.BIGINT,
      carbon_sequestered: DataTypes.BIGINT,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      tableName: "farms",
      timestamps: false
    }
  );

  return Farm;
};
