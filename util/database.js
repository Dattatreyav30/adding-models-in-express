const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'Mykoshi@3', { 
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;