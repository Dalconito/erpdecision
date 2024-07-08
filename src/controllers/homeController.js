let estoqueWindow

function initialize(mainWindow, estoqueWindow)
{
    const { ipcMain } = require('electron');

    ipcMain.on('irparaestoque', ()=>{ mainWindow.hide(); estoqueWindow.show() })}

module.exports={initialize};