const { Model, DataTypes } = require('sequelize');
<<<<<<< HEAD
//const sequelize = require('../config/connection');
const sequelize = require('../test-connection');
=======
const sequelize = require('../config/connection');
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7
const bcrypt = require('bcrypt') //Will need later to hash user passwords.


class User extends Model {
<<<<<<< HEAD
    //There will be logic here to check passwords
=======
    
    checkPassword(loginPw) {

        return bcrypt.compareSync(loginPw, this.password);

    }
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7
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
        }
    },
    {
        hooks: {
<<<<<<< HEAD
            //There will be logic to hash passwords here 
=======
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            } 
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;