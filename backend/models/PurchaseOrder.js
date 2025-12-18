module.exports = (sequelize, DataTypes) => {
  const PurchaseOrder = sequelize.define('PurchaseOrder', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    farm_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    details: { type: DataTypes.STRING },
  }, {
    tableName: 'purchase_orders', // exact table name in Postgres
    timestamps: false,
  });

  return PurchaseOrder;
};
