const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')

//////////////////////////////
//////////////////////////////
// listar las carreras
// metodo GET
//URL /carreras
//parametros : ninguno

router.get('/carreras',verificarToken, (req, res)=>{
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM carrera ', (error, registros)=>{
            if(error){
                console.log('Error en la base de datos', error)
            }else{
                res.json(registros)
            } 
      })
    }
   })
});


router.put('/cambiar_estado_carrera/:idcarreras', bodyParser.json(), (req , res)=>{
    const { actualizar }  = req.body
    const { idcarreras } = req.params
    mysqlConnect.query('UPDATE carrera SET estado = ?  WHERE idcarrera = ?', [actualizar, idcarreras], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json({
                status:true,
                mensaje: "El cambio de estado se realizo correctamente"
                })
        }
    })
})
// listar de carreras con filtros
// metodo POST
//URL /carrera_filtrado
//parametros : 
    // filtros: idcarrera, nombre_caballo, nombre_jockey , peso, distancia
// router.post('/carreras_filtrado', bodyParser.json(),  (req , res)=>{
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

    // mysqlConnect.query(my_query, (error, registros)=>{
    //     if(error){
    //         console.log('Error en la base de datos', error)
    //     }else{
    //         res.json(registros)
    //     }
    // })
// })
////////////////////insert de equipos

// metodo POST
//URL /carreras/
//parametros : en el cuerpo(body) 
    // idcaballo,idcuidador,idjockey,peso,distancia,fecha

router.post('/carreras', bodyParser.json(), (req , res)=>{
    const { idcaballo, idcuidador, idjockey, peso, distancia,fecha }  = req.body
    if(!idcaballo){
        res.json({
            status:false,
            mensaje: "El id del caballo es un campo obligatorio"
        })
    }
    if(!id_cuidador){
        res.json({
            status:false,
            mensaje: "El id del cuidador es un campo obligatorio"
        })
    }
    if(!idjockey){
        res.json({
            status:false,
            mensaje: "El id del jockey es un campo obligatorio"
        })
    }
    if(!peso){
        res.json({
            status:false,
            mensaje: "El peso del jockey es un campo obligatorio"
        })

    }
    if(!distancia){
        res.json({
            status:false,
            mensaje: "La distancia es un campo obligatorio"
        })
        
    }
    if(!fecha){
        res.json({
            status:false,
            mensaje: "La fecha es un campo obligatorio"
        })
        
    }
    mysqlConnect.query('INSERT INTO equipos (nombre, id_modelo, id_tipo_equipo, id_ubicacion, serial ) VALUES (?,?,?,?,?)', [nombre_equipo, id_modelo, id_tipo_equipo, id_ubicacion, serial ], (error, registros)=>{
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
// traer los  datos de la carrera por el ID

// metodo GET
//URL /carreras/:idcarreras
//parametros : idcarreras
router.get('/carreras/:idcarreras', (req , res)=>{
    
    const { idcarreras } = req.params
    console.log('entra aqui', idcarreras)
    mysqlConnect.query('SELECT * FROM carrera WHERE idcarreras=?', [idcarreras], (error, registros)=>{
        if(error){
            res.json({
                status:false
            })
        }else{
            if(registros.length>0){
                res.json(registros)
            }else{
                res.json({
                    status:false,
                    mensaje:"El ID de la carrera no existe" 
                });
            }
            
        }
    })
})
// metodo UPDATE
//URL /carreras/
//parametros : 
    // y el parametro que vamos a borrar logicamente ->id_equipo
    router.put('/carreras/:idcarreras', bodyParser.json(), (req , res)=>{
        const { idcarreras } = req.params
        const { idcaballo, idcuidador, idjockey, peso, distancia,fecha } = req.body
        console.log("esto es el body",req.body)
        if(!idcaballo){
            res.json({
                status:false,
                mensaje: "El id del caballo es un campo obligatorio"
            })
        }
        if(!idcuidador){
            res.json({
                status:false,
                mensaje: "El id del cuidador es un campo obligatorio"
            })
        }
        if(!idjockey){
            res.json({
                status:false,
                mensaje: "El jockey es un campo obligatorio"
            })
        }
        if(!peso){
            res.json({
                status:false,
                mensaje: "El peso del jockey es un  equipo es un campo obligatorio"
            })
        }
        if(!peso){
            res.json({
                status:false,
                mensaje: "El peso del jockey  es un campo obligatorio"
            })
        }
        if(!distancia){
            res.json({
                status:false,
                mensaje: "La distancia  es un campo obligatorio"
            })
        }
        if(!fecha){
            res.json({
                status:false,
                mensaje: "La fecha es un campo obligatorio"
            })
        }


        mysqlConnect.query('SELECT * FROM carrera WHERE idcarreras=?', [idcarreras], (error, registros)=>{
            if(error){
                console.log('Error en la base de datos', error)
            }else{

                if(registros.length>0){
                    mysqlConnect.query('UPDATE carrera SET idcaballo=?, idcuidador=?, idjockey=?, peso=?, distancia=?, fecha=?  WHERE idcarreras = ?', [idcaballo, idcuidador, idjockey, peso, distancia,fecha,idcarreras], (error, registros)=>{
                        if(error){
                            console.log('Error en la base de datos', error)
                        }else{
                            res.json({
                                status:true,
                                mensaje:"El registro " +idcarreras+ " se edito correctamente" 
                            })
                        }
                    })
                }else{
                    res.json({
                        status:false,
                        mensaje:"El ID del equipo no existe" 
                    })
                }
                
            }
        })  
    })
// metodo DELETE
//URL /carreras/:idcarreras
//parametros : 
    // y el parametro que vamos a borrar logicamente ->id_equipo
router.delete('/carreras/:idcarreras', bodyParser.json(), (req , res)=>{
    const { idcarreras } = req.params
    mysqlConnect.query('SELECT * FROM carrera WHERE idcarreras=?', [idcarreras], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            if(registros.length>0){
                mysqlConnect.query('UPDATE carrera SET estado = "B"  WHERE idcarreras = ?', [idcarreras], (error, registros)=>{
                    if(error){
                        console.log('Error en la base de datos', error)
                    }else{
                        res.json({
                            status:true,
                            mensaje:"El registro " +idcarreras+ " se dio de baja correctamente" 
                        })
                    }
                })
            }else{
                res.json({
                    status:false,
                    mensaje:"El ID de la carrera no existe" 
                })
            }
            
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