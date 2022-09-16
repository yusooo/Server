const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        super.init({
            user_mail: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            user_id : {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            user_nick : {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: User.id,
            },
            user_pw:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
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