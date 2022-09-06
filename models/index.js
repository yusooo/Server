const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./User');
const Goal = require('./Goal');
const Weight = require('./Weight');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Goal = Goal;
db.Weight = Weight;


User.init(sequelize);
Goal.init(sequelize);
Weight.init(sequelize);

User.associaate(db);
Goal.associate(db);
Weight.associate(db);

module.exports = db;