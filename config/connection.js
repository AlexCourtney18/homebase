require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL ? new Sequelize(process.env.JAWSDB_URL) : new Sequelize(process.env.DBNAME,process.env.DBUSER,process.env.DBPW, {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

module.exports = sequelize;