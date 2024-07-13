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
    console.log("Conectou com a base de dados")}).catch((msgErr)=>{console.log(msgErr)})
  
    async function processaradcDados(formData){
        formDataglobal = formData
        console.log("retornou os dados: " + JSON.stringify(formData, null, 2))
    
        const schema = Yup.object().shape({
            cod: Yup.string().required, nome: Yup.string().required,
            desc: Yup.string().required, qtde: Yup.string().required,
        })
        
        try {await schema.isValid(formData); console.log("pegou os dados: " + formData)}
        catch (error) {console.log("Schema Invalido, ou outra coisa errada")}

        const{codProduto, nomeProduto, descProduto, qtdeProduto} = formDataglobal
        const produtoExiste = await createProdModel.findOne({where: {codProduto}})

        if (produtoExiste){console.log("CODIGO EXISTENTE")}
        else createProdModel.create({
            cod:codProduto, nome:nomeProduto, desc:descProduto, qtde:qtdeProduto})

            return console.log("criado, verificar tabela")

}

module.exports={initialize};