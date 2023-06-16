import ipcRenderer from "./ipcRenderer.js";
export default function (nombreSeleccionado) {
    abonarCredito(nombreSeleccionado)
}

function abonarCredito(nombreSeleccionado) {
    let inputAbonar = document.getElementById('input-abonar-credito')
    let btnAbonarCredito = document.getElementById('btn-abonar-credito')
    btnAbonarCredito.addEventListener('click',function () {
        let montoParaAbonar = parseFloat(inputAbonar.value)
        let comprobarSiEsUnNumero = !isNaN(montoParaAbonar)
        let montoCredito = parseFloat(localStorage.getItem('creditoMonto')) 
        if (comprobarSiEsUnNumero && inputAbonar.value.length > 0 && montoParaAbonar <= montoCredito) {
            let array = [nombreSeleccionado,montoParaAbonar]
            ipcRenderer().send('abonarCredito',array)
            window.location.reload()
        }
    })


}