require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME,process.env.DBUSER,process.env.DBPW, {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;