const pool = require('../dbCredenciales.js')
let producto = {}
producto.obtener = async function (nombre) {
    const client = await pool.connect()
    try {
        const text = `select * from totalMonto where nombre = '${nombre}'`
        const respuesta = await client.query(text)
        return respuesta
    } catch (error) {
        console.log(error);
    }finally{
        client.release()
		/*client.end()*/
    }
}

module.exports = producto