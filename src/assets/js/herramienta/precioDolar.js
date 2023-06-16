export default function () {
    let btnDolar = document.getElementById('btn-dolar')
    tasaActual()
    btnDolar.addEventListener('click',function () {
        inputDolar()
    })
}

function tasaActual() {
    let spanTasaActual = document.getElementById('tasa-actual')
    if (localStorage.getItem('dolar') != null) {
        spanTasaActual.innerHTML = `${localStorage.getItem('dolar')}$` 
    }
}
function inputDolar() {
    var ExpRegSoloNumeros=/^[0-9.]+$/
    let input = document.getElementById('precio-dolar')
    if (input.value.match(ExpRegSoloNumeros)) {
        localStorage.setItem('dolar',input.value)
        window.location.reload()
    }
    
}