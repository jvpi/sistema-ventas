import buscador from './buscador.js';
import btnEliminar from './btn-eliminar.js';
import btnEditar from './btn-editar.js';
import registrarProducto from './registrarProducto.js';
import tabs from './tabs.js';
const { ipcRenderer } = require('electron');


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
function enviarData() {
    ipcRenderer.send('obtener', 'datos')

}
function recibirMensaje(cb) {
    ipcRenderer.on('resultado', cb)
}
export default function () {
    enviarData()
    recibirMensaje(cb)
    document.getElementById('actualizar').addEventListener('click',function () {
        window.location.reload()
    })
    function cb(e, mesagge) {
        let preioDolar = localStorage.getItem('dolar')

      
        let containerTabla = document.getElementById('tabla-producto')
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
                <td>fecha</td>
                <td>editar</td>

            </tr>
            </thead>    
            `
        for (let index = 0; index < mesagge.length; index++) {
            containerTabla.innerHTML += ` 
            <tbody class="venta-producto">
                <tr>
                    <td class='td codigo' >${mesagge[index].codigo} </td>
                    <td class='td descripcion'>${mesagge[index].descripcion}</td>
                    <td class='td td-stock-utilidad'>${parseFloat(mesagge[index].preciocompra).toFixed(2) } $ / ${(mesagge[index].preciocompra * preioDolar).toFixed(2)} BS </td>
                    <td class='td precio-dolar' >${parseFloat(mesagge[index].precioventa).toFixed(2)} $ / ${(mesagge[index].precioventa * preioDolar).toFixed(2)} Bs </td>
                    <td class='td td-stock-utilidad'>${parseFloat(mesagge[index].utilidad).toFixed(2)} $ / ${(mesagge[index].utilidad * preioDolar).toFixed(2)} Bs</td>
                    <td class='td '>${mesagge[index].stock}</td>
                    <td class='td'>${mesagge[index].stockminimo}</td>
                    <td class='td'>${mesagge[index].fecha}</td>
                    <td class='td container-btns'>
                        <span class="icon-pencil btn-editar"></span> 
                        <span class="icon-bin btn-eliminar"></span>
                    </td>
                </tr>
            </tbody>   
            `
        }

        buscador(mesagge)
        registrarProducto()
        btnEliminar(mesagge)
        btnEditar(mesagge)
        tabs()
    }
}



function btnPaginacion() {
    let redondear = Math.ceil(array.length * .1)
    let elemtbtnPaginacion = document.getElementById('btn-paginacion')

    for (let index = 1; index <= redondear; index++) {
        elemtbtnPaginacion.innerHTML += `<button class='btn-paginacion'>${index} </button>`

    }
}


function cambiarPaginacion() {
    let elemtbtnPaginacion = document.getElementById('btn-paginacion')
    let btnPaginacion = Array.prototype.slice.call(document.getElementsByClassName('btn-paginacion'))
    elemtbtnPaginacion.addEventListener('click', function (e) {
        if (e.target.className == 'btn-paginacion') {
            let indice = btnPaginacion.indexOf(e.target) + 1

            pintarProducto(x(indice))

        }
    })
}
function pintarProducto(indice) {
    let containerTabla = document.getElementById('tabla-producto')

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
            <td>fecha</td>
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
            <td class='td'>${indice[index].precioventa}Bs</td>
            <td class='td'>${indice[index].utilidad}</td>
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
