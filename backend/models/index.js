// backend/models/index.js
const { Sequelize, DataTypes } = require("sequelize");

// Connect to PostgreSQL
const sequelize = new Sequelize("apdb", "postgres", "00000", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

// Import models
const Farm = require("./Farm")(sequelize, DataTypes);
const Farmer = require("./Farmer")(sequelize, DataTypes);

const VendorCategory = require("./VendorCategory")(sequelize, DataTypes);
const Vendor = require("./Vendor")(sequelize, DataTypes);

const Cooperative = require("./Cooperative")(sequelize, DataTypes);

const Authentication = require("./Authentication")(sequelize, DataTypes);

// Define associations
Vendor.associate({ VendorCategory });

// Export sequelize and models
module.exports = {
  sequelize,
  Farm,
  Farmer,
  Vendor,
  VendorCategory,
  Cooperative,
  Authentication,
};
