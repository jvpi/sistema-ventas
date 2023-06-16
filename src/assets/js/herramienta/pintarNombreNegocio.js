export default function () {
    let nombreNegocio = document.getElementById('nombre-negocio')
    if (localStorage.getItem('nombreNegocio') != null) {
        nombreNegocio.innerHTML = localStorage.getItem('nombreNegocio')
    }
}