export default function () {
    let buscador = document.getElementById('buscador')
    let descripcion = document.getElementsByClassName('descripcion')
    let tbody = document.getElementsByClassName('venta-producto')
    buscador.addEventListener('keyup',function () {
        for (let index = 0; index < descripcion.length; index++) {
            const element = descripcion[index].textContent.toLowerCase();
            if ( element.includes(this.value.toLowerCase())) {
                tbody[index].style.display = "table-row-group"
            }else{
                tbody[index].style.display = "none"
            }
        }
    })
}