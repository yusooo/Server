const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            mail: {
                type: Sequelize.STRING(30),
                allowNull: true,
                unique: true,
            },
            id : {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            nick : {
                type: Sequelize.STRING(15),
                allowNull: false,
                defaultValue: User.id,
            },
            pw:{
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId:{
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'User',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associaate(db) {
        db.User.hasMany(db.Goal, {foreignKey: 'Goal', sourceKey: 'id'});
        db.User.hasMany(db.Daily, {foreignKey: 'Daily', sourceKey: 'id'});
        db.User.hasMany(db.Weekly, {foreignKey: 'Weekly', sourceKey: 'id'});
    }
}