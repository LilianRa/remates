import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios';

export function EditLocalidad(){
const [nombre, setNombre] = useState('')
const [idlocalidad, setIdLocalidad] = useState('')
const [mensaje, setMensaje] = useState('')

const {ilocalidad} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
   const datos_localidad= await API.getLocalidadByID(idlocalidad);
    setNombre(datos_localidad.nombre)
    setIdLocalidad(datos_localidad.idlocalidad)
}


const editarLocalidad = async(event)=>{
    event.preventDefault();
    const respuesta = await API.EditLocalidad({nombre}, idlocalidad)
    
    if(respuesta.status){
        setMensaje(respuesta.mensaje)
        setTimeout(()=>{
            setMensaje('')
            window.location.href='/localidad'
            }, 5000)
    }
    return;
  }
    return(
        <>
       <main className="form-signin w-100 m-auto">
              <form onSubmit={editarLocalidad}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre de la localidad"
                  />
                  <label for="floatingInput">Datos de la localidad</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={idlocalidad}
                  onChange={(event)=>setIdLocalidad(event.target.value)}
                  className="form-control" 
                  placeholder="Id de la localidad"
                  />
                  <label for="floatingInput">Id de la localidad</label>
                </div>
               
                <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                <Link to="/localidad" >Volver</Link>
                
              </form>
          </main>
        </>
    )
 } 
