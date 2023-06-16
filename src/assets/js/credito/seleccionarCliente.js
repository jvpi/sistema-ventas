import ipcRenderer from "./ipcRenderer.js";
import abonarCredito from "./abonarCredito.js";
export default function () {
    function cb(e, nombreCliente) {
        let tableCliente = document.getElementById('table-nombre-cliente')
        tablaNombreCliente(nombreCliente)
        tableCliente.addEventListener('click', function (e) {

            if (e.target.tagName == 'TD') {
                let tablaNombreCliente = Array.prototype.slice.call(document.getElementsByClassName('tbody-nombre-cliente'))
                let indice = tablaNombreCliente.indexOf(e.target.parentNode.parentNode)
                let nombreSeleccionado = nombreCliente[indice].nombre
                localStorage.setItem('nombreCliente',nombreSeleccionado)
                transferirNombreAlInput(nombreSeleccionado)
              
                tablaCredito(nombreSeleccionado)
                montoAdquirido(nombreSeleccionado)
                abonarCredito(nombreSeleccionado)
            }

        })

    }
    ipcRenderer().send('seleccionarCliente', 'dasd')
    ipcRenderer().on('resultadoNombreCliente', cb)
}
function montoAdquirido(nombreSeleccionado) {
    function cb(e,resultadoMonto) {
        
        let inputMonto = document.getElementById('monto-adquirido')
        if (resultadoMonto.length) {
            let montoCredito = resultadoMonto[0].monto
            inputMonto.value = `${parseFloat( montoCredito).toFixed(2)} Bs`
            localStorage.setItem('creditoMonto',montoCredito)
        }
    }
    ipcRenderer().send('montoCreditoCliente', nombreSeleccionado)
    ipcRenderer().on('resultadoMontoCreditoCliente', cb)
}

function tablaCredito(nombreSeleccionado) {
    
    function cb(e, credito) {
        let tablaCreditoAdquirido = document.getElementById('credito-adquirido')
        let containerMontoAdquirido = document.getElementById('container-input-monto-adquirido')
        let containerAbonarCredito = document.getElementById('container-abonar-credito')
        tablaCreditoAdquirido.innerHTML = ''
        tablaCreditoAdquirido.innerHTML = ` 
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
       for (let index = 0; index < credito.length; index++) {
            const element = credito[index];
            tablaCreditoAdquirido.innerHTML += `
                <tr>
                    <td>${element.nombre} </td>
                    <td>${element.descripcion} </td>
                    <td>${element.cantidad}.00</td>
                    <td>${parseFloat(element.precioproducto).toFixed(2)}Bs</td>
                    <td>${parseFloat(element.total).toFixed(2)}Bs </td>
                    <td>${element.fecha} </td>
                </tr>
            `
        }
        containerMontoAdquirido.style.display = 'block'
        containerAbonarCredito.style.display = 'block'
       
    }
    ipcRenderer().send('creditoCliente', nombreSeleccionado)
    ipcRenderer().on('resultadoCreditoCliente', cb)
}
function transferirNombreAlInput(nombreSeleccionado) {
    let inputNombreCliente = document.getElementById('nombre-cliente')
    inputNombreCliente.value = nombreSeleccionado

}
function tablaNombreCliente(nombreCliente) {
    let tableCliente = document.getElementById('table-nombre-cliente')
    if (nombreCliente.length) {
        for (let index = 0; index < nombreCliente.length; index++) {
            tableCliente.innerHTML += ` 
            <tbody class="tbody-nombre-cliente">
                <tr>
                    <td class='td descripcion-credito'>${nombreCliente[index].nombre}</td>
                </tr>
            </tbody>    
            `

        }
    }
}