const Sequelize = require('sequelize');

module.exports = class Weight extends Sequelize.Model {
    static init(sequelize){
        super.init({
            id:{
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            weight:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: '0',
            },
            date: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            type:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Daily',
            },
            userId: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Weight',
            tableName: 'Weight',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })
    }
}