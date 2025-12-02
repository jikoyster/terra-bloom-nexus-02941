// backend/models/Cooperative.js
module.exports = (sequelize, DataTypes) => {
  const Cooperative = sequelize.define(
    "Cooperative",
    {
      coop_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      registration_no: { type: DataTypes.STRING, allowNull: true, unique: true },
      status: { type: DataTypes.STRING, allowNull: true, defaultValue: "Active" },
      address: { type: DataTypes.STRING, allowNull: true },
      region: { type: DataTypes.STRING, allowNull: true },
      contact_person: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: true },
      members_count: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
      established_at: { type: DataTypes.DATEONLY, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: true },
      updated_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: "cooperatives",
      timestamps: false,
    }
  );

  return Cooperative;
};
