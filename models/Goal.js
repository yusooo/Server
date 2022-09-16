const Sequelize = require('sequelize');

module.exports = class Goal extends Sequelize.Model{
    static init(sequelize){
        super.init({
            Goal_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            Goal_Type : { // 종류 설정
                type: Sequelize.STRING(8),
                allowNull: false,
                defaultValue: 'Daily',
            },
            Goal_Limit : { // 진행 기간 설정
                type: Sequelize.INTEGER(8),
                allowNull: false,
                defaultValue: '30',
            },
            Goal_Set : { // 목표 설정 : 총 / 일간 배출량
                type: Sequelize.STRING(8),
                allowNull: false,
                defaultValue: 'total',
            },
            Goal_LimSet : { // 목표 수치 설정
                type: Sequelize.INTEGER(8),
                allowNull : false,
                defaultValue: '500',
            },
            Goal_isClosed : {
                type: Sequelize.BOOLEAN(5),
                allowNull: false,
                defaultValue: 'false',
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Goal',
            tableName: 'Goal',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
};