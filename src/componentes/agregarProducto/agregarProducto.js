const pool = require('../dbCredenciales.js')
let producto = {}

producto.guardar = async function (data) {
    const client = await pool.connect()
    let {codigo, descripcion, precioCompra, precioVenta,utilidad,stock,stockMinimo} = data
    let date = new Date()
    let fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
    try {
        const text =  `INSERT INTO  productos 
                        (codigo, descripcion, preciocompra, precioventa,utilidad,stock,stockminimo,fecha) 
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8)`
        const values = [codigo, descripcion, precioCompra, precioVenta,utilidad,stock,stockMinimo,fecha]
        const respuesta = await client.query(text,values)
        
    } catch (error) {
        console.log(error);
    }finally{
        client.release()
		//client.end()
    }
    
  
}
module.exports = producto