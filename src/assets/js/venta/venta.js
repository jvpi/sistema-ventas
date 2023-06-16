import tablaVenta from "./tabla.js"
export default function () {
    let elementVenta = document.getElementById('ventas')
    let containerTemaplateVenta = document.getElementById('container-template-venta')
    let elementCross = document.getElementById('cerrar-ventas')
    elementVenta.addEventListener('click',function () {
        containerTemaplateVenta.style.display = 'block'
        tablaVenta()
    }) 
    elementCross.addEventListener('click',function () {
        containerTemaplateVenta.style.display = 'none'
    }) 
}