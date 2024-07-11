const sequelize = require('sequelize');
const { FORCE } = require('sequelize/lib/index-hints');

const connection = new sequelize('ERP', "root", "juntoodeoxum135",{
    host: "localhost",
    dialect:"mysql"
});

const produtoTeste = connection.define('produtoteste',{
    id:{
        type: sequelize.STRING,
        allowNull:false,
        primaryKey: true
    },
    cod:{
        type: sequelize.STRING,
        allowNull:false
    },
    nome:{
        type: sequelize.STRING,
        allowNull:false
    },
    desc:{
        type: sequelize.STRING,
        allowNull:false
    },
    qtde:{
        type: sequelize.STRING,
        allowNull:false
    },    
})

connection.sync({FORCE:false}).then(()=>{
    console.log("Tabela de produtos criada com sucesso")
})

module.exports = connection