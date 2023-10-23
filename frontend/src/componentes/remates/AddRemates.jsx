import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'



export function AddRemates(){
  const [remates, setRemates] = useState([]);
  const [carrera, setCarreras] = useState([]);

    const [idcaballo, setIdCaballo] = useState('')
    const [fecha, setFecha] = useState('')
    const [mjugado, setMontoJugado] = useState('')
    const [macobrar, setMontoaCobrar] = useState('')
    const[idcarrera,setIdCarrera]=useState('')
    
    const [mensaje, setMensaje] = useState('')
   

    useEffect(()=>{
        API.getRemates().then(setRemates)
    }, [])

    const guardarRemates = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddRemate({idremate,idcaballo,fecha,mjugado,macobrar,idcarrera});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                window.location.href='/remates'
                }, 5000)
        }
        return;
      }

    return(
        <>
            <main className="form-signin w-100 m-auto">
              <form onSubmit={guardarRemates}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="number" 
                  value={idremate}
                  onChange={(event)=>setIdRemates(event.target.value)}
                  className="form-control" 
                  placeholder="Id de caballo"
                  />
                  <label for="floatingInput">numero de remate</label>
                </div>

                <div className="form-floating">
                  <input 
                  type="number" 
                  value={idcaballo}
                  onChange={(event)=>setIdCaballo(event.target.value)}
                  className="form-control" 
                  placeholder="Id de caballo"
                  />
                  <label for="floatingInput">Id de caballo</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="date" 
                  value={fecha}
                  onChange={(event)=>setFecha(event.target.value)}
                  className="form-control" 
                  placeholder="Fecha"
                  />
                  <label for="floatingInput">Fecha</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="number" 
                  value={mjugado}
                  onChange={(event)=>setMontoJugado(event.target.value)}
                  className="form-control" 
                  placeholder="Monto jugado"
                  />
                  <label for="floatingInput">Monto jugado</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="number" 
                  value={macobrar}
                  onChange={(event)=>setMontoaCobrar(event.target.value)}
                  className="form-control" 
                  placeholder="Monto jugado"
                  />
                  <label for="floatingInput">Monto a cobrar</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="number" 
                  value={idcarrera}
                  onChange={(event)=>setIdCarrera(event.target.value)}
                  className="form-control" 
                  placeholder="Id Carrera"
                  />
                  <label for="floatingInput">Id carrera</label>
                </div>
                          
                           
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <Link to="/remates" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}