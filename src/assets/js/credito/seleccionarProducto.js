
let indexTbody = 0
let arrayTotalApagar = []
let cantidadProducto = []
let restaStockProducto = 0
let productosAdquiridos = []
import ipcRenderer from "./ipcRenderer.js"
export default function (producto) {
    let tabla = document.getElementById('table-credito')
    tabla.addEventListener('click', function (e) {
        let tbodyTagName = e.target.parentNode.parentNode.tagName
        if (tbodyTagName == 'TBODY') {
            let arrayTbody = Array.prototype.slice.call(tabla.children)
            indexTbody = arrayTbody.indexOf(e.target.parentNode.parentNode)
            pintarProductoEnElForm(producto)
        }
    })

    transferirProductoATablaTotalVentas(producto)
    finalizarVenta()
    eliminarProducto()
 
}

function pintarProductoEnElForm(producto) {
    let productoSeleccionado = producto[indexTbody - 1]
    let inputDescripcion = document.getElementById('credito-descripcion')
    let inputPrecioVenta = document.getElementById('credito-precio-venta')
    let tdStockSeleccionado = document.getElementsByClassName('td-stock-credito')[indexTbody - 1]
    if (tdStockSeleccionado.innerHTML > 0) {
        inputDescripcion.value = productoSeleccionado.descripcion
        inputPrecioVenta.value = productoSeleccionado.precioventa
    }
}
function eliminarProducto() {
    let tablaTotalVentas = document.getElementById('table-credito-total')

    tablaTotalVentas.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-eliminar')) {
            let btnEliminar = Array.prototype.slice.call(document.getElementsByClassName('btn-eliminar-producto-credito'))
            let indiceDeProductoAeliminar = btnEliminar.indexOf(e.target)
            let indiceTdSeleccionado = productosAdquiridos[indiceDeProductoAeliminar].indexTbody
            let inputTotalApagar = document.getElementById('total-pagar-credito')
            let tdStockSeleccionado = document.getElementsByClassName('td-stock-credito')
            let cantidadProductoEnTdStock = parseFloat(tdStockSeleccionado[indiceTdSeleccionado].innerHTML)
            let productosAdquiridosCantidad = parseFloat(productosAdquiridos[indiceDeProductoAeliminar].inputCantidad) 
            arrayTotalApagar.splice(indiceDeProductoAeliminar, 1)
            
          
            if (arrayTotalApagar.length) {
                let valorTotal = arrayTotalApagar.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue
                })
                tdStockSeleccionado[indiceTdSeleccionado].innerHTML = productosAdquiridosCantidad + cantidadProductoEnTdStock
                inputTotalApagar.value = valorTotal.toFixed(2) + ' Bs'
            } else {
                tdStockSeleccionado[indiceTdSeleccionado].innerHTML = productosAdquiridosCantidad  + cantidadProductoEnTdStock
                inputTotalApagar.value = 0 + ' Bs'
            }
            productosAdquiridos.splice(indiceDeProductoAeliminar, 1)
            cantidadProducto.splice(indiceDeProductoAeliminar, 1)
            tablaTotalVentas.innerHTML = ''
            tablaTotalVentas.innerHTML = ` 
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>  
                        <th>Total</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                `
            for (let index = 0; index < productosAdquiridos.length; index++) {
                const element = productosAdquiridos[index];

                tablaTotalVentas.innerHTML += `
                    <tr>
                        <td>${element.inputDescripcion} </td>
                        <td>${element.inputCantidad}.00</td>
                        <td>${element.inputPrecioVenta}.00</td>
                        <td>${element.total.toFixed(2)} </td>
                        <td>${element.fecha.dia}/${element.fecha.mes}/${element.fecha.year} </td>
                        <td><span class="icon-bin btn-eliminar btn-eliminar-producto-credito"></span> </td>
                        
                    </tr>
                `
            }

        }
    })

}

