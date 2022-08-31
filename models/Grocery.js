const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection/');

class Grocery extends Model {}

Grocery.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        grocery_name: {
            type: DataTypes.STRING,
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
        modelName: 'grocery'
    }
);

module.exports = Grocery;