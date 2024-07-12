const { ipcMain, BrowserWindow } = require('electron');

let estoqueWindow
function hideAll()
{
    const janelas = BrowserWindow.getAllWindows()
    janelas.forEach(janela => {janela.hide()})
}

function initialize(estoqueWindow)
{ ipcMain.on('irparaEstoque', ()=>{hideAll(); estoqueWindow.show() })}

module.exports={initialize};