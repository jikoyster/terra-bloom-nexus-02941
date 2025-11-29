const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("apdb", "postgres", "00000", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

// Load models
const FarmModel = require("./Farms")(sequelize, DataTypes);

module.exports = {
  sequelize,
  Farm: FarmModel,
};
