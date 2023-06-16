const pool = require('../dbCredenciales.js')
let producto = {}

producto.guardar = async function (credito) {
    const client = await pool.connect()
    let date = new Date()
    let fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
   try {
    for (let index = 0; index < credito.length; index++) {
        const element = credito[index];
        const text =  `INSERT INTO  credito 
                        (nombre, descripcion, precioproducto, cantidad, total,fecha) 
                        VALUES($1, $2, $3, $4, $5, $6)`
        const values = [element.nombreCliente, element.inputDescripcion, element.inputPrecioVenta, element.inputCantidad,element.total,fecha]
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