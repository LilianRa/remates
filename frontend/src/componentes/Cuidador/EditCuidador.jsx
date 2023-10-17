import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios';

export function EditCuidador(){
const [nombre, setNombre] = useState('')
const [idlocalidad, setIdLocalidad] = useState('')
const [mensaje, setMensaje] = useState('')

const {idcaballo} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
   const datos_cuidador= await API.getCuidadorByID(idcuidador);
    setNombre(datos_cuidador.nombre)
    setIdLocalidad(datos_cuidador.idlocalidad)
}


const editarCuidador = async(event)=>{
    event.preventDefault();
    const respuesta = await API.EditCuidador({nombre,idlocalidad}, idcaballo)
    
    if(respuesta.status){
        setMensaje(respuesta.mensaje)
        setTimeout(()=>{
            setMensaje('')
            window.location.href='/cuidador'
            }, 5000)
    }
    return;
  }
    return(
        <>
       <main className="form-signin w-100 m-auto">
              <form onSubmit={editarCaballo}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre del Caballo"
                  />
                  <label for="floatingInput">Datos del Caballo</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={idlocalidad}
                  onChange={(event)=>setIdLocalidad(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre del Caballo"
                  />
                  <label for="floatingInput">Datos de localidad</label>
                </div>
               
                <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                <Link to="/fabricantes" >Volver</Link>
                
              </form>
          </main>
        </>
    )
 } 
