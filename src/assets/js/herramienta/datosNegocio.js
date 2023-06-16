export default function () {
    
    let inputNombre = document.getElementById('input-negocio')
    let btnNombre = document.getElementById('btn-nombre')
    btnNombre.addEventListener('click',function () {
        let almacenarNombreNegocio = localStorage.setItem('nombreNegocio',inputNombre.value)
        window.location.reload()

    })
}