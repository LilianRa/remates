import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import './Cuidador.css'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { Vigia } from "../../Vigia";

export function Cuidador(){
    const [cuidador, setCuidador]=useState([])
    const [idcuidador, setIdCuidador]=useState('')
    const [nombre, setNombre] = useState('')
    const [idlocalidad, setIdLocalidad]=useState('')
    const [estado,setEstado]=useState('')
    const [localidad, setLocalidad]=useState([]);
    const [mensaje, setMensaje] = useState('')
   

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
    const guardarCuidador = async(event)=>{
        event.preventDefault();
        if(idcuidador){
            const respuesta = await API.EditCuidador({nombre,idlocalidad,estado}, idcuidador)
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/cuidador'
                  
                    }, 2500)
            }
            return;
        }else{
            const respuesta = await API.AddCuidador({idcuidador,nombre,idlocalidad,estado})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/cuidador'
                    // API.getFabricantes().then(setFabricantes)
                    }, 2500)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        API.getCuidador().then(setCuidador)
        API.getLocalidad().then(setLocalidad)
    }, [])

    const cambiar_estado = async (e, idcuidador, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        console.log(actualizar)
        const respuesta= await API.ActualizarEstadoCuidador(idcuidador, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
                API.getCuidador().then(setCuidador)
                // window.location.href='/fabricantes'
            }, 2500)
        }
        
    }

    const editar_registro = async (e, idcuidador)=>{
        e.preventDefault();
        
        console.log('el id que vamos a editar es el ', idcuidador)
        setIdCuidador(idcuidador)
        const datos_cuidador= await API.getCuidadorByID(idcuidador);
        console.log(datos_cuidador)
        setNombre(datos_cuidador.nombre)
        setIdLocalidad(datos_cuidador.idlocalidad)
        SetEstado(datos_cuidador.estado)
    }
    return(
        <>
        <Menu/>
        <Vigia/>
        <table class="table table-striped">
        <thead>
            <tr>
                
                <th colspan="4">
                {/* <Link class="btn btn-outline-primary btn-sm" to="/agregarcaballo">Agregar</Link> */}
                <button  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" >Agregar </button>
                </th>    
            </tr>

            <tr>
               <td>IdCuidador</td>
                <td>Cuidador</td>
                <td>Localidad</td>
                <td>Estado</td>
                <td colspan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {cuidador.map((cuidador)=>(
                <tr>
                <td >{cuidador.idcuidador}</td> 
                <td >{cuidador.nombre}</td> 
                <td >{cuidador.idlocalidad}</td>   
                <td >{cuidador.estado}</td>
                <td >
                    {/* <Link to={`/editcuidador/${cuidador.idcuidador}`} ><button class="btn btn-warning btn-sm">Editar Link</button></Link> */}
                    <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, cuidador.idcuidador)} class="btn btn-outline-warning btn-sm">Editar</button>
                    
                {(cuidador.estado=="A")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, cuidador.idcuidador,cuidador.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, cuidador.idcuidador, cuidador.estado )} >Activar</button>
                
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos del cuidador </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={guardarCuidador}>
                <div class="modal-body">
                    
                <div className="form-floating">
                    <input 
                    type="text" 
                    value={idcuidador}
                    onChange={(event)=>setIdCuidador(event.target.value)}
                    className="form-control" 
                    placeholder="Id Cuidador"
                    />
                    <label for="floatingInput">Id cuidador</label>
                    </div>
                    <div className="form-floating">
                    <input 
                    type="text" 
                    value={nombre}
                    onChange={(event)=>setNombre(event.target.value)}
                    className="form-control" 
                    placeholder="Nombre del cuidador"
                    />
                    <label for="floatingInput">Nombre del cuidador</label>
                    </div>
                    <div className="form-floating">
                    
                    <select required onChange={(event)=>setIdLocalidad(event.target.value)} className="form-control">
                    <option selected value="">Seleccione una opcion</option>
                        {localidad.map((localidad)=>(
                        
                        <option value={localidad.idlocalidad}>{localidad.nombre}</option>
                        ))}
                    </select>
                    </div>
                    <div className="form-floating">
                    <input 
                    type="text" 
                    value={estado}
                    onChange={(event)=>setEstado(event.target.value)}
                    className="form-control" 
                    placeholder="Estado del cuidador"
                    />
                    <label for="floatingInput">Estado del cuidador</label>
                    </div>
               
                </div>
                <div class="modal-footer">
                <button className="btn btn-primary" type="submit" >Guardar</button>
                    
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