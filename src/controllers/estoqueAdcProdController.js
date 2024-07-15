const { ipcMain, BrowserWindow } = require('electron');
const connection = require('../database/database');
const createProdModel = require('../database/model/createProdModel')
const Yup = require('yup')

let formDataglobal = null;
function hideAll()
{   const janelas = BrowserWindow.getAllWindows()
    janelas.forEach(janela => {janela.hide()})}

function initialize(mainWindow, estoqueWindow, estoqueVizuEstoqueWindow)
{   ipcMain.on('irparahome',            ()=>{ hideAll(); mainWindow.show();})
    ipcMain.on('irparaestoque',         ()=>{ hideAll(); estoqueWindow.show();})
    ipcMain.on('irparaVizuEstoque',     ()=>{ hideAll(); estoqueVizuEstoqueWindow.show();})
    ipcMain.on('irparaRemItens',        ()=>{ hideAll(); mainWindow.show();})
    ipcMain.on('irparaFichaProduto',    ()=>{ hideAll(); mainWindow.show();})
    ipcMain.on('dadosProduto', (event, formData)=>{processaradcDados(formData)})
}


connection.authenticate().then(()=>{
    console.log("Conectou-se com a base de dados")}).catch((msgErr)=>{console.log(msgErr)})
  
    async function processaradcDados(formData){

        const schema = Yup.object().shape({
            codProduto: Yup.string().required, nomeProduto: Yup.string().required,
            descProduto: Yup.string().required, qtdeProduto: Yup.string().required,
        })

        try {await schema.isValid(JSON.stringify(formData, null, 2)); console.log("Dados Validados")}
        catch (error) {console.log("Schema Invalido, ou outra coisa errada")}

        const{codProduto, nomeProduto, descProduto, qtdeProduto} = formData
        let result;
        try {result = await createProdModel.findOne({where: { codProduto }});
            console.log('Consulta bem-sucedida: ');}
        catch (error) {console.error('Erro na consulta:', error);}

        if (result){console.log("Codigo Existente")}
        else {createProdModel.create({
            codProduto:codProduto, nomeProduto:nomeProduto, descProduto:descProduto, qtdeProduto:qtdeProduto})
            return console.log("Produto Criado, verificar tabela")}

}

module.exports={initialize};