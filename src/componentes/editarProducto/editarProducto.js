const pool = require('../dbCredenciales.js')
let producto = {}


producto.editar = async function (producto) {
    const client = await pool.connect()
    let {descripcion,codigo,precioCompra, precioVenta,stock,stockMinimo,utilidad} = producto[0]
  
    let id = producto[1]
    try {
       const text = `UPDATE productos set  descripcion = $1, codigo = $2, preciocompra = $3,
        precioventa = $4, stock = $5, stockminimo = $6, utilidad = $7 WHERE id = ${id}`;
        const value = [descripcion,codigo,precioCompra, precioVenta,stock,stockMinimo,utilidad] 
        const respuesta = await client.query(text,value)
    } catch (error) {
        console.log(error);
    }finally{
        client.release()
		/*client.end()*/
    }
}


module.exports = producto