const pool = require('../dbCredenciales.js')
let producto = {}

producto.ejecutar = async function (data) {
    const client = await pool.connect()
    let nombre = data[0]
    let montoActual = data[1]

    try {
        const text = `select * from totalMonto `
        const respuesta = await client.query(text)
        let result = respuesta.rows.filter(function (elemento) {
            return elemento.nombre == nombre
        })
        if (result.length > 0) {
            let montoAdquirido = parseFloat(result[0].monto)
            let suma = montoAdquirido + montoActual
            const text = `UPDATE totalMonto set  monto = $1 WHERE nombre = '${nombre}'`;
            const value = [suma]
            const respuesta = await client.query(text, value)
        } else {
            const text = `INSERT INTO  totalMonto 
            (nombre,monto) 
            VALUES($1,$2)`
            const values = [nombre, montoActual]
            const respuesta = await client.query(text, values)
        }


    } catch (error) {
        console.log(error);
    } finally {
        client.release()
        //client.end()
    }


}
module.exports = producto