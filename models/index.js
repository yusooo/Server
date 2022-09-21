const mysql = require('mysql');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./User');
const Goal = require('./Goal');
const Weight = require('./Weight');
const Domain = require('./Domain');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Goal = Goal;
db.Weight = Weight;
db.Domain = Domain;


User.init(sequelize);
Goal.init(sequelize);
Weight.init(sequelize);
Domain.init(sequelize);

db.User.hasMany(db.Goal, {foreignKey: 'Goal_id', sourceKey: 'user_id'});
db.Goal.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'user_id'});

db.User.hasMany(db.Weight, {foreignKey: 'Weight_id', sourceKey: 'user_id'});
db.Weight.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'user_id'});

db.User.hasOne(db.Domain, {foreignKey: 'clientSecret', sourceKey: 'user_id'});
db.Domain.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'user_id'});

module.exports = db;