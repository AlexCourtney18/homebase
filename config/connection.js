require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME,process.env.DBUSER,process.env.DBPW, {
    dialect: 'mysql',
<<<<<<< HEAD
    host: 'localhost',
=======
    host: '127.0.0.1'
    // host: 'localhost',
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7
});

module.exports = sequelize;