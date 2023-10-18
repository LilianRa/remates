import React, { useState } from "react";
// import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function AddCuidador(){
const [idcuidador, setIdCuidador] = useState('')
const [nombre, setNombre] = useState('')
const [idlocalidad, setIdLocalidad] = useState('')
const [estado,setEstado]= useSate('')
const [mensaje, setMensaje] = useState('')

const guardarCuidador = async(event)=>{
    event.preventDefault();
    const respuesta = await API.AddCuidador({idcuidador,nombre,idlocalidad,estado})
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
              <form onSubmit={guardarCuidador}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={idcuidador}
                  onChange={(event)=>setIdCuidador(event.target.value)}
                  className="form-control" 
                  placeholder="Id Cuidador"
                  />
                  <label for="floatingInput">Id del Cuidador</label>
                </div>
                <div className="form-floating"></div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre del cuidador"
                  />
                  <label for="floatingInput">Nombre del Cuidador</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={idlocalidad}
                  onChange={(event)=>setIdLocalidad(event.target.value)}
                  className="form-control" 
                  placeholder="Id de Localidad"
                  />
                  <label for="floatingInput">Id de Localidad</label>
                </div>
               
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <Link to="/cuidador" >Volver</Link>
              </form>
          </main>
        </>
    )
}