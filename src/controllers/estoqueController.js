const { ipcMain } = require('electron');
let estoqueWindow

function initialize(mainWindow, estoqueWindow, estoqueVizuEstoqueWindow)
{
    ipcMain.on('irparahome',          ()=>{ mainWindow.show(); estoqueWindow.hide();  })
    ipcMain.on('irparaVizuEstoque',   ()=>{ estoqueVizuEstoqueWindow.show(); estoqueWindow.hide(); })
    ipcMain.on('irparaAdcItens',      ()=>{ mainWindow.show(); estoqueWindow.hide(); })
    ipcMain.on('irparaRemItens',      ()=>{ mainWindow.show(); estoqueWindow.hide(); })
    ipcMain.on('irparaFichaProduto',  ()=>{ mainWindow.show(); estoqueWindow.hide(); })
}

module.exports={initialize};