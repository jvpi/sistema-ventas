const { ipcRenderer } = require('electron');
export default function () {
    return {
        ipcRenderer:function (mensaje,valor) {
            ipcRenderer.send(mensaje,valor)
        }
    }
}