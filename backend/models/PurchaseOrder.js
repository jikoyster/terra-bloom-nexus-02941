// models/PurchaseOrder.js
module.exports = (sequelize, DataTypes) => {
  const PurchaseOrder = sequelize.define('PurchaseOrder', {
    po_id: { 
      type: DataTypes.STRING(6), 
      primaryKey: true, 
      defaultValue: sequelize.literal("generate_po_id()") 
    },
    farm_id: { type: DataTypes.INTEGER, allowNull: false },
    sector_specialization: { type: DataTypes.STRING },
    notes: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'purchase_orders',
    timestamps: false,
  });

  return PurchaseOrder;
};
