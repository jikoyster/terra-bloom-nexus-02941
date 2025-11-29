module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Farm", {
    farm_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    region: DataTypes.STRING,
    crops: DataTypes.STRING,
    hectares: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: "farms",
    timestamps: false
  });

  return Farm;
};
