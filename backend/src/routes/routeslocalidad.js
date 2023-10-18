const express = require('express');
const mysqlConnect = require('../database/bd');
const bodyParser = require('body-parser');
const router = express();
const jwt = require('jsonwebtoken');
//////////////////////////////
//////////////////////////////
// listar tipos de equipo
// metodo GET
//URL /localidad
//parametros : ninguno
router.get('/localidad',verificarToken, (req, res)=>{
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM localidad ', (error, registros)=>{
            if(error){
                console.log('Error en la base de datos', error)
            }else{
                res.json(registros)
            } 
      })
    }
   })
});
// traer los  datos de localidad por el ID

// metodo GET
//URL /localidad/:idlocalidad
//parametros : ninguno
router.get('/localidad/:idlocalidad', (req , res)=>{
    const { idlocalidad } = req.params
    mysqlConnect.query('SELECT * FROM localidad WHERE idlocalidad=?', [idlocalidad], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
////////////////////insert de Localidades

// metodo POST
//URL /localidad/
//parametros : en el cuerpo(body) 
    // nombre

    router.post('/localidad', bodyParser.json(), (req , res)=>{
        const { nombre}  = req.body
       
        mysqlConnect.query('INSERT INTO localidad (nombre) VALUES (?)', [nombre], (error, registros)=>{
           if(error){
               res.json({
                   status:false,
                   mensaje: error
                   })
           }else{
               res.json({
                   status:true,
                   mensaje: "El insert se realizo correctamente"
                   })
           }
       })
   })


////////////////////edicion de localidad
// metodo PUT
//URL:/localidad/:idlocalidad
//parametros : 
    // en el cuerpo(body) 
    // nombre
    // y el parametro que vamos a editar ->idlocalidad
router.put('/localidad/:idlocalidad', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
    const { idlocalidad } = req.params
    mysqlConnect.query('UPDATE localidad SET nombre = ?  WHERE idlocalidad = ?', [nombre, idlocalidad], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
       }else{
           res.send('La edicion de registro ' +idlocalidad+ ' se realizo correctamente')
       }
   })
})

///////////////////eliminacion de localidad
// metodo DELETE
//URL /localidad/:idlocalidad
//parametros : 
    // y el parametro que vamos a borrar logicamente ->idlocalidad
    router.delete('/localidad/:idlocalidad', bodyParser.json(), (req , res)=>{
        const { idlocalidad } = req.params
        mysqlConnect.query('DELETE FROM localidad WHERE idlocalidad = ?', [idlocalidad], (error, registros)=>{
           if(error){
               
                res.json({
                status:false,
                mensaje: error
            })
           }else{
             res.json({
                status:true,
                mensaje: 'La eliminacion del registro ' +idlocalidad+ ' se realizo correctamente'
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
    
    


//////////////////////////////
//////////////////////////////
module.exports= router;