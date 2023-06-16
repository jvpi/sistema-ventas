
let array = [{
    Codigo: 1,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 2,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 3,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 4,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 5,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 6,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 7,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 8,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 9,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 10,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 11,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 12,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 13,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 14,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 15,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 16,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 17,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 18,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 19,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 20,
    Descripción: 'arroz',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}]
let arrayDiezPosiciones = array.slice(0, 10)
import ipcRenderer from "./ipcRenderer.js"
import buscador from "./buscador.js"
export default function () {
    function cb(e, producto) {
        let containerTabla = document.getElementById('tabla-reporte')
        let preioDolar = localStorage.getItem('dolar')
        ventaTotalDelDia(producto)
        containerTabla.innerHTML = `
        <thead>
            <tr>
                <th class="th-width ">Descripción</th>
                <th class="th-width">Fecha</th>
                <th class="th-width">Cantidad</th>
                <th class="th-width">Precio venta</th>
                <th class="th-width">Stock </th>
                <th class="th-width">Total </th>
            </tr>
        </thead>        
    `
        if (producto.length >0) {
            containerTabla.innerHTML = ''
            containerTabla.innerHTML = `
                <thead>
                    <tr>
                        <th class="th-width ">Descripción</th>
                        <th class="th-width">Fecha</th>
                        <th class="th-width">Cantidad</th>
                        <th class="th-width">Precio venta</th>
                        <th class="th-width">Stock </th>
                        <th class="th-width">Total </th>
                    </tr>
                </thead>        
            `
        
            for (let index = 0; index < producto.length; index++) {
                containerTabla.innerHTML += ` 
                <tbody class='tbody-reporte'>
                    <tr>
                        <td class='td descripcion-ventas' >${producto[index].descripcion} </td>
                        <td class='td'>${producto[index].fecha}</td>
                        <td class='td'>${producto[index].cantidad}.00</td>
                        <td class='td'>${parseFloat(producto[index].precioventa).toFixed(2)}$ / ${(parseFloat(producto[index].precioventa) * preioDolar).toFixed(2)}Bs</td>
    
                        <td class='td'>${producto[index].stock}</td>
                        <td class='td'>${parseFloat(producto[index].total).toFixed(2)}$ / ${(parseFloat(producto[index].precioventa) * preioDolar).toFixed(2)}Bs</td>
                    
                    </tr>
                </tbody>    
                    `
            }
        }
       
    }

    obtenerVentasPorFecha(cb)
    buscador()
}
let totalDeCadaVenta = []
function ventaTotalDelDia(producto) {
    let spanVentasDelDia = document.getElementById('ventas-total-span')
    let preioDolar = localStorage.getItem('dolar')
    if (producto.length == 0) {
        spanVentasDelDia.innerHTML = ''
        spanVentasDelDia.innerHTML = `No se registraron ventas este dia` 
    }else{
        spanVentasDelDia.innerHTML = ''
        for (let index = 0; index < producto.length; index++) {
            const element = parseFloat(producto[index].total) 
            totalDeCadaVenta.push(element)
        }
        let sumatoriaDeVentas = totalDeCadaVenta.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue
        })
        spanVentasDelDia.innerHTML = `${parseFloat(sumatoriaDeVentas).toFixed(2)}$ / ${parseFloat(sumatoriaDeVentas * preioDolar).toFixed(2)}Bs` 
        totalDeCadaVenta = []
    }
}

function obtenerVentasPorFecha(cb) {
    let btnFecha = document.getElementById('fecha')
    let inputDate = document.getElementById('input-date')

    btnFecha.addEventListener('click', function () {
        let fecha = inputDate.value
        let inputVacio = ''
        if (fecha != inputVacio) {
            ipcRenderer().send('fecha', fecha)
            ipcRenderer().on('resultado ventas',cb)
            inputDate.value = ''
        }
    })
}

function btnPaginacion() {
    let redondear = Math.ceil(array.length * .1)
    let elemtbtnPaginacion = document.getElementById('btn-paginacion-reporte')

    for (let index = 1; index <= redondear; index++) {
        elemtbtnPaginacion.innerHTML += `<button class='btn-paginacion-reporte'>${index} </button>`

    }
}


function cambiarPaginacion() {
    let elemtbtnPaginacion = document.getElementById('btn-paginacion-reporte')
    let btnPaginacion = Array.prototype.slice.call(document.getElementsByClassName('btn-paginacion-reporte'))
    elemtbtnPaginacion.addEventListener('click', function (e) {
        if (e.target.className == 'btn-paginacion-reporte') {
            let indice = btnPaginacion.indexOf(e.target) + 1
            pintarProducto(x(indice))
        }
    })
}
function pintarProducto(indice) {
    let containerTabla = document.getElementById('tabla-reporte')

    containerTabla.innerHTML = ''
    containerTabla.innerHTML = ` 
    <thead>
        <tr>
            <th>Codigo</th>
            <th>Descripción</th>
            <th class="th-width-Precio-compra">Precio compra</th>
            <th class="th-width">Precio venta</th>
            <th class="th-width">Utilidad</th>
            <th class="th-width">Stock</th>
            <th class="th-width">Stock minimo</th>
            <td>editar</td>

        </tr>
    </thead>    
        `

    for (let index = 0; index < indice.length; index++) {
        containerTabla.innerHTML += ` 
        <tr>
            <td class='td codigo'>${indice[index].Codigo} </td>
            <td class='td'>${indice[index].Descripción}</td>
            <td class='td'>${indice[index].Preciocompra}Bs</td>
            <td class='td'>${indice[index].Precioventa}Bs</td>
            <td class='td'>${indice[index].Utilidad}</td>
            <td class='td'>${indice[index].Stock}</td>
            <td class='td'>${indice[index].Stockminimo}</td>
        </tr>
        `
    }
}
function x(n) {
    let lon = n + '0'
    let fin = parseInt(lon)
    let inicio = fin - 10
    let nuevoArray = array.slice(inicio, fin)

    return nuevoArray
}
