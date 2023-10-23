import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Menu } from "../../menu";
import Swal from 'sweetalert2' 

export function Jockey(){
    const [jockey, setJockey]=useState([])

    const [idjockey, setIdJockey]=useState('')
    const [nombre, setNombre] = useState('')
    const [direccion,setDireccion] =useState('')
    const [telefono,setTelefono] = useState('')
    const [peso, setPeso]= useState('')
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
    
      
    const guardarJockey = async(event)=>{
        event.preventDefault();
        if(idjockey){
            const respuesta = await API.EditJockey({nombre,direccion,telefono,peso}, idjockey)
    
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/jockey'
                    
                    }, 2500)
            }
            return;
        }else{
            const respuesta = await API.AddJockey({nombre,direccion,telefono,peso})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/jockey'
                    // API.getUsuarios().then(setUsuarios)
                    }, 2500)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        ver_permisos(datos_usuario.id_rol);
        API.getJockey().then(setJockey)
    }, [])

    
    const eliminar = async(idjockey)=>{
        console.log('el registro a eliminar es :'+idjockey)
        if(confirm('Esta seguro de eliminar este registro?')){
            const borrado = await API.deleteJockey(idjockey);
            if(borrado.status){
                window.location.reload(true)
            }else{
                alert("No se puede eliminar porque ocurrio el error");
            }
        }
        
    }
    const editar_registro = async (e, idjockey)=>{
        e.preventDefault();
        
        setIdJockey(idjockey)
        const datos_jockey= await API.getJockeyByID(idjockey);
        console.log(datos_jockey)
        setNombre(datos_jockey.nombre)
        setIdJockey(datos_jockey.idjockey)
        setDireccion(datos_jockey.direccion)
        setTelefono(datos_jockey.telefono)
        setPeso(datos_jockey.peso)
    }

    const limpiarModal = async ()=>{
        setNombre('')
        setIdJockey('')
        setDireccion('')
        setTelefono('')
        setPeso('')
              
    }
    const ver_permisos =  async (id_rol)=>{
        const menu='/usuarios';
        const respuesta= await API.ver_permisos({id_rol, menu });
        if(respuesta.status){
            setPermisoDenegado(true)
        }else{
            setPermisoDenegado(false)
        }
    }
   
    
    return(
        <>
        
        <Menu/>
        
        {
        !permisoDenegado? 
            <div className="alert alert-warning" role="alert">
            No tiene  permiso para acceder a esta opción
            </div>
            :<>
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
                <td>Id jockey</td>
                <td>Nombre</td>
                <td>Direccion</td>
                <td>Telefono</td>
                <td>Peso</td>
                <td colspan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {jockey.map((jockey)=>(
                <tr>
                <td >{jockey.idjockey}</td>    
                <td >{jockey.nombre}</td>
                <td >{jockey.direccion}</td>
                <td >{jockey.telefono}</td>
                <td >{jockey.peso}</td>
                <td>
              
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, jockey.idjockey)} class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i>Editar</button>
                <button onClick={()=>eliminar(jockey.idjockey )}  class="btn btn-danger btn-sm" ><i class="bi bi-trash"></i>Eliminar</button>                
                
                </td>
                </tr>

            ))}
            </tbody>
            
           
        </table>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos del Jockey </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={guardarJockey}>
                <div class="modal-body">
                               
                                
                <h1 className="h3 mb-3 fw-normal">Por favor completar los datos</h1>             
                    
                                 
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                   
                  />
                  <label for="nombre">Jockey</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={direccion}
                  onChange={(event)=>setDireccion(event.target.value)}
                  className="form-control" 
                  
                  />
                  <label for="nombre">Direccion</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={telefono}
                  onChange={(event)=>setTelefono(event.target.value)}
                  className="form-control" 
                   
                  />
                  <label for="nombre">Telefono</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="number" 
                  value={peso}
                  onChange={(event)=>setPeso(event.target.value)}
                  className="form-control" 
                  
                  />
                  <label for="nombre">Peso</label>
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
        }
        
        </>
    )
}