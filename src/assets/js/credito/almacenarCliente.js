import ipcRenderer from "./ipcRenderer.js"
export default function () {
    guardarCliente()
}


function guardarCliente() {
    let btnGuardar = document.getElementById('btn-cliente-guardar')
    btnGuardar.addEventListener('click',function () {
        ocualtarForm()
        almacenarEnLocalStorage()
    })
}

function ocualtarForm() {
    let form = document.getElementById('modal-credito')
       form.style.display= 'none'
        window.location.reload()
}
function almacenarEnLocalStorage() {
    let input = document.getElementById('input-cliente').value
    ipcRenderer().send('nombreCliente',input)
}

