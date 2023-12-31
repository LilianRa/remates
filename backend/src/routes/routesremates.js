
const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')
//////////////////////////////
//////////////////////////////
//////////////////////////////
// listar los caballos
// metodo GET

// listado de remates metodo get

router.get('/remates', verificarToken,(req , res)=>{
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT r.*, date_format(r.fecha,"%d-%m-%y") fecha_formateada FROM remates r order by("idcarreras,idremate")', (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
});

// metodo GET
//URL /remates/:idremate
//parametros : ninguno
router.get('/remates/:idremate', (req , res)=>{
    const { idremate } = req.params
    mysqlConnect.query('SELECT r.*, DATE_FORMAT(r.fecha,"%y-%m-%d")fecha_sin_formato FROM remates r WHERE r.idremate=?', [idremate], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})


////////////////////insert de remates

// metodo POST
//URL /remates/
//parametros : en el cuerpo(body)
    // nombre

// 
// router.post('/remates', bodyParser.json(), (req , res)=>{
//     const { idcaballo,fecha,mjugado,macobrar,idcarrera }  = req.body
//         jwt.verify(req.token, 'siliconKey', (error, valido)=>{
//             if(error){
//              res.sendStatus(403);
//             }else{
//                 mysqlConnect.query('INSERT INTO remate (idcaballo,fecha,mjugado,macobrar,idcarrera) VALUES (?,?,?,?,?)', [idcaballo,fecha,mjugado,macobrar,idcarrera], (error, registros)=>{
//              if(error){
//                  console.log('Error en la base de datos', error)
//              }else{
//                     res.json({
//                     status:true,
//                     mensaje: "El insert se realizo correctamente"
//                     })
//             }
        
//    )
//             }
// })

router.post('/remates', bodyParser.json(), (req , res)=>{
    const { idremate,idcaballo,fecha,mjugado,macobrar,idcarrera }  = req.body
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
                mysqlConnect.query('INSERT INTO remates (idremate,idcaballo,fecha,mjugado,macobrar,idcarrera) VALUES (?,?,?,?,?,?)', [idremate,idcaballo,fecha,mjugado,macobrar,idcarrera], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                        res.json({
                        status:true,
                        mensaje: "El insert se realizo correctamente"
                    })
                    
                    }

                })
            }
        })
    });



// router.post('/remates', bodyParser.json(), (req , res)=>{
//     const { idcaballo,fecha,mjugado,macobrar,idcarrera,estado }  = req.body
//     // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
//     //     if(error){
//     //         res.sendStatus(403);
//     //     }else{
//             mysqlConnect.query('INSERT INTO remates (idcaballo,date_format(fecha,"%Y-%c-%d"),mjugado,macobrar,idcarrera,estado) VALUES (?,?,?,?,?,?)', [idcaballo,fecha,mjugado,macobrar,idcarrera,estado], (error, registros)=>{
//             if(error){
//                 console.log('Error en la base de datos', error)
//             }else{
//                 res.json({
//                     status:true,
//                     mensaje: "El registro se realizo correctamente"
//                     })
//             }
//         })
//         }
    // })
// })

// ////////////////////edicion de remates
// // metodo PUT
// //URL /remates/:idremates
// //parametros :
//     // en el cuerpo(body)
//     // nombre
//     // y el parametro que vamos a editar ->idremate
 router.put('/remates/:idremate', bodyParser.json(), (req , res)=>{
     const { idcaballo , fecha, mjugado, macobrar, idcarrera }  = req.body
     const { idremate } = req.params
    mysqlConnect.query('UPDATE remates SET idcaballo=?,fecha=?,mjugado=?,macobrar=?,idcarrera=? WHERE idremate =?', [idcaballo,fecha,mjugado,macobrar,idcarrera,idremate], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
      }else{
        res.json({
            status:true,
            mensaje: "La edición de registro se realizo correctamente"
            })
       }
       
    })
})

// ///////////////////eliminacion de tipos de equipo
// // metodo DELETE
// //URL /caballo/:idcaballo
// //parametros :
//     // y el parametro que vamos a borrar logicamente ->idcaballo
// router.delete('/caballos/:idcaballo', bodyParser.json(), (req , res)=>{
//     const { idcaballo } = req.params
//     mysqlConnect.query('DELETE FROM caballo WHERE idcaballo = ?', [idcaballo], (error, registros)=>{
//        if(error){
//            console.log('Error en la base de datos', error)
//        }else{
//            res.send('La eliminacion del registro ' +idcaballo+ ' se realizo correctamente')
//        }
//    })
// })     hasta aquiiiiiiiiiii
// //////////////////////////////
// //////////////////////////////
router.delete('/remates/:idremate', bodyParser.json(), (req , res)=>{
    const { actualizar }  = req.body
    const { idremate } = req.params
    mysqlConnect.query('UPDATE remates SET estado = ?  WHERE idremate = ?', [actualizar, idremate], (error, registros)=>{
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