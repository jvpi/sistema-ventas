const pool = require('../dbCredenciales.js')
let producto = {}

producto.eliminar = async function (id) {
    const client = await pool.connect()
    try {
        const text = `DELETE FROM productos WHERE id = ${id}`
        const respuesta = await client.query(text)
        //return respuesta
    } catch (error) {
        console.log(error);
    }finally{
        client.release()
		/*client.end()*/
    }
}

module.exports = producto