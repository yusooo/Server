const Sequelize = reuqire('sequelize');

module.exports = class Domain extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            host: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('', ''),
                allowNull: false,
            },
            clientSecret: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Domain',
            tableName: 'domains',
        });
    }
}