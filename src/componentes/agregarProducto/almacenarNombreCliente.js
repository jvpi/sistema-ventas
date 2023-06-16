const pool = require('../dbCredenciales.js')
let producto = {}

producto.guardar = async function (nombre) {
    const client = await pool.connect()
    let date = new Date()

    let fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
    try {
        const textNombre = `select nombre from nombreCliente where nombre = '${nombre}'`
        const respuestaNombre = await client.query(textNombre)
        let nombreNoRegistrado = !respuestaNombre.rows.length
       
        if (nombreNoRegistrado) {
            const text =  `INSERT INTO  nombreCliente 
                        (nombre) 
                        VALUES($1)`
            const values = [nombre]
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