function obtenerCantidaDeProductoDeLaTabla() {
    let inputNumber = document.getElementById('credito-cantidad')
    let valorDelInput = inputNumber.value
    let tdStockSeleccionado = document.getElementsByClassName('td-stock-credito')[indexTbody - 1]
    if (tdStockSeleccionado.innerHTML > 0) {
        let actualizarCantidadProductoEnTabla = parseFloat(tdStockSeleccionado.innerHTML) - parseFloat(valorDelInput)
        tdStockSeleccionado.innerHTML = actualizarCantidadProductoEnTabla
    }

}
function transferirProductoATablaTotalVentas(producto) {
    let formrVentas = document.getElementById('form-credito')
    let inputCantidad = document.getElementById('credito-cantidad')
    let clienteActualCredito = []
    formrVentas.addEventListener('submit', function (e) {
        let stockProducto = producto[indexTbody - 1].stock
        e.preventDefault()
        let inputDescripcion = document.getElementById('credito-descripcion').value
        let inputPrecioVenta = document.getElementById('credito-precio-venta').value
        let nombreCliente = document.getElementById("nombre-cliente").value
        if (inputCantidad.value > 0 && inputCantidad.value <= stockProducto && inputDescripcion != '' && inputPrecioVenta != '' && nombreCliente != '') {
            let inputsValues = {
                nombreCliente,
                inputDescripcion,
                inputPrecioVenta,
                inputCantidad: inputCantidad.value,
                fecha: fecha(),
                total: total(inputCantidad.value, inputPrecioVenta),
                indexTbody:indexTbody - 1
            }
            localStorage.setItem('nombreCliente',nombreCliente)
            let stock = producto[indexTbody - 1].stock
            restaStockProducto = parseFloat(stock) - parseFloat(inputCantidad.value)
            let indice = producto[indexTbody - 1].id
            cantidadProducto.push({
                id: indice,
                cantidadActual: restaStockProducto
            })
            let cliente = localStorage.getItem('nombreCliente')
            clienteActualCredito.push(nombreCliente)
            if (clienteActualCredito[0] == cliente) {
                tablaTotalVentas(inputsValues)
                totalApagar(inputsValues.total)
                obtenerCantidaDeProductoDeLaTabla()
                inputCantidad.style.borderColor = "black"
                return this.reset()
            }
        }
        inputCantidad.style.borderColor = "red"
    })
}
function actualizarCantidadProducto() {
    ipcRenderer().send('actualizar cantidad credito', cantidadProducto)
}

function persistirCredito() {
   ipcRenderer().send('almacenar credito', productosAdquiridos)
  
}
function percistirMontoTotal() {
    let valorTotal = arrayTotalApagar.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue
    })
    let nombreCliente = localStorage.getItem('nombreCliente')
    let array = [nombreCliente, valorTotal]
    ipcRenderer().send('almacenarMontoTotal', array)
}
function finalizarVenta() {
    let btnRealizarCredito = document.getElementById('btn-guardar-credito')
    let inputTotalApagar = document.getElementById('total-pagar-credito')
    btnRealizarCredito.addEventListener('click', function (e) {
        e.preventDefault()
        if (inputTotalApagar.value.length) {
            actualizarCantidadProducto()
            percistirMontoTotal()
            persistirCredito()
            window.location.reload()
        }
    })
}

function tablaTotalVentas(inputsValues) {
    let tablaTotalVentas = document.getElementById('table-credito-total')
    productosAdquiridos.push(inputsValues)
    tablaTotalVentas.innerHTML = ''
    tablaTotalVentas.innerHTML = ` 
        <thead>
            <tr>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>  
                <th>Total</th>
                <th>Fecha</th>
            </tr>
        </thead>
        `

    for (let index = 0; index < productosAdquiridos.length; index++) {
        const element = productosAdquiridos[index];
        tablaTotalVentas.innerHTML += `
            <tr>
                <td>${element.nombreCliente} </td>
                <td>${element.inputDescripcion} </td>
                <td>${element.inputCantidad}.00</td>
                <td>${element.inputPrecioVenta}.00</td>
                <td>${element.total.toFixed(2)} </td>
                <td>${element.fecha.dia}/${element.fecha.mes}/${element.fecha.year} </td>
                <td><span class="icon-bin btn-eliminar btn-eliminar-producto-credito"></span> </td>
            </tr>
        `
    }
}
function fecha() {
    let date = new Date()
    return {
        dia: date.getDate(),
        mes: date.getMonth() + 1,
        year: date.getFullYear()
    }
}

function totalApagar(total) {
    let inputTotalApagar = document.getElementById('total-pagar-credito')
    arrayTotalApagar.push(total)

    let valorTotal = arrayTotalApagar.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue
    })
    inputTotalApagar.value = valorTotal.toFixed(2) + ' Bs'
}

function total(inputCantidad, inputPrecioVenta) {
    let cantidad = parseFloat(inputCantidad)
    let precioVenta = parseFloat(inputPrecioVenta)
    return cantidad * precioVenta
}