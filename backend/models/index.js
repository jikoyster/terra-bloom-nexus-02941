// models/index.js
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);

// 1️⃣ Initialize Sequelize
const sequelize = new Sequelize('apdb', 'postgres', '00000', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: console.log, // Set to true for debugging SQL queries
});

// 2️⃣ Initialize db object
const db = {};

// 3️⃣ Load models dynamically
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// 4️⃣ Call associate() if it exists
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 5️⃣ Optional associations (example: Farm & SoilAssessment)
if (db.Farm && db.SoilAssessment) {
  db.Farm.hasMany(db.SoilAssessment, { foreignKey: 'farm_id' });
  db.SoilAssessment.belongsTo(db.Farm, { foreignKey: 'farm_id' });
}

// 6️⃣ Test database connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connected'))
  .catch((err) => console.error('❌ Database connection error:', err));

// 7️⃣ Attach Sequelize to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
