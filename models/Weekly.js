// const Sequelize = require('sequelize');
// const daily = require('./Daily');

// module.exports = class Weekly extends Sequelize.Model{
//     static init(sequelize){
//         return super.init({
//             Week_First: {
//                 type: Sequelize.INTEGER(6),
//                 allowNull: false,
//                 defaultValue: '0',
//             },
//             Week_Second: {
//                 type: Sequelize.INTEGER(6),
//                 allowNull: false,
//                 defaultValue: '0',
//             },
//             Week_Third: {
//                 type: Sequelize.INTEGER(6),
//                 allowNull: false,
//                 defaultValue: '0',
//             },
//             Week_Fourth:{
//                 type: Sequelize.INTEGER(6),
//                 allowNull: false,
//                 defaultValue: '0',
//             },
//             Week_Fifth: {
//                 type: Sequelize.INTEGER(6),
//                 allowNull: true,
//             },
//         },{
//             sequelize,
//             timestamps: true,
//             underscored: false,
//             modelName: 'WeeklyWeight',
//             tableName: 'WeeklyWeight',
//             paranoid: true,
//             charset: 'utf8',
//             collate: 'utf8_general_ci',
//         })
//     }

//     static associate(db){
//         db.Weekly.belongsTo(db.User, {foreignKey: 'Id', targetKey: 'id'});
//         db.Weekly.belongsToMany(db.Daily, {through : 'DailyWeekly'});
//     }
// }

