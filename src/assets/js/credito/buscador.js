export default function () {
    let buscador = document.getElementById('buscador-credito')
    let descripcion = document.getElementsByClassName('descripcion-credito')
    let tbody = document.getElementsByClassName('credito-tbody')
    buscador.addEventListener('keyup',function () {
        for (let index = 0; index < descripcion.length; index++) {
            const element = descripcion[index].textContent.toLocaleLowerCase();
            if ( element.includes(this.value.toLocaleLowerCase())) {
                tbody[index].style.display = "table-row-group"
            }else{
                tbody[index].style.display = "none"
            }
        }
    })
}