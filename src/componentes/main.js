let {BrowserWindow,ipcMain} = require('electron')

let producto = require('../componentes/agregarProducto/agregarProducto.js')
let obtenerProducto = require('../componentes/obtenerProducto/obtenerProducto.js')
let eliminarProducto = require('../componentes/eliminarProducto/eliminarProducto.js')
let editarProducto = require('../componentes/editarProducto/editarProducto.js')
let editarCantidad = require('../componentes/editarProducto/editarCantidad.js')
let editarCantidadCredito = require('../componentes/editarProducto/editarCatidadCredito.js')
let almacenarNombreCliente = require('../componentes/agregarProducto/almacenarNombreCliente.js')
let almacenarCreditoCliente = require('../componentes/agregarProducto/almacenarVentaCredito.js')
let obtenerNombreCliente = require('../componentes/obtenerProducto/obtenerNombreCliente.js')
let obtenerCreditoCliente = require('../componentes/obtenerProducto/creditoCliente.js')
let agregarOeditarMontoCredito = require('../componentes/insertarOeditar/insertarOeditarMontoCredito.js')
let montoCreditoCliente = require('../componentes/obtenerProducto/montoCredito.js')
let abonarCredito = require('../componentes/editarProducto/editarMontoTotalCredtio.js')
let almacenarVentas = require('../componentes/agregarProducto/almacenarVentas.js')
let obtenerVentas = require('../componentes/obtenerProducto/obtenerVentas.js')
let eliminarCredito = require('../componentes/eliminarProducto/eliminarCredito.js')
function createWindow() {
    const win = new BrowserWindow ({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false,
        }
    })
    win.loadFile('src/vistas/index.html')
    guardarProducto(win)
    obtenerTablaProducto(win)
    controllerEliminar(win)
    controllerEditar()
    obtenerProductoParaTablaVente(win)
    controllerEditarCantidadProducto()
    controllerObtenerProductoParaStockMinimo(win)
    controllerObtenerProductoParaCredito(win)
    contollerAlmacenarNombreCliente()
    controlleNombreCliente(win) 
    controllerEditarCantidadProductoCredito() 
    contollerAlmacenarCreditoCliente()
    contollerobtenerCreditoCliente(win)
    controllerAgregarOeditarMontoCredito()
    controllerObtnerMontoCredito(win)
    controllerAbonarCredtio()
    controllerAlmacenarVentas()
    controllerObtenerVentas(win)
    controllerEliminarCredito()
}
function  guardarProducto(win) {
    ipcMain.on('values', async function (e,msn) {
        await producto.guardar(msn)
        let resultado = await obtenerProducto.obtener()
        win.webContents.send('tablaProducto1',resultado.rows)
    })
}
function obtenerTablaProducto(win) {
    ipcMain.on('obtener', async function (e,msn) {
        let resultado = await obtenerProducto.obtener()
        win.webContents.send('resultado',resultado.rows)
    })
}
function obtenerProductoParaTablaVente(win) {
    ipcMain.on('obtener1', async function (e,msn) {
        let resultado = await obtenerProducto.obtener()
        win.webContents.send('obtenerProductoParaTablaVenta',resultado.rows)
    })
}
function controllerEliminar(win) {
    ipcMain.on('idProducto', async function (e,msn) {
      await  eliminarProducto.eliminar(msn)
        let resultado = await obtenerProducto.obtener()
        win.webContents.send('tablaProducto',resultado.rows)
    })
}
function controllerEditar() {
    ipcMain.on('editarProducto',  function (e,msn) {
        editarProducto.editar(msn)
    })
}
function controllerEditarCantidadProducto() {
    ipcMain.on('actualizar cantidad',  function (e,msn) {
        editarCantidad.editar(msn)
    })
}
function controllerEditarCantidadProductoCredito() {
    ipcMain.on('actualizar cantidad credito',  function (e,msn) {
        editarCantidadCredito.editar(msn)
    })
}
function controllerObtenerProductoParaStockMinimo(win) {
    ipcMain.on('tablaStockMinimo', async function (e,msn) {
        let resultado = await obtenerProducto.obtener()
        win.webContents.send('resultadoStock',resultado.rows)
    })
}
function controllerObtenerProductoParaCredito(win) {
    ipcMain.on('tablaCreadito', async function (e,msn) {
        let resultado = await obtenerProducto.obtener()
        win.webContents.send('resultadoCredito',resultado.rows)
    })
}
function controlleNombreCliente(win) {
    ipcMain.on('seleccionarCliente', async function (e,msn) {
        let resultado = await obtenerNombreCliente.obtener()
        win.webContents.send('resultadoNombreCliente',resultado.rows)
    })
}
function contollerAlmacenarNombreCliente() {
    ipcMain.on('nombreCliente',  function (e,msn) {
        almacenarNombreCliente.guardar(msn)
    })
}
function contollerAlmacenarCreditoCliente() {
    ipcMain.on('almacenar credito',  function (e,msn) {
        almacenarCreditoCliente.guardar(msn)
    })
}
function contollerobtenerCreditoCliente(win) {
    ipcMain.on('creditoCliente', async function (e,msn) {
        let resultado = await obtenerCreditoCliente.obtener(msn)
        win.webContents.send('resultadoCreditoCliente',resultado.rows)
    })
}
function controllerAgregarOeditarMontoCredito() {
    ipcMain.on('almacenarMontoTotal', async function (e,msn) {
        agregarOeditarMontoCredito.ejecutar(msn)
    })
    
}
function controllerObtnerMontoCredito(win) {
    ipcMain.on('montoCreditoCliente', async function (e,msn) {
        let resultado = await montoCreditoCliente.obtener(msn)
        win.webContents.send('resultadoMontoCreditoCliente',resultado.rows)
    })
}
function controllerAbonarCredtio() {
    ipcMain.on('abonarCredito',  function (e,msn) {
        abonarCredito.editar(msn)
    })
}
function controllerAlmacenarVentas() {
    ipcMain.on('almacenarVentas',  function (e,msn) {
        almacenarVentas.guardarVentas(msn)
    })
}
function controllerObtenerVentas(win) {
    ipcMain.on('fecha', async function (e,msn) {
        let resultado = await obtenerVentas.resultado(msn)
        win.webContents.send('resultado ventas',resultado)
    })
   
}
function controllerEliminarCredito() {
    ipcMain.on('eliminarCredito',  function (e,message) {
        eliminarCredito.eliminar(message)
    })
}
module.exports = {
    createWindow,
}