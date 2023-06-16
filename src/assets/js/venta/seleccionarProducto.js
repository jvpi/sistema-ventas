let indexTbody = 0
let ProductosAdquiridos = []
let arrayTotalApagar = []
let cantidadProducto = []
let restaStockProducto = 0
import ipcRenderer from "./ipcRenderer.js"
export default function (mesagge) {
    let tabla = document.getElementById('table-venta')
    tabla.addEventListener('click', function (e) {
        let tbodyTagName = e.target.parentNode.parentNode.tagName
        if (tbodyTagName == 'TBODY') {
            let arrayTbody = Array.prototype.slice.call(tabla.children)
            indexTbody = arrayTbody.indexOf(e.target.parentNode.parentNode)
            pintarProductoEnElForm(mesagge)

        }
    })
    transferirProductoATablaTotalVentas(mesagge)
    finalizarVenta()
    eliminarProducto()

}
function obtenerCantidaDeProductoDeLaTabla() {
    let inputNumber = document.getElementById('cantidad-venta')
    let valorDelInput = inputNumber.value

    let tdStockSeleccionado = document.getElementsByClassName('td-stock')[indexTbody - 1]
    if (tdStockSeleccionado.innerHTML > 0) {
        let actualizarCantidadProductoEnTabla = parseFloat(tdStockSeleccionado.innerHTML) - parseFloat(valorDelInput)
        tdStockSeleccionado.innerHTML = actualizarCantidadProductoEnTabla
    }

}
function eliminarProducto() {
    let tablaTotalVentas = document.getElementById('table-venta-total')

    tablaTotalVentas.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-eliminar')) {
            let btnEliminar = Array.prototype.slice.call(document.getElementsByClassName('btn-eliminar-producto'))
            let productoAeliminar = btnEliminar.indexOf(e.target)
            let indice = ProductosAdquiridos[productoAeliminar].indexTbody //solucion
            let inputTotalApagar = document.getElementById('total-pagar')
            let inputTotalApagarDolares = document.getElementById('total-pagar-dolares')
            let tdStockSeleccionado = document.getElementsByClassName('td-stock')
            let cantidadProductoEnTdStock = parseFloat(tdStockSeleccionado[indice].innerHTML) //solucion
            let precioDolar = localStorage.getItem('dolar')


            let productosAdquiridosCantidad = ProductosAdquiridos[productoAeliminar].inputCantidad


            arrayTotalApagar.splice(productoAeliminar, 1)
            if (arrayTotalApagar.length) {
                let valorTotal = arrayTotalApagar.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue
                })

                tdStockSeleccionado[indice].innerHTML = productosAdquiridosCantidad + cantidadProductoEnTdStock //solucion
                inputTotalApagar.value = valorTotal.toFixed(2) + ' $'
                inputTotalApagarDolares.value = (valorTotal.toFixed(2) * precioDolar).toFixed(2) + ' Bs'
            } else {

                tdStockSeleccionado[indice].innerHTML = productosAdquiridosCantidad + cantidadProductoEnTdStock //solucion
                inputTotalApagar.value = 0 + ' $'
                inputTotalApagarDolares.value = 0 + ' Bs'
            }
            ProductosAdquiridos.splice(productoAeliminar, 1)
            cantidadProducto.splice(productoAeliminar, 1)
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
            for (let index = 0; index < ProductosAdquiridos.length; index++) {
                const element = ProductosAdquiridos[index];

                tablaTotalVentas.innerHTML += `
                    <tr>
                        <td>${element.inputDescripcion} </td>
                        <td>${element.inputCantidad}.00</td>
                        <td>${element.inputPrecioVenta}.00</td>
                        <td>${element.total.toFixed(2)} </td>
                        <td>${element.fecha.dia}/${element.fecha.mes}/${element.fecha.year} </td>
                        <td><span class="icon-bin btn-eliminar btn-eliminar-producto"></span> </td>
                        
                    </tr>
                `
            }

        }
    })

}

function pintarProductoEnElForm(producto) {
    let tdStockSeleccionado = document.getElementsByClassName('td-stock')[indexTbody - 1]
    let productoSeleccionado = producto[indexTbody - 1]
    let inputDescripcion = document.getElementById('descripcion-venta')
    let inputPrecioVenta = document.getElementById('precio-venta')
    let inputStock = document.getElementById("precio-stock")
    if (tdStockSeleccionado.innerHTML > 0) {
        inputDescripcion.value = productoSeleccionado.descripcion
        inputPrecioVenta.value = `${parseFloat(productoSeleccionado.precioventa).toFixed(2)} `
        inputStock.value = `${productoSeleccionado.stock}.00`
    }
}

