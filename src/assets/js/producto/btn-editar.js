const { ipcRenderer } = require('electron');

export default function (mesagge) {
    let tabla = document.getElementById('tabla-producto')
    let btnEliminarEditar = Array.prototype.slice.call(document.getElementsByClassName('container-btns'))
    tabla.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-editar')) {
            let idProductoAeditar = mesagge[btnEliminarEditar.indexOf(e.target.parentNode)].id
            let producto = mesagge[btnEliminarEditar.indexOf(e.target.parentNode)]
            templateFormEditarProducto(producto)
            formDisplayBlock()
            oculartarConIconoX()
            oculartarConBtnCancelar()
            preventDefault(idProductoAeditar)
        }
    })
}

function enviarData(producto,idProductoAeditar) {
    let data = [producto,idProductoAeditar]
    ipcRenderer.send('editarProducto', data)

}

function templateFormEditarProducto(producto) {
    let formEditarproducto = document.getElementById('container-form-editar-producto')


    formEditarproducto.innerHTML = `
    <div class='centrar-form-editar-producto' id='centrar-form-editar-producto'>
        <form class="form-editar-producto "  id="form-editar-producto">
                <div class="content-icon">
                    <span class="icon-cross estilos-iconos" id="crossEditar"></span>
                </div>
                <div class="inputs-alineacion">
                <div class="width-label">
                    <label for="textNombre">Código</label>
                </div>
                <div>
                    <input type="text" id="textNombre" required name="codigoProducto" class="estilos-inputs" value=${producto.codigo}>
                </div>

            </div>
            <div class="inputs-alineacion">
                <div class="width-label">
                    <label for="inputCorreo">Descripción</label>
                </div>
                <div>
                    <input type="text" id="inputCorreo" required name="descripcionProducto" class="estilos-inputs" value="${producto.descripcion}">
                </div>


            </div>
            <div class="inputs-alineacion">
                <div class="width-label"><label for="inputCiudad">Precio compra</label></div>
                <div>
                    <input type="text" class="estilos-inputs" required name="precioCompraProducto"  id="inputCiudad" value=${producto.preciocompra}>
                </div>
            </div>
            <div class="inputs-alineacion">
                <div class="width-label"><label for="inputCiudad">Precio Venta</label></div>
                <div>
                    <input type="text" class="estilos-inputs" required name="precioVentaProducto" id="inputCiudad" value=${producto.precioventa}>
                </div>
            </div>
            <div class="inputs-alineacion">
                <div class="width-label"><label for="inputCiudad">Stock </label></div>
                <div>
                    <input type="number" class="estilos-inputs" required name="stockProducto" id="inputCiudad" value=${producto.stock}>
                </div>
            </div>
            <div class="inputs-alineacion">
                <div class="width-label"><label for="inputCiudad">Stock Minimo</label></div>
                <div>
                    <input type="number" class="estilos-inputs" required name="stockMinimoProducto" id="inputCiudad" value=${producto.stockminimo}>
                </div>
            </div>
        

            <button class="btn-guardar-editar-form" id='btn-editar'>
                <span class="icon-credit-card"></span>
                <span> Editar</span>
            </button>
        </form>
        <button class="btn-guardar-editar-form red" id='btn-editar-form'>
            <span class="icon-credit-card"></span>
            <span> Cancelar</span>
        </button>
    </div>


`

}
function oculartarConIconoX() {
    let element = document.getElementsByClassName('estilos-iconos')
    for (let index = 0; index < element.length; index++) {
        element[index].addEventListener('click', formDisplayNone)
    }
}

function oculartarConBtnCancelar() {
    let elementBtnCancelar = document.getElementById('btn-editar-form')
    elementBtnCancelar.addEventListener('click', formDisplayNone)
}
function formDisplayNone() {
    let elementFormEditar = document.getElementById('centrar-form-editar-producto')
    let modal = document.getElementById('modal')
    elementFormEditar.style.display = 'none'
    modal.style.display = 'none'
}
function formDisplayBlock() {
    let modal = document.getElementById('modal')
    let elementFormEditar = document.getElementById('form-editar-producto')
    elementFormEditar.style.display = 'block'
    modal.style.display = 'block'
}
function preventDefault(idProductoAeditar) {
    let elementFormProducto = document.getElementById('form-editar-producto')
    elementFormProducto.addEventListener('submit', function (e) {
        e.preventDefault()
        validarForm(e,idProductoAeditar)
    })
}

function validarForm(e,idProductoAeditar) {
    let values = obtenerValuesForm(e)
    let ExpRegSoloNumeros = /^[0-9]+$/
    var ExpRegSoloNumerosDecimales=/^[0-9.]+$/
    let ExpRegSoloLetras =  /^[A-Za-z0-9\s]+$/g
    let validarNumeroCodigo = e.target.codigoProducto.value.match(ExpRegSoloNumeros)
    let validarLetrasDescripcion = e.target.descripcionProducto.value.match(ExpRegSoloLetras)
    let validarPrecioCompra = e.target.precioCompraProducto.value.match(ExpRegSoloNumerosDecimales)
    let validarPrecioVenta = e.target.precioVentaProducto.value.match(ExpRegSoloNumerosDecimales)
    if (validarNumeroCodigo && validarPrecioCompra && validarPrecioVenta && validarLetrasDescripcion) {
       
         enviarData(values,idProductoAeditar)
        formDisplayNone()
        window.location.reload()
    }
}

function obtenerValuesForm(e) {
    let utilidad = parseFloat(e.target.precioVentaProducto.value) - parseFloat(e.target.precioCompraProducto.value)
    
    let values = {
        codigo: parseInt(e.target.codigoProducto.value) ,
        descripcion: e.target.descripcionProducto.value,
        precioCompra: parseFloat(e.target.precioCompraProducto.value) ,
        precioVenta: parseFloat(e.target.precioVentaProducto.value) ,
        utilidad,
        stock: parseInt(e.target.stockProducto.value) ,
        stockMinimo: parseInt(e.target.stockMinimoProducto.value) 
    }
    console.log(values.utilidad);
    return values
}