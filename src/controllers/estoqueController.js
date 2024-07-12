const { ipcMain, BrowserWindow } = require('electron');
let estoqueWindow
function hideAll()
{
    const janelas = BrowserWindow.getAllWindows()
    janelas.forEach(janela => {janela.hide()})
}
function initialize(mainWindow, estoqueVizuEstoqueWindow, adicionarProdutoWindow)
{   ipcMain.on('irparahome',            ()=>{ hideAll(); mainWindow.show();})
    ipcMain.on('irparaVizuEstoque',     ()=>{ hideAll(); estoqueVizuEstoqueWindow.show()})
    ipcMain.on('irparaAdcItens',        ()=>{ hideAll(); adicionarProdutoWindow.show()})
    ipcMain.on('irparaRemItens',        ()=>{ hideAll(); mainWindow.show()})
    ipcMain.on('irparaFichaProduto',    ()=>{ hideAll(); mainWindow.show()})}

module.exports={initialize};