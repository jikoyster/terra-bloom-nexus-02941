module.exports = (sequelize, DataTypes) => {
  const Crop = sequelize.define(
    "Crop",
    {
      crop_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      ph_min: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: true,
      },
      ph_max: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: true,
      },
      nitrogen_requirement_kg_per_ha: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      phosphorus_requirement_kg_per_ha: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      potassium_requirement_kg_per_ha: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      typical_yield_kg_per_ha: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
    },
    {
      tableName: "crops",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Crop;
};
