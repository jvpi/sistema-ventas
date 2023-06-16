
export default function () {
    let buscador = document.getElementById('buscador-stock')
    let codigo = document.getElementsByClassName('codigo')
    let tbody = document.getElementsByTagName('tbody')
    buscador.addEventListener('keyup',function () {
        
        for (let index = 0; index < codigo.length; index++) {
            const element = codigo[index];
            if ( element.textContent.includes(this.value)) {
                tbody[index].style.display = "table-row-group"
            }else{
                tbody[index].style.display = "none"
            }
        }
    })
}