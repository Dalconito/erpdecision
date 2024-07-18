const { Sequelize, DataTypes } = require('sequelize');
const connection = require("../database")

const produtoTeste = connection.define('produtoteste', {
    id: {type: DataTypes.INTEGER,autoIncrement: true,
        primaryKey: true,allowNull: false},
    codProduto: {type: DataTypes.STRING,allowNull: false},
    nomeProduto: {type: DataTypes.STRING,allowNull: false},
    descProduto: {type: DataTypes.STRING,allowNull: false},
    qtdeProduto: {type: DataTypes.STRING,allowNull: false}},
    {timestamps: true, tableName: 'produtotestes'});

  (async () => {
    try {await connection.sync({ force: false }); console.log('Modelo sincronizado com o banco de dados.');}
    catch (error) {console.error('Erro ao sincronizar o modelo:', error);}})();

module.exports = produtoTeste