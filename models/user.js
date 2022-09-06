const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        super.init({
            mail: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            id : {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            nick : {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: User.id,
            },
            pw:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            provider: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: 'local',
            },
            snsId:{
                type: Sequelize.DataTypes.STRING,
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
        // db.User.hasMany(db.Daily, {foreignKey: 'Daily', sourceKey: 'id'});
        db.User.hasMany(db.Weight, {foreignKey: 'Weekly', sourceKey: 'id'});
    }
}