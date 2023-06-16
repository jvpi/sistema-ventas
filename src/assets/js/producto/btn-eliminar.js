
import ipcRenderer from './ipcRenderer.js';
export default function (mesagge) {
    let tabla = document.getElementById('tabla-producto')

    tabla.addEventListener('click', function (e) {
        let btnEliminarEditar = Array.prototype.slice.call(document.getElementsByClassName('container-btns'))

        if (e.target.classList.contains('btn-eliminar')) {
            if (mesagge.length > 0) {
                let idProductoAeliminar = mesagge[btnEliminarEditar.indexOf(e.target.parentNode)].id
                enviarData(idProductoAeliminar)
                window.location.reload()
            }


        }
    })
}


function enviarData(idProductoAeliminar) {
    ipcRenderer().send('idProducto', idProductoAeliminar)

}