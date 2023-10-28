import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";
import Swal from 'sweetalert2' 
import { Vigia } from "../../Vigia";

export function Localidad(){
    const [localidad, setLocalidad]=useState([])
    const [usuario,setUsuario]=useState([])
    const [idlocalidad, setIdLocalidad]=useState('')
    const [nombre, setNombre] = useState('')
    const [mensaje, setMensaje] = useState('')
    

    const [permisoDenegado, setPermisoDenegado] = useState(false)
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    
    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
    
          
    const guardarLocalidad = async(event)=>{
        event.preventDefault();
        if(idlocalidad){
            const respuesta = await API.EditLocalidad({nombre}, idlocalidad)
    
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/localidad'
                    
                    }, 2500)
            }
            return;
        }else{
            const respuesta = await API.AddLocalidad({nombre})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/localidad'
                    // API.getUsuarios().then(setUsuarios)
                    }, 2500)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        // const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        // console.log(datos_usuario);
        // ver_permisos(datos_usuario.id_rol);
        API.getLocalidad().then(setLocalidad)
    }, [])

    // const ver_permisos =  async (id_rol)=>{
    //     const menu='/usuarios';
    //     const respuesta= await API.ver_permisos({id_rol, menu });
    //     if(respuesta.status){
    //         setPermisoDenegado(true)
    //     }else{
    //         setPermisoDenegado(false)
    //     }
    // }
    
    
    
    const eliminar = async(idlocalidad)=>{
        console.log('el registro a eliminar es :'+idlocalidad)
        if(confirm('Esta seguro de eliminar este registro?')){
            const borrado = await API.deleteLocalidad(idlocalidad);
            if(borrado.status){
                window.location.reload(true)
            }else{
                alert("No se puede eliminar referenciado en otra tabla");
            }
        }
        
    }
    const editar_registro = async (e, idlocalidad)=>{
        e.preventDefault();
        
        setIdLocalidad(idlocalidad)
        const datos_localidad= await API.getLocalidadByID(idlocalidad);
        console.log(datos_localidad)
        setNombre(datos_localidad.nombre)
        setIdLocalidad(datos_localidad.idlocalidad)
    }

    const limpiarModal = async ()=>{
        setNombre('')
        setIdLocalidad('')
              
    }
    // const ver_permisos =  async (id_rol)=>{
    //     const menu='/usuarios';
    //     const respuesta= await API.ver_permisos({id_rol, menu });
    //     if(respuesta.status){
    //         setPermisoDenegado(true)
    //     }else{
    //         setPermisoDenegado(false)
    //     }
    // }
// }
    
    return(
        <>
        
        <Menu/>
        <Vigia/>

        
        {/* {
        !permisoDenegado? 
            <div className="alert alert-warning" role="alert">
            No tiene  permiso para acceder a esta opción
            </div>
            :<> */}
        <table class="table table-striped">
        <thead>
            <tr>
                
                <th colspan="6">
                
                <button onClick={(event)=>limpiarModal('')}  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i class="bi bi-database-add"></i>Agregar</button>
                &nbsp;
                
                {/* <input  type="checkbox"/>Solo Activos */}
                </th>    
            </tr>

            <tr>
                    <th >id localidad</th>
                    <th >nombre</th>
                    <th  colspan="2">Acciones</th>

            </tr>
            </thead>
            <tbody>
            {localidad.map((localidad)=>(
                <tr>
                <td >{localidad.idlocalidad}</td>    
                <td >{localidad.nombre}</td>
                <td>
              
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, localidad.idlocalidad)} class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i>Editar</button>
                <button onClick={()=>eliminar(localidad.idlocalidad )}  class="btn btn-danger btn-sm" ><i class="bi bi-trash"></i>Eliminar</button>                
                
                </td>
                </tr>

            ))}
            </tbody>
            
           
        </table>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos de la localidad </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={guardarLocalidad}>
                <div class="modal-body">
                               
                                
                <h1 className="h3 mb-3 fw-normal">Por favor completar los datos</h1>             
                    
                                 
                <div className="form-floating">
                  <input required
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  id="localidad" 
                  />
                  <label for="nombre">Localidad</label>
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


       