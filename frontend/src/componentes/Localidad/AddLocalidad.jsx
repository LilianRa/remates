import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios';

export function AddLocalidad(){
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
        API.getLocalidad().then(setLocalidad)
    }, [])

    const guardarLocalidad = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddLocalidad({nombre});
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
              <form onSubmit={guardarLocalidad}>
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
                  <label for="floatingInput">Nombre de la localidad</label>
                </div>
                <div className="form-floating">
                  
                 {/* <select onChange={(event)=>setIdLocalidad(event.target.value)} className="form-control">
                    {localidad.map((l)=>(
                      
                    <option value={l.idlocalidad}>{l.nombre}</option>
                    ))}
                 </select> */}
                </div>
               
               
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <Link to="/localidad" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}