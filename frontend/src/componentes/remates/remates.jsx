

import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Vigia } from "../../Vigia";
import { Menu } from "../../menu";


export function Remates(){
    
    const [remates, setRemates] = useState([]);
    const [caballo, setCaballo] = useState([]);
    const [carrera, setCarrera] = useState([]);

    const [idremate, setIdRemate] = useState('')
    const [idcaballo, setIdcaballo] = useState('')
    const [mjugado, setMontoJugado] = useState('')
    const [macobrar, setMontoPagado] = useState('')
    const [idcarrera,setIdCarreras]=useState('')
    const [fecha, setFecha] = useState('')
    // const [idcarrera,setIdCarreras]=useState('')
    const [estado,setEstado]=useState('')

    const [mensaje, setMensaje] = useState('')
    
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }

      const guardarRemate = async(event)=>{
        event.preventDefault();
        if(idremate){
            const respuesta = await API.EditRemate({idcaballo,fecha,mjugado,macobrar,idcarrera}, idremate)
              if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/remates'
                    // API.getUbicaciones().then(setUbicaciones)
                    }, 2500)
            }
            return;
        }else{
            event.preventDefault();
            const respuesta = await API.AddRemate({idremate,idcaballo,fecha,mjugado,macobrar,idcarrera,estado});
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
    
                setTimeout(()=>{
                    window.location.href='/remates'
                    }, 5000)
            }
            return;
        }

    }   
    useEffect(()=>{
        
        
        API.getRemates().then(setRemates)  
        API.getCaballos().then(setCaballo)
        API.getCarreras().then(setCarrera)
            
    }, [])
    
    
    const editar_registro = async (e, idremate)=>{
        e.preventDefault();
        setIdRemate(idremate)
        const datos_remate= await API.getRematesByID(idremate);
        console.log(datos_remate)
        setIdRemate(datos_remate.idremate)
        setIdcaballo(datos_remate.idcaballo)
        setFecha(datos_remate.fecha)
        setMontoJugado(datos_remate.mjugado)
        setMontoPagado(datos_remate.macobrar)
        setIdCarreras(datos_remate.idcarrera)
        setEstado(datos_remate.estado)
    }

    const limpiarModal = async ()=>{
        setIdRemate('')
        setIdcaballo('')
        setFecha('')
        setMontoJugado('')
        setMontoPagado('')
        setIdCarreras('')
        setEstado('')
    }
   
    const cambiar_estado = async (e, idremate, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        console.log(actualizar)
        const respuesta= await API.ActualizarEstadoRemate(idremate, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
                API.getRemates().then(setRemates)
                // window.location.href='/fabricantes'
            }, 2500)
        }
        
    }
       
    return(
        <>
        <Menu/>
        <Vigia/>
        
        <table class="table table-striped">
        <thead>
            <tr>
                
                <th colspan="3">
                    {/* <Link  class="btn btn-primary btn-sm"  to="/agregarremate">Agregar Modelo link</Link> */}
                    <button onClick={(event)=>limpiarModal('')}  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i class="bi bi-database-add"></i>Agregar</button>
                &nbsp;

                    {/* <button type="button" class="btn btn-danger" id="liveToastBtn">Show live toast</button> */}
               
                </th>
            </tr>
            <tr>
                <td>idremate</td>
                <td>idcaballo</td>
                <td>Fecha</td>
                <td>Monto jugado</td>
                <td>Monto a cobrar</td>
                <td colspan="4">Acciones</td>
            </tr>
        </thead>
        <tbody>
            {remates.map((remates)=>(
                <tr>
                <td >{remates.idremate}</td>   
                <td >{remates.idcaballo}</td>
                <td >{remates.fecha}</td>    
                <td >{remates.mjugado}</td>  
                <td >{remates.macobrar}</td>  
                <td >{remates.estado}</td>
                <td >{remates.idcarrera}</td>    
                     
                <td >
                
                 {(remates.estado=="A")?
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, remates.idremate)} class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i>Editar</button>
                : 
                <button disabled class="btn btn-warning btn-sm">Editar</button>
                }
                {(remates.estado=="A")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, remates.idremate, remates.estado )} ><i class="bi bi-hand-thumbs-down-fill"></i>Cancelar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, remates.idremate, remates.estado )} ><i class="bi bi-hand-thumbs-up-fill"></i>Activar</button>
                
            }
            </td>
            </tr>
        ))}
        
        </tbody>
       
           
        </table>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos del remate </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={guardarRemate}>
                <div class="modal-body">
                
                    <div className="form-floating">
                    <input 
                    required
                    type="number" 
                    value={idremate}
                    onChange={(event)=>setIdRemate(event.target.value)}
                    className="form-control" 
                    placeholder="Numero de remate"
                    />
                    <label for="floatingInput">Numero de remate</label>
                    </div>
                    <div className="form-floating">
                    <input 
                    required
                    type="number" 
                    value={idcaballo}
                    onChange={(event)=>setIdcaballo(event.target.value)}
                    className="form-control" 
                    placeholder="Numero de caballo"
                    />
                    <label for="floatingInput">Numero de caballo</label>
                    </div>
                    <div className="form-floating">
                    <input 
                    required
                    type="date" 
                    value={fecha}
                    onChange={(event)=>setFecha(event.target.value)}
                    className="form-control" 
                    placeholder="Fecha del remate"
                    />
                    <label for="floatingInput">Fecha del remate</label>
                    </div>
                    <div className="form-floating">
                    <input 
                    required
                    type="number" 
                    value={mjugado}
                    onChange={(event)=>setMontoJugado(event.target.value)}
                    className="form-control" 
                    placeholder="Monto Jugado"
                    />
                    <label for="floatingInput">Monto apostado</label>
                    </div>
                    <div className="form-floating">
                    <input 
                    required
                    type="number" 
                    value={macobrar}
                    onChange={(event)=>setMontoPagado(event.target.value)}
                    className="form-control" 
                    placeholder="Monto Pagado"
                    />
                    <label for="floatingInput">Monto Pagado</label>
                    </div>
                    <div className="form-floating">
                    <input 
                    required
                    type="number" 
                    value={idcarrera}
                    onChange={(event)=>setIdCarreras(event.target.value)}
                    className="form-control" 
                    placeholder="Numero de carrera"
                    />
                    <label for="floatingInput">Numero de carrera</label>
                    </div>
               
                </div>
                <div class="modal-footer">
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <Link to="/remates" >Volver</Link>
                </div>
                </form>
                </div>
            </div>
        </div>
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                
                <strong class="me-auto">Mensaje</strong>
                
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                {mensaje}
                </div>
            </div>
        </div>
           
        
         </>
    )
}