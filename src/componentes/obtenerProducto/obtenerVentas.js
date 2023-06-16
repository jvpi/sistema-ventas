const pool = require('../dbCredenciales.js')
let producto = {}
producto.resultado = async function (fecha) {
    const client = await pool.connect()
    try {
        const text = `select * from ventas where fecha = '${fecha}'`
        const respuesta = await client.query(text)
        return respuesta.rows
    } catch (error) {
        console.log(error);
    }finally{
        client.release()
		/*client.end()*/
    }
}

module.exports = producto