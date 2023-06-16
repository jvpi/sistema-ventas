const pool = require('../dbCredenciales.js')
let producto = {}
let f1 = ''
let f2 = ''
let f3 = ''
let f4 = ''
producto.guardarVentas = async function (venta) {

    const client = await pool.connect()
   try {
    for (let index = 0; index < venta.length; index++) {
        const element = venta[index];
        const text =  `INSERT INTO  ventas 
                        (fecha, descripcion, cantidad, precioVenta, total,stock) 
                        VALUES($1, $2, $3, $4, $5, $6)`
        const values = [fechaActual()[0], element.inputDescripcion, element.inputCantidad, element.inputPrecioVenta,element.total,element.inputStock]
        const respuesta = await client.query(text,values)
        
    }
    } catch (error) {
        console.log(error);
    }finally{
        client.release()
		//client.end()
    }
    
  
}
module.exports = producto
function fechaActual() {
    let date = new Date()
    let dia = date.getDate()
    let mes = date.getMonth() +1
    if (mes < 10 && dia < 10) {
        f1 = `${date.getFullYear()}-${`0${mes}`}-0${dia}`
    }
    if (mes > 9 && dia < 10) {
        f2 = `${date.getFullYear()}-$${mes}-0${dia}`
    }
    if (mes < 10 && dia > 10) {
        f3 = `${date.getFullYear()}-${`0${mes}`}-${dia}`
    }
    if (mes > 9 && dia > 10) {
        f4 = `${date.getFullYear()}-${mes}-${dia}`
    }
    let arrayFechas = [f1,f2,f3,f4]
    let fechaValida = []
    for (let index = 0; index < arrayFechas.length; index++) {
        const element = arrayFechas[index];
        if (element != '') {
            fechaValida.push(element)
        }
        
    }
    return fechaValida
}