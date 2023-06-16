import ipcRenderer from './ipcRenderer.js';

export default function () {
    eventoSubmit()
}


function eventoSubmit() {
   
    let formProduct = document.getElementById('form-producto')
    formProduct.addEventListener('submit', function (e) {
        e.preventDefault()
        let values = obtenerValuesForm(e)
        let ExpRegSoloNumeros = /^[0-9]+$/
        var ExpRegSoloNumerosDecimales=/^[0-9.]+$/
        let ExpRegSLetrasEspacios =/^[A-Za-z0-9\s]+$/g
        let validarNumeroCodigo = e.target.codigoProducto.value.match(ExpRegSoloNumeros)
        let validarLetrasDescripcion = e.target.descripcionProducto.value.match(ExpRegSLetrasEspacios)
        let validarPrecioCompra = e.target.precioCompraProducto.value.match(ExpRegSoloNumerosDecimales)
        let validarPrecioVenta = e.target.precioVentaProducto.value.match(ExpRegSoloNumerosDecimales)
        if (validarNumeroCodigo && validarPrecioCompra && validarPrecioVenta && validarLetrasDescripcion) {
            enviarData(values)
         
            this.reset()
        }
    })
}

function obtenerValuesForm(e) {
    let utilidad = parseFloat(e.target.precioVentaProducto.value) - parseFloat(e.target.precioCompraProducto.value)
    let values = {
        codigo: parseInt(e.target.codigoProducto.value) ,
        descripcion: e.target.descripcionProducto.value,
        precioCompra: parseFloat(e.target.precioCompraProducto.value) ,
        precioVenta: parseFloat(e.target.precioVentaProducto.value) ,
        utilidad,
        stock: parseInt(e.target.stockProducto.value) ,
        stockMinimo: parseInt(e.target.stockMinimoProducto.value) 
    }
    return values
}

function enviarData(values) {
    ipcRenderer().send('values', values)

}
