const {createWindow,x1} = require('./componentes/main.js')
const {app,ipcMain} = require('electron')
require('electron-reload')(__dirname,{})

async function x() {
    await app.whenReady()
    createWindow()
    
}
x()
/*app.whenReady().then(function () {
    createWindow()
    ipcMain.on('values',function (e,msn) {
        console.log(msn);
        let saludo = {
           hola: 'hola'
        }
        win.webContents.send('saludo',[])
        //createWindow().webContents.send('saludo','hola')
    })
})*/
