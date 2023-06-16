import precioDolar from "./precioDolar.js"
import datosNegocio from "./datosNegocio.js"
export default function () {
    let elementConfiguracion = document.getElementById('configuracion')
    let containerTemaplateConfiguracion = document.getElementById('template-herramientas')
    let elementCross = document.getElementById('cerrar-configuracion')
    elementConfiguracion.addEventListener('click',function () {
        containerTemaplateConfiguracion.style.display = 'block'
        precioDolar()
        datosNegocio()
    }) 
    elementCross.addEventListener('click',function () {
        containerTemaplateConfiguracion.style.display = 'none'
    }) 
}