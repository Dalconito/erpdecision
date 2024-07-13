const sequelize = require('sequelize')
const connection = require("../database")

const produtoTeste = connection.define('produtotestes',{
    id: {type: sequelize.STRING, allowNull:false, primaryKey: true},
    cod:{type: sequelize.STRING, allowNull:false},
    nome:{type: sequelize.STRING, allowNull:false},
    desc:{type: sequelize.STRING, allowNull:false},
    qtde:{type: sequelize.STRING, allowNull:false},})

connection.sync({FORCE:false}).then(()=>{
    console.log("Tabela de produtos criada com sucesso")})

module.exports = produtoTeste