import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function EditCaballo(){
const [nombre, setNombre] = useState('')
const [mensaje, setMensaje] = useState('')

const {idcaballo} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
   const datos_caballo= await API.getCaballosByID(idcaballo);
    setNombre(datos_caballo.nombre)
}

const editarCaballo = async(event)=>{
    event.preventDefault();
    const respuesta = await API.EditCaballo({nombre}, idcaballo)
    
    if(respuesta.status){
        setMensaje(respuesta.mensaje)
        setTimeout(()=>{
            setMensaje('')
            window.location.href='/caballos'
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
               
               
                <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                <Link to="/fabricantes" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}