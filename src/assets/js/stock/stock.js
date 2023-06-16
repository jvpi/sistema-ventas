import tabla from "./tabla.js"
export default function () {
    let elementStock = document.getElementById('stock')
    let containerTemaplateStock = document.getElementById('template-stock')
    let elementCross = document.getElementById('cerrar-stock')
    elementStock.addEventListener('click',function () {
        containerTemaplateStock.style.display = 'block'
        tabla()
    }) 
    elementCross.addEventListener('click',function () {
        containerTemaplateStock.style.display = 'none'
    }) 
}