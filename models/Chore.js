const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');

class Chore extends Model {}

Chore.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        chore_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        group_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'group',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'chore'
    }
);

module.exports = Chore;