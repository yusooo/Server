const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Goal = require('./Goal');
const Daily = require('./Daily');
const Weekly = require('./Weekly');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Goal = Goal;
db.Daily = Daily;
db.Weekly = Weekly;


User.init(sequelize);
Goal.init(sequelize);
Daily.init(sequelize);
Weekly.init(sequelize);

User.associaate(db);
Goal.associate(db);
Daily.associate(db);
Weekly.associate(db);

module.exports = db;