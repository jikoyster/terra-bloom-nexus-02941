// backend/models/VendorCategory.js
module.exports = (sequelize, DataTypes) => {
  const VendorCategory = sequelize.define(
    "VendorCategory",
    {
      cat_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "vendor_categories",
      timestamps: false,
    }
  );

  VendorCategory.associate = (models) => {
    VendorCategory.hasMany(models.Vendor, {
      foreignKey: "category_id",
      as: "vendors",
    });
  };

  return VendorCategory;
};
