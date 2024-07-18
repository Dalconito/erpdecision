const path = require('path'); const {ipcMain, BrowserWindow} = require('electron')
let data;
function hideAll()
{
    const janelas = BrowserWindow.getAllWindows()
    janelas.forEach(janela => {janela.hide()})
}

class estoqueRemProdController
{
    static loadestoqueRemProdWindow(estoqueRemProdWindow)
    {estoqueRemProdWindow.loadURL(path.join(__dirname, '../views', 'estoqueRemProd.html'), {query: data})}

    static initialize(home, estoque, vizualizacao, adcProduto)
    {   ipcMain.on('irparahome',            ()=>{ hideAll(); home.show();})
        ipcMain.on('irparaestoque',         ()=>{ hideAll(); estoque.show();})
        ipcMain.on('irparaVizuEstoque',     ()=>{ hideAll(); vizualizacao.show();})
        ipcMain.on('irparaAdcItens',     ()=>{ hideAll(); adcProduto.show();})
        ipcMain.on('irparaFichaProduto',    ()=>{ hideAll(); home.show();})}
}

module.exports = estoqueRemProdController;
