const sequelize = require('sequelize');
const { FORCE } = require('sequelize/lib/index-hints');

const connection = new sequelize('ERP', "root", "juntoodeoxum135",{
    host: "localhost",dialect:"mysql"});

module.exports = connection