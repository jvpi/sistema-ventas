export default function () {
    let elementCredito = document.getElementById('credito')
    let containerTemaplateVenta = document.getElementById('container-template-credito')
    let elementCross = document.getElementById('cerrar-credito')
    elementCredito.addEventListener('click',function () {
        containerTemaplateVenta.style.display = 'block'

    }) 
    elementCross.addEventListener('click',function () {
        containerTemaplateVenta.style.display = 'none'
    }) 
}