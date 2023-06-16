export default function () {
    aparecerForm()
    ocultarFotm()
    
}
function aparecerForm() {
    let btnNuevoCliente = document.getElementById('btn-cliente-credito')
    let form = document.getElementById('modal-credito')
    btnNuevoCliente.addEventListener('click',function () {
        form.style.display= 'block'
    })
}

function ocultarFotm() {
    let btnCancelar = document.getElementById('btn-cliente-cancelar')
    btnCancelar.addEventListener('click',cbOcultarFotm)
}
function cbOcultarFotm() {
    let form = document.getElementById('modal-credito')
    form.style.display= 'none'
} 
