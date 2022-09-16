const Sequelize = require('sequelize');

module.exports = class Weight extends Sequelize.Model {
    static init(sequelize){
        super.init({
            Weight_id:{
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            Weight_now:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: '0',
            },
            Weight_date: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            Weight_type:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Daily',
            },
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