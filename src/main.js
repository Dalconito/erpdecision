const { app, BrowserWindow, ipcMain } = require('electron');
const mysql = require("mysql")
const path = require('path');
const sequelize = require("sequelize")
const homeController = require('./controllers/homeController.js');
const estoqueController = require('./controllers/estoqueController.js');
const estoqueVizuController = require('./controllers/estoqueVizuController.js');

let homeWindow, estoqueWindow, estoqueVizuEstoqueWindow;

const conn = mysql.createConnection({host: "localhost", user:"root", password:"juntoodeoxum135"})
console.log("Conectou")

function createMainWindow() {
  homeWindow = new BrowserWindow({width: 800, height: 600,
    webPreferences: {nodeIntegration: true, contextIsolation: false}});

  homeWindow.loadFile(path.join(__dirname, 'views', 'home.html'));

  homeWindow.on('closed', () => {homeWindow = null; app.quit();});
  }

function createEstoqueWindow() {
  estoqueWindow = new BrowserWindow({width: 800, height: 600, show: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false}});

  estoqueWindow.loadFile(path.join(__dirname, 'views', 'estoque.html'));

  estoqueWindow.on('closed', () => { estoqueWindow = null; app.quit();});}

function createVizualizarEstoqueWindow() {
  estoqueVizuEstoqueWindow = new BrowserWindow({width: 800, height: 600, show: false,
    webPreferences: {nodeIntegration: true,contextIsolation: false}});

  estoqueVizuEstoqueWindow.loadFile(path.join(__dirname, 'views', 'estoquevizu.html'));

  estoqueVizuEstoqueWindow.on('closed', () => {estoqueVizuEstoqueWindow = null;});}

app.on('ready', () => {
  createMainWindow(); createEstoqueWindow(); createVizualizarEstoqueWindow();
  homeController.initialize(homeWindow, estoqueWindow);
  estoqueController.initialize(homeWindow, estoqueWindow, estoqueVizuEstoqueWindow);
  estoqueVizuController.initialize(homeWindow, estoqueWindow, estoqueVizuEstoqueWindow);
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {app.quit();}});

app.on('activate', () => {if (homeWindow === null) {createMainWindow();}});