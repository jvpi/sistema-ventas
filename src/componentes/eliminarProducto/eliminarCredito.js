const pool = require('../dbCredenciales.js')
let producto = {}

producto.eliminar = async function (nombre) {
    const client = await pool.connect()
    try {
        
        const text = `DELETE FROM credito WHERE nombre = '${nombre}'`
        const respuesta = await client.query(text)
        const textNombreCliente = `DELETE FROM nombreCliente WHERE nombre = '${nombre}'`
        const respuestaNombreCliente = await client.query(textNombreCliente)
        const textTotalMonto = `DELETE FROM totalMonto WHERE nombre = '${nombre}'`
        const respuestaTotalMonto = await client.query(textTotalMonto)
    } catch (error) {
        console.log(error);
    }finally{
        client.release()
		/*client.end()*/
    }
}

module.exports = producto