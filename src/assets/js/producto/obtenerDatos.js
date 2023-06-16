const { ipcRenderer } = require('electron');
export default function () {
    enviarData()
    recibirMensaje()
}  
function enviarData(values) {
    ipcRenderer.send('obtener', 'datos')
}
function recibirMensaje() {
    ipcRenderer.on('resultado', function (e, mesagge) {
    })
}