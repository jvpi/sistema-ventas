import tablaReporte from "./tabla.js"
export default function () {
    let elementReporte = document.getElementById('reporte')
    let containerTemaplateVenta = document.getElementById('template-reporte')
    let elementCross = document.getElementById('cerrar-reporte')
    elementReporte.addEventListener('click',function () {
        containerTemaplateVenta.style.display = 'block'
        tablaReporte()
    }) 
    elementCross.addEventListener('click',function () {
        containerTemaplateVenta.style.display = 'none'
    }) 
}