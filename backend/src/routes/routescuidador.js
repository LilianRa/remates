const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')
//////////////////////////////
//////////////////////////////
// listar de equipos
// metodo GET
//URL /cuidador
//parametros : ninguno

router.get('/cuidador',verificarToken, (req, res)=>{
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM cuidador ', (error, registros)=>{
            if(error){
                console.log('Error en la base de datos', error)
            }else{
                res.json(registros)
            } 
      })
    }
   })
});


// listar de equipos con filtros
// metodo POST
//URL /equipos_filtrado
//parametros : 
    // filtros: id_modelo, nombre_equipo, id_ubicacion, id_tipo_equipo, serial
// router.post('/equipos_filtrado', bodyParser.json(),  (req , res)=>{
//     const { id_modelo, nombre_equipo, id_ubicacion, id_tipo_equipo, serial } = req.body
//     // console.log(id_modelo)
//     let my_query ="SELECT e.id_equipo, e.id_modelo ,e.nombre, te.nombre tipo_equipo ,concat_ws(' - ', m.nombre, f.nombre) modelo_fabricante, u.nombre lugar_ubicacion, e.serial, e.estado    FROM equipos AS e    INNER JOIN tipos_equipo AS te ON te.id_tipo_equipo=e.id_tipo_equipo  LEFT JOIN modelos AS m ON m.id_modelo=e.id_modelo LEFT JOIN ubicaciones AS u ON u.id_ubicacion=e.id_ubicacion LEFT JOIN fabricantes AS f ON f.id_fabricante = m.id_fabricante WHERE 1 ";
    
//     if(id_modelo){
//         my_query = my_query + ` AND e.id_modelo='${id_modelo}'`;
//     }
//     if(id_ubicacion){
//         my_query = my_query + ` AND e.id_ubicacion='${id_ubicacion}'`;
//     }
//     if(nombre_equipo){
//         my_query = my_query + ` AND e.nombre like '%${nombre_equipo}%'`;
//     }
//     if(id_tipo_equipo){
//         my_query = my_query + ` AND e.id_tipo_equipo='${id_tipo_equipo}'`;
//     }
//     if(serial){
//         my_query = my_query + ` AND e.serial like '%${serial}%'`;
//     }

// metodo GET
//URL /cuidador/:idcuidadro
//parametros : ninguno

router.get('/cuidador/:idcuidador', (req , res)=>{
    const { idcuidador } = req.params
   mysqlConnect.query('SELECT * FROM cuidador WHERE idcuidador=?', [idcuidador], (error, registros)=>{
      if(error){
            console.log('Error en la base de datos', error)
        }else{
           res.json(registros)
        }
    })
 })


// metodo POST
//URL /cuidador/
//parametros : en el cuerpo(body) 
    // cuidador, idlocalidad
  
router.post('/cuidador', bodyParser.json(), (req , res)=>{
    const { nombre, idlocalidad }  = req.body

    if(!nombre){
        res.json({
            status:false,
            mensaje: "El nombre del cuidador es un campo obligatorio"
        })
    }
    if(!idlocalidad){
        res.json({
            status:false,
            mensaje: "El codigo de localidad  es un campo obligatorio"
        })
    }
    // if(!idcuidador){
    //     res.json({
    //         status:false,
    //         mensaje: "El codigo de cuidador es un campo obligatorio"
    //     })
    // if(idcuidador){
    //     res.json({
    //         status:false,
    //         mensaje:"el codigo ingresado ya existe"
    //     })
    // }
    //           }
            mysqlConnect.query('INSERT INTO cuidador (nombre, idlocalidad) VALUES (?,?,)', [ nombre, idlocalidad], (error, registros)=>{
                    if(error){
                        console.log('Error en la base de datos', error)
                    }else{
                    res.json({
                        status:true,
                        mensaje: "El registro se grabo correctamente"
                    })
                    }
                })
                       
            })         
            

// traer los  datos del equipo por el ID

// metodo GET
//URL /equipos/:id_equipo
//parametros : id_equipo
router.get('/cuidador/:idcuidador', (req , res)=>{
    const { idcuidador } = req.params
    mysqlConnect.query('SELECT * FROM cuidador WHERE idcuidador=?', [idcuidador], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            if(registros.length>0){
                res.json({
                    status:true,
                    datos: registros
                })
            }else{
                res.json({
                    status:false,
                    mensaje:"El ID del cuidador no existe" 
                })
            }
            
        }
    })
})
// metodo UPDATE
//URL /cuidador/
//parametros : 
    // y el parametro que vamos a borrar logicamente ->idcuidador
    router.put('/cuidador/:idcuidador', bodyParser.json(), (req , res)=>{
        const { idcuidador } = req.params
        const { nombre, idlocalidad,estado } = req.body
        if(!nombre){
            res.json({
                status:false,
                mensaje: "El nombre del cuidador es un campo obligatorio"
            })
        }
        if(!idlocalidad){
            res.json({
                status:false,
                mensaje: "El código de localidad es obligatorio"
            })
        }
            
        mysqlConnect.query('SELECT * FROM cuidador WHERE idcuidador=?', [idcuidador], (error, registros)=>{
            if(error){
                console.log('Error en la base de datos', error)
            }else{

                if(registros.length>0){
                    mysqlConnect.query('UPDATE cuidador SET nombre=?, idlocalidad=?,estado=?  WHERE idcuidador = ?', [nombre, idlocalidad,estado,idcuidador], (error, registros)=>{
                        if(error){
                            console.log('Error en la base de datos', error)
                        }else{
                            res.json({
                                status:true,
                                mensaje:"El registro " +idcuidador+ " se edito correctamente" 
                            })
                        }
                    })
                }else{
                    res.json({
                        status:false,
                        mensaje:"El ID del cuidador no existe" 
                    })
                }
                
                }
        }) 
    
    })

// metodo DELETE
//URL /equipos/:id_equipo
//parametros : 
    // y el parametro que vamos a borrar logicamente ->id_equipo
// router.delete('/cuidador/:idcuidador', bodyParser.json(), (req , res)=>{
//     const { idcuidador } = req.params
//     mysqlConnect.query('SELECT * FROM cuidador WHERE idcuidador=?', [idcuidador], (error, registros)=>{
//         if(error){
//             console.log('Error en la base de datos', error)
//         }else{
//             if(registros.length>0){
//                 mysqlConnect.query('UPDATE cuidador SET estado = "B"  WHERE idcuidador = ?', [idcuidador], (error, registros)=>{
//                     if(error){
//                         console.log('Error en la base de datos', error)
//                     }else{
//                         res.json({
//                             status:true,
//                             mensaje:"El registro " +idcuidador+ " se dio de baja correctamente" 
//                         })
//                     }
//                 })
//             }else{
//                 res.json({
//                     status:false,
//                     mensaje:"El ID del cuidador no existe" 
//                 })
//             }
            
//         }
//     })  
// })
router.delete('/cuidador/:idcuidador', bodyParser.json(), verificarToken, (req , res)=>{

    const { actualizar }  = req.body
    const { idcuidador } = req.params
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('UPDATE cuidador SET estado = ?  WHERE idcuidador = ?', [actualizar, idcuidador], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json({
                        status:true,
                        mensaje: "El cambio de estado se realizo correctamente"
                        })
                }
            })
        }
    })
})


function verificarToken(req, res, next){
    const bearer= req.headers['authorization'];
    if(typeof bearer!=='undefined'){
        const token =bearer.split(" ")[1]
        req.token= token;
        next()
    }else{
        res.send('Debe contener un token')
    }
 }


module.exports= router;