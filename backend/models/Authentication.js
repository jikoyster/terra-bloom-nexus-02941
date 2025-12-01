// backend/models/Authentication.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Authentication",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      full_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      last_sign_in_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: "authentication",
      timestamps: false,
    }
  );
};
