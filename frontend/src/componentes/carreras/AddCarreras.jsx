import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link, useParams } from "react-router-dom";

export function AddCarreras(){
    const [nombre_cuidador, setNombre] = useState('')
    const [idcuidador, setIdCuidador] = useState('')
    const [idjockey, setIdJockey] = useState('')
    const [fecha, setFecha] = useState('')
    const [distancia, setDistancia] = useState('')
    const [peso, setPeso] = useState('')
    const [idcaballo, setIdcaballo] = useState('')
    const [nombre_caballo, setNombreCaballo] = useState('')

    const [carrera, setCarrera] = useState([])
    const [cuidador, setCuidador] = useState([])
    const [jockey, setJockey] = useState([])
    const [caballo, setCaballo] = useState([])
    const [mensaje, setMensaje] = useState('')
   
    useEffect(()=>{
        API.getCarreras().then(setCarrera)
        API.getCuidador().then(setCuidador)
        API.getCaballo().then(setCaballo)
      },[])
      
    

      

    const GuardarCarrera = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddCarrera({idcaballo, idcuidador, idjockey, peso,distancia,fecha})
        
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                window.location.href='/carreras'
                }, 3000)
        }
        return;
    }
    return(
        <>
        <main className="form-signin w-100 m-auto">
              <form onSubmit={GuardarCarreras}>
                <div>
                    {mensaje}
                </div>
                {/* <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre_equipo}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre del equipo"
                  />
                  <label for="floatingInput">Nombre del Equipo</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={serial}
                  onChange={(event)=>setSerial(event.target.value)}
                  className="form-control" 
                  placeholder="Serial"
                  />
                  <label for="floatingInput">Serial</label>
                </div> */}
                <div className="form-floating">
                  
                  <select onChange={(event)=>setCaballo(event.target.value)} className="form-control">
                     {caballo.map((c)=>(
                       
                     <option value={c.idcaballo}>{c.nombre}</option>
                     ))}
                  </select>
                  <label for="floatingInput">Caballo</label>
                </div>
                <div className="form-floating">
                  
                 <select onChange={(event)=>setCuidador(event.target.value)} className="form-control">
                    {cuidador.map((cu)=>(
                      
                    <option value={cu.idcuidador}>{cu.nombre}</option>
                    ))}
                 </select>
                 <label for="floatingInput">Cuidador</label>
                </div>
                <div className="form-floating">
                  
                 <select onChange={(event)=>setJockey(event.target.value)} className="form-control">
                    {jockey.map((j)=>(
                      
                    <option value={j.idjockey}>{j.nombre}</option>
                    ))}
                 </select>
                 <label for="floatingInput">Jockey</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={peso}
                  onChange={(event)=>setPeso(event.target.value)}
                  className="form-control" 
                  placeholder="Peso"
                  />
                  <label for="floatingInput">Peso</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={distancia}
                  onChange={(event)=>setDistancia(event.target.value)}
                  className="form-control" 
                  placeholder="Distancia"
                  />
                  <label for="floatingInput">Distancia</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={fecha}
                  onChange={(event)=>setFecha(event.target.value)}
                  className="form-control" 
                  placeholder="Fecha"
                  />
                  <label for="floatingInput">Fecha</label>
                </div>
               
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <Link to="/equipos" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}