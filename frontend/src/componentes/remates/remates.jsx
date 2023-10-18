

import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { Vigia } from "../../Vigia";
import { useEffect, useState } from 'react';
export function Remates(){
    const [remates, setRemates] = useState([])
    const [fecha, setFecha] = useState('')
    const [idcaballo, setIdcaballo] = useState('')
    const [monto_jugado, setMontoJugado] = useState('')
    const [monto_pagado, setMontoPagado] = useState('')
    const [idremate, setIdRemate] = useState('')
    const [caballo, setCaballo] = useState([])
    const [mensaje, setMensaje] = useState('')
   
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
    useEffect(()=>{
       
        API.getRemates().then(setRemates)
        API.getCaballo().then(setCaballo)
        
    }, [])

    // const eliminar = async(id_modelo)=>{
    //     if(confirm('Esta seguro de eliminar este registro?')){
    //         const borrado = await API.deleteModelo(id_modelo);
    //         if(borrado.status){

    //             window.location.reload(true)
    //         }else{
    //             alert("No se puede eliminar porque ocurrio el error");
    //         }
    //     }
        
    // }
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
    const guardarRemate = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddRemate({idcaballo,fecha,mjugado,macobrar,idcarrera,});
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
    // const ver_permisos =  async (id_rol)=>{
    //     const menu='/modelos';
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
                
                <th colspan="3">
                    {/* <Link  class="btn btn-primary btn-sm"  to="/agregarmodelo">Agregar Modelo link</Link> */}
                    <button  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" >Agregar</button>
                    {/* <button type="button" class="btn btn-danger" id="liveToastBtn">Show live toast</button> */}
               
                </th>
            </tr>
            <tr>
                <th>Fecha</th>
                <th>idcaballo</th>
                <th>Monto jugado</th>
                <th>Monto a cobrar</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {remates.map((remates)=>(
                <tr>
                <td >{remates.idcaballo}</td>    
                <td >{remates.fecha}</td>    
                <td >{remates.mjugado}</td>  
                <td >{remates.macobrar}</td>  
                <td >{remates.idcarrera}</td>        
                <td >
                    <button onClick={()=>modificar(remates.idremate )}  data-bs-toggle="modal"  data-bs-target="#exampleModal" class="btn btn-warning btn-sm" >Editar</button>
                    {/* <button onClick={()=>eliminar(modelo.id_modelo )}  class="btn btn-danger btn-sm" >Eliminar</button> */}
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
                <form onSubmit={guardarRemates}>
                <div class="modal-body">
                
                    
                    <div className="form-floating">
                    <input 
                    required
                    type="text" 
                    value={fecha}
                    onChange={(event)=>setFecha(event.target.value)}
                    className="form-control" 
                    placeholder="Fecha del remate"
                    />
                    <label for="floatingInput">Fecha del remate</label>
                    </div>
                    <div className="form-floating">
                    
                    <select required onChange={(event)=>setIdcaballo(event.target.value)} className="form-control">
                    <option selected value="">Seleccione una opcion</option>
                        {caballo.map((c)=>(
                        
                        <option value={c.idcaballo}>{c.nombre}</option>
                        ))}
                    </select>
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