function transferirProductoATablaTotalVentas(producto) {
    let formrVentas = document.getElementById('form-ventas')
    formrVentas.addEventListener('submit', function (e) {
        e.preventDefault()
        let stockProducto = producto[indexTbody - 1].stock

        let inputsValues = {
            inputDescripcion: e.target.descripcion.value,
            inputPrecioVenta: e.target.precioVenta.value,
            inputStock: parseFloat(e.target.stock.value),
            inputCantidad: parseFloat(e.target.cantidad.value),
            fecha: fecha(),
            total: total(e.target.cantidad.value, e.target.precioVenta.value),
            indexTbody: indexTbody - 1
        }
        if (inputsValues.inputCantidad != 0 && inputsValues.inputCantidad <= stockProducto && inputsValues.inputDescripcion != '' && inputsValues.inputPrecioVenta != '' && inputsValues.inputStock != '') {
            restaStockProducto = parseFloat(e.target.stock.value) - parseFloat(e.target.cantidad.value)
            let indice = producto[indexTbody - 1].id
            cantidadProducto.push({
                indice,
                cantidadActual: restaStockProducto
            })

            tablaTotalVentas(inputsValues)
            totalApagar(inputsValues.total)
            obtenerCantidaDeProductoDeLaTabla()
            e.target.cantidad.style.borderColor = "black"
            this.reset()
            return true
        }
        e.target.cantidad.style.borderColor = "red"
    })
}

function tablaTotalVentas(inputsValues) {
    let tablaTotalVentas = document.getElementById('table-venta-total')
    console.log(inputsValues);
    let precioDolar = localStorage.getItem('dolar')
    ProductosAdquiridos.push(inputsValues)
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
    for (let index = 0; index < ProductosAdquiridos.length; index++) {
        const element = ProductosAdquiridos[index];
        //
        tablaTotalVentas.innerHTML += `
            <tr>
                <td>${element.inputDescripcion} </td>
                <td>${element.inputCantidad.toFixed(2)}</td>
                <td>${element.inputPrecioVenta}$ / ${parseFloat(element.inputPrecioVenta * precioDolar).toFixed(2)} Bs</td>
                <td>${element.total.toFixed(2)}$ / ${parseFloat(element.total * precioDolar).toFixed(2)} Bs</td> 
                <td>${element.fecha.dia}/${element.fecha.mes}/${element.fecha.year} </td>
                <td><span class="icon-bin btn-eliminar btn-eliminar-producto"></span> </td>
                
            </tr>
        `
    }

}
function totalApagar(total) {
    let inputTotalApagarDolares = document.getElementById('total-pagar-dolares')
    let inputTotalApagar = document.getElementById('total-pagar')
    let precioDolar = localStorage.getItem('dolar')
    arrayTotalApagar.push(total)

    let valorTotal = arrayTotalApagar.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue
    })
    inputTotalApagar.value = valorTotal.toFixed(2) + ' $'
    inputTotalApagarDolares.value = (valorTotal.toFixed(2) * precioDolar).toFixed(2) + ' Bs'
}

function actualizarCantidadProducto() {
    ipcRenderer().send('actualizar cantidad', cantidadProducto)
}
function almacenarVentas() {
    ipcRenderer().send('almacenarVentas', ProductosAdquiridos)

}
function finalizarVenta() {

    let btnRealizarVenta = document.getElementById('realizar-venta')
    let inputTotalApagar = document.getElementById('total-pagar')
    btnRealizarVenta.addEventListener('click', function (e) {
        e.preventDefault()
        if (inputTotalApagar.value.length) {
            actualizarCantidadProducto()
            almacenarVentas()
        }
        window.location.reload()
    })
}
function fecha() {
    let date = new Date()
    if (date.getMonth() < 10) {
        return {
            dia: date.getDate(),
            mes: `0${date.getMonth() + 1}`,
            year: date.getFullYear()
        }
    } else {
        return {
            dia: date.getDate(),
            mes: date.getMonth() + 1,
            year: date.getFullYear()
        }
    }

}
function total(inputCantidad, inputPrecioVenta) {
    let cantidad = parseFloat(inputCantidad)
    let precioVenta = parseFloat(inputPrecioVenta)
    return cantidad * precioVenta
}

