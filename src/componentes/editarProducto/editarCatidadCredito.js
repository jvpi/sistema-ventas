const pool = require('../dbCredenciales.js')
let producto = {}


producto.editar = async function (producto) {
    const client = await pool.connect()
    try {
        for (let index = 0; index < producto.length; index++) {
            const text = `UPDATE productos set  stock = $1 WHERE id = ${producto[index].id}`;
            const value = [producto[index].cantidadActual] 
            const respuesta = await client.query(text,value)
        }
    } catch (error) {
        console.log(error);
    }finally{
        client.release()
		/*client.end()*/
    }
}


module.exports = producto