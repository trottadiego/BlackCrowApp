//Applicacion

const {app, BrowserWindow} = require('electron');
const path = require('path');

function crearVentanaPrincipal(){
    let ventanaPrincipal = new BrowserWindow({
        width: 1000,
        height: 700,
        resizable: false,
       webPreferences: {
        //    preload: path.join(__dirname, 'preload.js')
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        }
    });

    ventanaPrincipal.loadFile('index.html');
}

app.whenReady().then(crearVentanaPrincipal);

app.on('window-all-closed', function(){
    if(process.platform === 'darwin'){
        app.quit();
    }
});

app.on('activate', function(){
    if(BrowserWindow.getAllWindows().length === 0){
        crearVentanaPrincipal();
    }
});