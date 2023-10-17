
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

// listado de caballos metodo get

router.get('/caballos', verificarToken,(req , res)=>{
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM caballo', (error, registros)=>{
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
//URL /caballos/:idcaballo
//parametros : ninguno
router.get('/caballos/:idcaballo', (req , res)=>{
    const { idcaballo } = req.params
    mysqlConnect.query('SELECT * FROM caballo WHERE idcaballo=?', [idcaballo], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})


////////////////////insert de caballos

// metodo POST
//URL /caballos/
//parametros : en el cuerpo(body)
    // nombre

// 
// router.post('/caballo', bodyParser.json(), (req , res)=>{
//     const { idcaballo,nombre }  = req.body
//         jwt.verify(req.token, 'siliconKey', (error, valido)=>{
//             if(error){
//              res.sendStatus(403);
//             }else{
//                 mysqlConnect.query('INSERT INTO caballo (idcaballo,nombre) VALUES (?,?)', [idcaballo,nombre], (error, registros)=>{
//              if(error){
//                  console.log('Error en la base de datos', error)
//              }else{
//                     res.json({
//                     status:true,
//                     mensaje: "El insert se realizo correctamente"
//                     })
//             }
//    })
// }
// })
router.post('/caballos', bodyParser.json(), (req , res)=>{
    const { idcaballo,nombre }  = req.body
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('INSERT INTO caballo (idcaballo,nombre) VALUES (?,?)', [idcaballo,nombre], (error, registros)=>{
            if(error){
                console.log('Error en la base de datos', error)
            }else{
                res.json({
                    status:true,
                    mensaje: "El registro se realizo correctamente"
                    })
            }
        })
        }
    })
})

// ////////////////////edicion de caballos
// // metodo PUT
// //URL /caballos/:idcaballo
// //parametros :
//     // en el cuerpo(body)
//     // nombre
//     // y el parametro que vamos a editar ->idcaballo
 router.put('/caballos/:idcaballo', bodyParser.json(), (req , res)=>{
     const { nombre }  = req.body
     const { idcaballo } = req.params
    mysqlConnect.query('UPDATE caballo SET nombre = ?  WHERE idcaballo = ?', [nombre,idcaballo], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
      }else{
            res.send('La edicion de registro ' +idcaballo+ ' se realizo correctamente')
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
// })
// //////////////////////////////
// //////////////////////////////
router.delete('/caballos/:idcaballo', bodyParser.json(), (req , res)=>{
    const { actualizar }  = req.body
    const { idcaballo } = req.params
    mysqlConnect.query('UPDATE caballo SET estado = ?  WHERE idcaballo = ?', [actualizar, idcaballo], (error, registros)=>{
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