const { Model, DataTypes } = require('sequelize')
<<<<<<< HEAD
//const sequelize = require('../config/connection');
const sequelize = require('../test-connection');
=======
const sequelize = require('../config/connection');
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

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