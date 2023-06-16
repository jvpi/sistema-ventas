import productoHeader from "./producto/header.js";
import headerHerramienta from "./herramienta/header.js";
import venta from "./venta/venta.js";
import credito from "./credito/credito.js";
import reporte from "./reporte/reporte.js";
import stock from "./stock/stock.js";
import tablaCredito from "./credito/tabla.js";
import buscadorCredito from "./credito/buscador.js";

import pintarNombreNegocio from "./herramienta/pintarNombreNegocio.js";

headerHerramienta()
venta()
productoHeader()
stock()//arreglar el buscador
reporte()
pintarNombreNegocio()


credito()
tablaCredito()
buscadorCredito()

actulizarWindow()
function actulizarWindow() {
    let btn = document.getElementById('btn-actualizar')
    btn.addEventListener('click',function () {
        window.location.reload()
    })
}


