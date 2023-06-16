import ipcRenderer from "./ipcRenderer.js";
export default function () {
    let btnPagarDeuda = document.getElementById('btn-pagar-deuda') 
   
    btnPagarDeuda.addEventListener('click',function () {
        let nombreCliente = localStorage.getItem('nombreCliente')
        if (confirm('Desea eliminar credito')) {
            ipcRenderer().send('eliminarCredito',nombreCliente)
            window.location.reload()
        }else{
            return true
        }
        
    })
}