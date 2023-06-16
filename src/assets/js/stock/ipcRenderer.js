const { ipcRenderer } = require('electron');
export default function (params) {
    return {
        send:function (mensaje,valor) {
            ipcRenderer.send(mensaje, valor)
        },
        on:function (mensaje,valor) {
            ipcRenderer.on(mensaje, valor)
        }
    }
}