require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME,process.env.DBUSER,process.env.DBPW, {
    dialect: 'mysql',
    //host: '127.0.0.1'
    host: 'localhost'
});

module.exports = sequelize;