export default function () {
    let buscador = document.getElementById('buscador-reporte')
    let descripcionVentas = document.getElementsByClassName('descripcion-ventas')
    let tbody = document.getElementsByClassName('tbody-reporte')
    buscador.addEventListener('keyup',function () {
        for (let index = 0; index < descripcionVentas.length; index++) {
            const element = descripcionVentas[index];
            if ( element.textContent.includes(this.value)) {
                tbody[index].style.display = "table-row-group"
            }else{
                tbody[index].style.display = "none"
            }
        }
    })
}