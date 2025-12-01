// backend/models/Vendor.js
module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define(
    "Vendor",
    {
      vendor_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      category_id: { type: DataTypes.INTEGER },
      address: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING, defaultValue: "Unverified" },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "vendors",
      timestamps: false,
    }
  );

  Vendor.associate = (models) => {
    Vendor.belongsTo(models.VendorCategory, {
      foreignKey: "category_id",
      as: "category",
    });
  };

  return Vendor;
};
