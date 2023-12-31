import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";
import Swal from 'sweetalert2' 


export function Usuarios(){
    const [usuarios, setUsuarios]=useState([])
    const [id_usuario, setIdUsuarios]=useState('')
    const [nombre, setNombre] = useState('')
    const [apellido,setApellido]=useState('')
    const [dni,setDni]=useState('')
    const [user,setUser]=useState('')
    const[pass,setPassword]=useState('')
    const[correo,setCorreo]=useState('')
    const[id_rol,setIdRol]=useState('')
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
    const guardarUsuario = async(event)=>{
        event.preventDefault();
        if(id_usuario){
            const respuesta = await API.EditUsuario({nombre,apellido,dni,user,pass,correo,id_rol}, id_usuario)
    
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/usuarios'
                    
                    }, 2500)
            }
            return;
        }else{
            const respuesta = await API.AddUsuario({nombre,apellido,dni,user,pass,correo,id_rol})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/usuarios'
                    // API.getUsuarios().then(setUsuarios)
                    }, 2500)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        ver_permisos(datos_usuario.id_rol);
        API.getUsuarios().then(setUsuarios)
    }, [])

    const cambiar_estado = async (e, id_usuario, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        const mjs = (estado_actual=="A")?"dar de baja":"dar de alta";
        Swal.fire({
            title: 'Esta seguro?',
            text: "Usted esta a punto de "+mjs+" a un usuario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, deja nomas',
            confirmButtonText: 'Si, ya te dije que si!'
          }).then((result) => {
            if (result.isConfirmed) {
                
                API.ActualizarEstadoUsuario(id_usuario, {actualizar})
                .then((respuesta) => {
                    if(respuesta.status){
                        setMensaje(respuesta.mensaje)
                        console.log('acrtualizar', actualizar)
                        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
                        console.log('user', datos_usuario.id_usuario)
                        console.log('usuario', id_usuario)
                        if(id_usuario==datos_usuario.id_usuario && actualizar=="B"){

                            localStorage.removeItem('usuario');
                            window.location.href='/';
                        }else{
                            API.getUsuarios().then(setUsuarios)
                            Swal.fire(
                                'Correcto!',
                                mensaje,
                                'success'
                              )   
                        }
                        
                    }
             
                })
            }
        })
        
        
    }

    const editar_registro = async (e, id_usuario)=>{
        e.preventDefault();
        
        setIdUsuarios(id_usuario)
        const datos_usuario= await API.getUsuariosByID(id_usuario);
        console.log(datos_usuario)
        setNombre(datos_usuario.nombre)
        setApellido(datos_usuario.apellido)
        setDni(datos_usuario.dni)
        setUser(datos_usuario.user)
        setPassword(datos_usuario.pass)
        setCorreo(datos_usuario.correo)
        setIdRol(datos_usuario.id_rol)
    }

    const limpiarModal = async ()=>{
        setNombre('')
        setApellido('')
        setDni('')
        setUser('')
        setPassword('')
        setCorreo('')
        setIdRol('')
    }

    const resetPass = async (e, id_usuario)=>{
        e.preventDefault();
        console.log('mi id_usuario es -->',id_usuario)
        console.log(id_usuario)
        Swal.fire({
            title: 'Esta seguro?',
            text: "Usted esta a punto de blanquear el password de un usuario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No ',
            confirmButtonText: 'Si, estoy segguro!'
          }).then((result) => {
            if (result.isConfirmed) {
                console.log('mi id_usuario es-->',id_usuario)
                API.ResetUsuariosByID(id_usuario)
                var a = 1
                .then((respuesta) => {
                    console.log(respuesta)
                    if(respuesta.status){
                        setMensaje(respuesta.mensaje)
                        API.getUsuarios().then(setUsuarios)
                        Swal.fire(
                            'Exito!',
                            mensaje,
                            'success'
                            
                          )
                         
                    }
             
                })

            }
        })
        
        const datos_usuario= await API.ResetUsuariosByID(id_usuario);
    
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
            No tiene  permiso para acceder a esta opcion
            </div>
            :<>
        <table class="table table-striped">
        <thead>
            <tr>
                
                <th colspan="6">
                
                <button onClick={(event)=>limpiarModal('')}  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i class="bi bi-database-add"></i>Agregar</button>
                
                &nbsp;

                
                {/* {(a= 1)?
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>cambiar_pass(event, usuario.id_usuario)} class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i>Cambiar contraseña</button>
                : 
                <button disabled class="btn btn-warning btn-sm">Cambiar contraseña</button>
                } */}
                {/* <input  type="checkbox"/>Solo Activos */}
                </th>    
            </tr>

            <tr>
                <td>Apellido y Nombre</td>
                <td>Nick</td>
                <td>Rol</td>
                <td>Correo</td>
                <td>Estado</td>
                <td colspan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {usuarios.map((usuario)=>(
                <tr>
                <td >{usuario.apellido} {usuario.nombre}</td>    
                <td >{usuario.user}</td>
                <td >{usuario.rol}</td>
                <td >{usuario.correo}</td>
                <td >{usuario.estado}</td>
                <td >
                {(usuario.estado=="A")?
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, usuario.id_usuario)} class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i>Editar</button>
                : 
                <button disabled class="btn btn-warning btn-sm">Editar</button>
                }
                {(usuario.estado=="A")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, usuario.id_usuario, usuario.estado )} ><i class="bi bi-hand-thumbs-down-fill"></i>Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, usuario.id_usuario, usuario.estado )} ><i class="bi bi-hand-thumbs-up-fill"></i>Activar</button>
                
                }
                
                <button onClick={(event)=>resetPass(event, usuario.id_usuario)} class="btn btn-dark btn-sm"><i class="bi bi-arrow-clockwise"></i>Reset Password</button>
               
               
                </td>
                </tr>
            ))}
            </tbody>
            
           
        </table>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos del usuario </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={guardarUsuario}>
                <div class="modal-body">
                               
                                
                <h1 className="h3 mb-3 fw-normal">Por favor completar los datos</h1>             
                    {/* <div className="form-floating">
                    <input required
                    type="text" 
                    value={nombre}
                    onChange={(event)=>setNombre(event.target.value)}
                    className="form-control" 
                    placeholder="Nombre del usuarios"
                    />
                    <label for="floatingInput">Nombre del usuario</label>
                    </div> */}
                                 
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={apellido}
                  onChange={(event)=>setApellido(event.target.value)}
                  className="form-control" 
                  id="apellido" 
                  />
                  <label for="apellido">Apellido</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  id="nombre" 
                  />
                  <label for="nombre">Nombre</label>
                </div>

                <div className="form-floating">
                  <input 
                  type="number" 
                  value={dni}
                  min="1"
                  onChange={(event)=>setDni(event.target.value)}
                  className="form-control" 
                  id="dni" 
                  />
                  <label for="dni">DNI</label>
                </div>
                <div className="form-floating">
                <input 
                  type="email" 
                  value={correo}
                  onChange={(event)=>setCorreo(event.target.value)}
                  className="form-control" 
                  id="correo" 
                  />
                  <label for="correo">Correo</label>
                </div>
                
                <div className="form-floating">
                  <input 
                  required
                  type="text" 
                  value={user}
                  onChange={(event)=>setUser(event.target.value)}
                //   onBlur={(event)=>validarNick(event.target.value)}
                  className="form-control" 
                  id="user" 
                  />
              <label for="usuario">Usuario</label>
                </div>
               
                <div className="form-floating">
                  <input 
                  required
                  type="password" 
                  value={pass}
                  onChange={(event)=>setPassword(event.target.value)}
                  className="form-control" 
                  id="pass" 
                  />
                  <label for="password">Password</label>
                </div>
                <div className="form-floating">
                  <input 
                  required
                  type="Number" 
                  value={id_rol}
                  min="1"
                  onChange={(event)=>setIdRol(event.target.value)}
                  className="form-control" 
                  id="rol" 
                  />
                  <label for="password">Id rol</label>
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