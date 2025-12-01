// backend/models/Farmer.js
module.exports = (sequelize, DataTypes) => {
  const Farmers = sequelize.define(
    "Farmer",
    {
      farmer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      products: { type: DataTypes.TEXT, allowNull: true },
      stock_level: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
      status: { type: DataTypes.STRING, allowNull: true },
      location: { type: DataTypes.STRING, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: true },
      updated_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: "farmers",
      timestamps: false,
    }
  );

  return Farmers;
};
