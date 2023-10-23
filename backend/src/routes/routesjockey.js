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
router.get('/jockey',verificarToken, (req, res)=>{
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM jockey ', (error, registros)=>{
            if(error){
                console.log('Error en la base de datos', error)
            }else{
                res.json(registros)
            } 
      })
    }
   })
});
// traer los  datos de jockey por el ID

// metodo GET
//URL /jockey/:idjockey
//parametros : ninguno
router.get('/jockey/:idjockey', (req , res)=>{
    const { idjockey } = req.params
    mysqlConnect.query('SELECT * FROM jockey WHERE idjockey=?', [idjockey], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
////////////////////insert de Jockey

// metodo POST
//URL /jockey/
//parametros : en el cuerpo(body) 
    // nombre

    router.post('/jockey', bodyParser.json(), (req , res)=>{
        const { nombre,direccion,telefono,peso}  = req.body
       
        mysqlConnect.query('INSERT INTO jockey (nombre,direccion,telefono,peso) VALUES (?,?,?,?)', [nombre,direccion,telefono,peso], (error, registros)=>{
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


////////////////////edicion de Jockey
// metodo PUT
//URL:/jockey/:idjockey
//parametros : 
    // en el cuerpo(body) 
    // nombre
    // y el parametro que vamos a editar ->idjockey
router.put('/jockey/:idjockey', bodyParser.json(), (req , res)=>{
    const { nombre,direccion,telefono,peso }  = req.body
    const { idjockey } = req.params
    mysqlConnect.query('UPDATE jockey SET nombre = ?,direccion=?,telefono=?,peso=?  WHERE idjockey = ?', [nombre,direccion,telefono,peso,idjockey], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
       }else{
        res.json({
            status:true,
            mensaje: "La edición se realizó correctamente"
            })
           
       }
   })
})

///////////////////eliminacion de jockey
// metodo DELETE
//URL /jockey/:idjockey
//parametros : 
    // y el parametro que vamos a borrar logicamente ->idlocalidad
    router.delete('/jockey/:idjockey', bodyParser.json(), (req , res)=>{
        const { idjockey } = req.params
        mysqlConnect.query('DELETE FROM jockey WHERE idjockey = ?', [idjockey], (error, registros)=>{
           if(error){
               
                res.json({
                status:false,
                mensaje: error
            })
           }else{
             res.json({
                status:true,
                mensaje: 'La eliminacion del registro ' +idjockey+ ' se realizo correctamente'
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