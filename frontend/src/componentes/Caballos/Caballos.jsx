import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import './Caballos.css'
import { Link } from "react-router-dom";

import { Menu } from "../../menu";
import { Vigia } from "../../Vigia";

export function Caballo(){
    const [caballo, setCaballos]=useState([])
    const [idcaballo, setIdCaballos]=useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
        
     
    useEffect(()=>{
        // const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        // ver_permisos(datos_usuario.id_rol);
        API.getCaballos().then(setCaballos)
    }, [])

    
    const editar_registro = async (e, idcaballo)=>{
        e.preventDefault();
       console.log('el id que vamos a editar es el ', idcaballo)
        setIdCaballos(idcaballo)
        const datos_caballo= await API.getCaballosByID(idcaballo);
        console.log(datos_caballo)
        setNombre(datos_caballo.nombre)
    }


        const limpiarModal = async ()=>{
        
        setNombre('')
        setIdTipoEquipo('')
        }
        const guardarCaballo = async(event)=>{
            event.preventDefault();
            if(idcaballo){
                const respuesta = await API.EditCaballo({nombre}, idcaballo)
                if(respuesta.status){
                    setMensaje(respuesta.mensaje)
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    toastBootstrap.show()
                    setTimeout(()=>{
                        setMensaje('')
                        window.location.href='/caballos'
                        // API.getFabricantes().then(setFabricantes)
                        }, 2500)
                }
                return;
            }else{
                const respuesta = await API.AddCaballo({idcaballo,nombre})
                if(respuesta.status){
                    setMensaje(respuesta.mensaje)
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    toastBootstrap.show()
                    setTimeout(()=>{
                        setMensaje('')
                        window.location.href='/caballos'
                        // API.getFabricantes().then(setFabricantes)
                        }, 2500)
                }
                return;
            }
        }
        const cambiar_estado = async (e, idcaballo, estado_actual)=>{
            e.preventDefault();
            const actualizar = (estado_actual=="A")?"B":"A";
            console.log(actualizar)
            const respuesta= await API.ActualizarEstadoCaballo(idcaballo, {actualizar});
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    toastBootstrap.hide()
                    API.getCaballos().then(setCaballos)
                    // window.location.href='/fabricantes'
                }, 2500)
            }
            
        }
        // const ver_permisos =  async (id_rol)=>{
        //     const menu='/caballos';
        //     const respuesta= await API.ver_permisos({id_rol, menu });
        //     if(respuesta.status){
        //         setPermisoDenegado(true)
        //     }else{
        //         setPermisoDenegado(false)
        //     }
        // }
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
               <td>Id caballo</td>
                <td>Nombre </td>
                <td>Estado</td>
                <td colspan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {caballo.map((caballo)=>(
                <tr>
                <td >{caballo.idcaballo}</td> 
                <td >{caballo.nombre}</td>    
                <td >{caballo.estado}</td>
                <td >
                    {/* <Link to={`/editcaballo/${caballo.idcaballo}`} ><button class="btn btn-warning btn-sm">Editar Link</button></Link> */}
                    <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, caballo.idcaballo)} class="btn btn-outline-warning btn-sm">Editar</button>
                    
                {(caballo.estado=="A")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, caballo.idcaballo, caballo.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, caballo.idcaballo, caballo.estado )} >Activar</button>
                
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos del caballo </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={guardarCaballo}>
                <div class="modal-body">
                
                   <div className="form-floating">
                    <input required
                    type="text" 
                    value={idcaballo}
                    onChange={(event)=>setIdCaballos(event.target.value)}
                    className="form-control" 
                    placeholder="Id del caballo"
                    />
                    <label for="floatingInput">Id del caballo</label>
                    </div>
                    <div className="form-floating">
                    <input required
                    type="text" 
                    value={nombre}
                    onChange={(event)=>setNombre(event.target.value)}
                    className="form-control" 
                    placeholder="Nombre del caballo"
                    />
                    <label for="floatingInput">Nombre del caballo</label>
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
                
                
                </div>
                <div class="toast-body">
                {mensaje}
                </div>
            </div>
        </div>
        </>
    )
}