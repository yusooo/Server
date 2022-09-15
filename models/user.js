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
                type: Sequelize.DataTypes.INTEGER,
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
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
}