const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('apdb', 'postgres', '00000', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

const Farm = require('./Farm')(sequelize, DataTypes);

module.exports = { sequelize, Farm };
