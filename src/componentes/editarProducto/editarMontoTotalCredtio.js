const pool = require('../dbCredenciales.js')
let producto = {}

producto.editar = async function (data) {
    const client = await pool.connect()
    let nombre = data[0]
    let montoActual = data[1]
    
    try {
        const textObtener =  `select monto from totalMonto where nombre = '${nombre}'; `
        const respuestaTotalMonto = await client.query(textObtener)
        let monto = parseFloat(respuestaTotalMonto.rows[0].monto) 
        let montoAabonar = data[1]
        let montoActual = monto - montoAabonar
        const text = `UPDATE totalMonto set  monto = $1 WHERE nombre = '${nombre}'`;
        const value = [montoActual] 
        const respuesta = await client.query(text,value)
        
    } catch (error) {
        console.log(error);
    }finally{
        client.release()
		//client.end()
    }
    
  
}
module.exports = producto