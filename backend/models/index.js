const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const sequelize = new Sequelize("apdb", "postgres", "00000", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false
});

const db = {};

// Load all models
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Example associations
if (db.Farm && db.SoilAssessment) {
  db.Farm.hasMany(db.SoilAssessment, { foreignKey: "farm_id" });
  db.SoilAssessment.belongsTo(db.Farm, { foreignKey: "farm_id" });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
