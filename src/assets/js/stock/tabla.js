
//let arrayDiezPosiciones = array.slice(0, 10)

import ipcRenderer from "./ipcRenderer.js"
import buscador from "./buscador.js"
export default function () {

    let containerTabla = document.getElementById('table-stock')
    function cb(e,producto) {
        let productoStockBajo = producto.filter(function (element) {
            return element.stock <= element.stockminimo
        })  
        containerTabla.innerHTML=''
        containerTabla.innerHTML= ` 
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                
            </tr>
        </thead>    
            `
        for (let index = 0; index < productoStockBajo.length; index++) {
            containerTabla.innerHTML += ` 
                <tr>
                    <td class='td'>${productoStockBajo[index].descripcion}</td>
                    <td class='td codigo' >${productoStockBajo[index].stock} </td>
                </tr>
                `
        }
    }
    ipcRenderer().on('resultadoStock',cb)
    ipcRenderer().send('tablaStockMinimo','dsa')
    //buscador()
   /* btnPaginacion()
    cambiarPaginacion()*/
}


function btnPaginacion() {
    let redondear = Math.ceil(array.length * .1)
    let elemtbtnPaginacion = document.getElementById('btn-paginacion-stock')

    for (let index = 1; index <= redondear; index++) {
        elemtbtnPaginacion.innerHTML += `<button class='btn-paginacion-stock'>${index} </button>`

    }
}

function cambiarPaginacion() {
    let elemtbtnPaginacion = document.getElementById('btn-paginacion-stock')
    let btnPaginacion = Array.prototype.slice.call(document.getElementsByClassName('btn-paginacion-stock'))
    elemtbtnPaginacion.addEventListener('click', function (e) {
        if (e.target.className == 'btn-paginacion-stock') {
            let indice = btnPaginacion.indexOf(e.target) + 1
            pintarProducto(x(indice))
        }
    })
}
function pintarProducto(indice) {
    let containerTabla = document.getElementById('table-stock')
    containerTabla.innerHTML=''
    containerTabla.innerHTML= ` 
    <thead>
        <tr>
            <th>Codigo</th>
            <th>Descripción</th>
            
        </tr>
    </thead>    
        `
    for (let index = 0; index < indice.length; index++) {
        containerTabla.innerHTML += ` 
        <tr>
            
            <td class='td'>${indice[index].Descripción}</td>
            <td class='td codigo'>${indice[index].Codigo} </td>
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