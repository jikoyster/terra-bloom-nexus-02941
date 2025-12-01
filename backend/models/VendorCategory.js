// backend/models/VendorCategory.js
module.exports = (sequelize, DataTypes) => {
  const VendorCategory = sequelize.define(
    "VendorCategory",
    {
      cat_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "vendor_categories",
      timestamps: false,
    }
  );

  return VendorCategory;
};
