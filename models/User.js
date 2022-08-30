const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt') //Will need later to hash user passwords.


class User extends Model {
    //There will be logic here to check passwords
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        group_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'group',
                key: 'id'
            }
        }
        //may need to add a user_id here for the foreign keys.
    },
    {
        hooks: {
            //There will be logic to hash passwords here 
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;