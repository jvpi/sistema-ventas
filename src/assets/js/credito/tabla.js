
import seleccionarProducto from "./seleccionarProducto.js";
import ipcRenderer from "./ipcRenderer.js";
import formClienteCredito from "./formClienteCredito.js";
import almacenarCliente from "./almacenarCliente.js";
import seleccionarCliente from "./seleccionarCliente.js";
import eliminarCredito from "./eliminarCredito.js"
export default function () {
function cb(e,producto) {
    seleccionarProducto(producto)
    let tabla = document.getElementById('table-credito')
    let precioDolar = localStorage.getItem('dolar')
    for (let index = 0; index < producto.length; index++) {
        tabla.innerHTML += ` 
        <tbody class="credito-tbody">
            <tr>
                <td class='td descripcion-credito'>${producto[index].descripcion}</td>
                <td class='td td-stock-credito'>${producto[index].stock}</td>
                <td class='td'>${parseFloat(producto[index].precioventa).toFixed(2)} Bs / ${(producto[index].precioventa / precioDolar).toFixed(3)}$ </td>
            </tr>
        </tbody>    
        `
    }
}
ipcRenderer().on('resultadoCredito',cb)
ipcRenderer().send('tablaCreadito','dsa')
formClienteCredito()
almacenarCliente()
seleccionarCliente()
eliminarCredito()
}    