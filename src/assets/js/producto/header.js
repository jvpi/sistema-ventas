import tablaProducto from "./tabla.js"
export default function () {
    let elementProducto = document.getElementById('productos')
    let containerTemaplateProducto = document.getElementById('container-template-producto')
    let elementCross = document.getElementById('cerrar')
    elementProducto.addEventListener('click',function () {
        containerTemaplateProducto.style.display = 'block'
        tablaProducto()
    }) 
    elementCross.addEventListener('click',function () {
        containerTemaplateProducto.style.display = 'none'
    }) 
}