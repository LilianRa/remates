import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function AddCaballo(){
const [nombre, setNombre] = useState('')
const [idcaballo, setIdCaballo] = useState('')
const [mensaje, setMensaje] = useState('')

const guardarCaballo = async(event)=>{
    event.preventDefault();
    const respuesta = await API.AddCaballo({idcaballo,nombre})
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
              <form onSubmit={guardarCaballo}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="number" 
                  value={idcaballo}
                  onChange={(event)=>setIdCaballo(event.target.value)}
                  className="form-control" 
                  placeholder="Id del caballo"
                  />
                  <label for="floatingInput">Id del caballo</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre del caballo"
                  />
                  <label for="floatingInput">Nombre del Caballo</label>
                </div>
                
               
               
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <Link to="/caballos" >Volver</Link>        
              </form>
          </main>
        </>
    )
}