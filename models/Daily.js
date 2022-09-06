const Sequelize = require('sequelize');

module.exports = class Weight extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            weight:{
                type: Sequelize.INTEGER(),
                allowNull: false,
                defaultValue: '0',
            },
            date: {
                type: Sequelize.DATE(string),
                allowNull: false,
                defaultValue: new Date(),
            },
            type:{
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: 'Daily',
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Weight',
            tableName: 'Weight',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }

    static associate(db){
        db.Weight.belongsTo(db.User, {foreignKey: 'id', targetKey: 'id'})
    };
}