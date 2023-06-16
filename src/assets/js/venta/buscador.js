export default function () {
    let buscador = document.getElementById('buscador-ventas')
    let descripcion = document.getElementsByClassName('descripcion1')
    let tbody = document.getElementsByClassName('venta-tbody')
    buscador.addEventListener('keyup',function () {
        console.log('dasd');
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