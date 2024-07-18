const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path'); const ipc = require('./js/ipc.js')
const connection = require("./database/database.js")
const homeController = require('./controllers/homeController.js');
const estoqueController = require('./controllers/estoqueController.js');
const estoqueVizuController = require('./controllers/estoqueVizuController.js');
const estoqueAdcProdController = require('./controllers/estoqueAdcProdController.js')
const estoqueRemProdController = require("./controllers/estoqueRemProdController.js")

function hideAll()
{
    const janelas = BrowserWindow.getAllWindows()
    janelas.forEach(janela => {janela.hide()})
}

let homeWindow, estoqueWindow, estoqueVizuEstoqueWindow, adicionarProdutoWindow, formData;
let estoqueRemProdWindow;
function createMainWindow() {
  homeWindow = new BrowserWindow({width: 800, height: 600,
    webPreferences: {nodeIntegration: true, contextIsolation: false}});
  homeWindow.loadFile(path.join(__dirname, 'views', 'home.html'));
  homeWindow.on('closed', () => {homeWindow = null; app.quit();});}

function createEstoqueWindow() {
  estoqueWindow = new BrowserWindow({show: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false}});
  estoqueWindow.loadFile(path.join(__dirname, 'views', 'estoque.html'));
  estoqueWindow.on('closed', () => { estoqueWindow = null; app.quit();});}

function createVizualizarEstoqueWindow() {
  estoqueVizuEstoqueWindow = new BrowserWindow({show: false,
    webPreferences: {nodeIntegration: true,contextIsolation: false}});
  estoqueVizuEstoqueWindow.loadFile(path.join(__dirname, 'views', 'estoquevizu.html'));
  estoqueVizuEstoqueWindow.on('closed', () => {estoqueVizuEstoqueWindow = null;app.quit();});}

  function createAdicionarProdutoWindow(){
    adicionarProdutoWindow = new BrowserWindow({show:false,
      webPreferences: {nodeIntegration:true, contextIsolation:false}})
    adicionarProdutoWindow.loadFile(path.join(__dirname, 'views', 'estoqueAdicionarProd.html'))
    adicionarProdutoWindow.on('closed', () => {adicionarProdutoWindow = null;app.quit();})}

  function createRemProdutoWindow(){
    estoqueRemProdWindow = new BrowserWindow({show:false, webPreferences: {nodeIntegration:true, contextIsolation:false}})
  estoqueRemProdController.loadestoqueRemProdWindow(estoqueRemProdWindow)
  estoqueRemProdWindow.on('closed', () => {adicionarProdutoWindow = null;app.quit();})}

app.on('ready', () => {
  createMainWindow(); createEstoqueWindow(); createVizualizarEstoqueWindow(); createAdicionarProdutoWindow();
  createRemProdutoWindow()
  homeController.initialize(estoqueWindow);
  estoqueController.initialize(homeWindow,estoqueVizuEstoqueWindow, adicionarProdutoWindow);
  estoqueVizuController.initialize(homeWindow, adicionarProdutoWindow);
  estoqueAdcProdController.initialize(homeWindow, estoqueWindow, estoqueVizuEstoqueWindow, estoqueRemProdWindow);});

app.on('window-all-closed', () => {if (process.platform !== 'darwin') {app.quit();}});

app.on('activate', () => {if (homeWindow === null) {hideAll(); createMainWindow();}});