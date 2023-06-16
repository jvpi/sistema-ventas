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
    Descripción: 'pasta',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 3,
    Descripción: 'azucar',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 4,
    Descripción: 'aceite',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 5,
    Descripción: 'cafe',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 6,
    Descripción: 'harina',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 7,
    Descripción: 'harina de trigo',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 8,
    Descripción: 'refresco',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 9,
    Descripción: 'salsa',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 10,
    Descripción: 'mayonesa',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 11,
    Descripción: 'atun',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 12,
    Descripción: 'cigarro',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 13,
    Descripción: 'huevo',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 14,
    Descripción: 'papel',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 15,
    Descripción: 'sardina',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 16,
    Descripción: 'limpiador',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 17,
    Descripción: 'caramelo',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 18,
    Descripción: 'chupeta',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 19,
    Descripción: 'pepito',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}, {
    Codigo: 20,
    Descripción: 'dulce',
    Preciocompra: 10,
    Precioventa: 15,
    Utilidad: 5,
    Stock: 20,
    Stockminimo: 5
}]
import seleccionarProducto from './seleccionarProducto.js';
import buscador from './buscador.js';
const { ipcRenderer } = require('electron');

function enviarData() {
    ipcRenderer.send('obtener1', 'datos')

}
function recibirMensaje(cb) {
    ipcRenderer.on('obtenerProductoParaTablaVenta', cb)
}
export default function () {
    enviarData()
    recibirMensaje(cb)
    let precioDolar = localStorage.getItem('dolar')
    function cb(e,mesagge) {
       
        let tabla = document.getElementById('table-venta')
        tabla.innerHTML=''
        tabla.innerHTML= ` 
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>  
                </tr>
            </thead>
            `
        for (let index = 0; index < mesagge.length; index++) {
            tabla.innerHTML += ` 
            <tbody class="venta-tbody">
                <tr>
                    <td class='td descripcion1'>${mesagge[index].descripcion}</td>
                    <td class='td td-stock'>${mesagge[index].stock}</td>
                    <td class='td'>${parseFloat(mesagge[index].precioventa).toFixed(2)}$ / ${(mesagge[index].precioventa * precioDolar).toFixed(2)}$ </td>
                </tr>
            </tbody>    
            `
        }
        seleccionarProducto(mesagge)
        buscador()
    }

}
function btnPaginacion() {
    let redondear = Math.ceil(array.length * .1)
    let elemtbtnPaginacion = document.getElementById('btn-paginacion-venta')

    for (let index = 1; index <= redondear; index++) {
        elemtbtnPaginacion.innerHTML += `<button class='btn-paginacion-venta'>${index} </button>`

    }
}

function cambiarPaginacion() {
    let elemtbtnPaginacion = document.getElementById('btn-paginacion-venta')
    let btnPaginacion = Array.prototype.slice.call(document.getElementsByClassName('btn-paginacion-venta'))
    elemtbtnPaginacion.addEventListener('click', function (e) {
        if (e.target.className == 'btn-paginacion-venta') {
           
            let indice = btnPaginacion.indexOf(e.target) + 1

            pintarProducto(x(indice))
        }
    })
}

function pintarProducto(indice) {
    let containerTabla = document.getElementById('table-venta')
   
    containerTabla.innerHTML=''
    containerTabla.innerHTML= ` 
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>  
            </tr>
        </thead>
        `
    for (let index = 0; index < indice.length; index++) {
       
        containerTabla.innerHTML += ` 
       
            <tr>
            <td class='td codigo'>${indice[index].Codigo} </td>
                <td class='td'>${indice[index].Descripción}</td>
                <td class='td'>${indice[index].Precioventa}Bs</td>
                <td class='td'>${indice[index].Stock}</td>
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