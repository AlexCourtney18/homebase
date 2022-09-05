const { Model, DataTypes } = require('sequelize');
<<<<<<< HEAD
//const sequelize = require('../config/connection');
const sequelize = require('../test-connection');
=======
const sequelize = require('../config/connection');
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

class Bill extends Model {}

Bill.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount_due: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        group_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'group',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'bill'
    }
);

module.exports = Bill;