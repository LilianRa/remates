

import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Vigia } from "../../Vigia";
import { Menu } from "../../Menu";
import { jsPDF } from "jspdf";


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
            const respuesta = await API.AddRemate({idremate,idcaballo,mjugado,macobrar,idcarrera,estado,fecha})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/remates'
                    // API.getUsuarios().then(setUsuarios)
                    }, 2500)
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
        setFecha(datos_remate.fecha_sin_formato)
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

    const imprimir_ficha = async (e, idremates)=>{
        e.preventDefault();
        setIdRemate(idremates)
        const datos_remate= await API.getRematesByID(idremates);
        console.log(datos_remate)
        var doc = new jsPDF({
            orientation: 'V',
            unit: 'cm',
            format: [8,8 ]
            
          })
          var img = new Image();
          img.src = 'data:image/png;base64,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'; // Reemplaza 'imagen.jpg' con la URL de tu imagen
          
        doc.addImage(img, 'JPEG', 4, 2, 3.5, 2); 
        
        doc.text("Remate ", 1, 1);
        doc.setFontSize(10);
        doc.text('Fecha: ' + new Date().toLocaleDateString(), 1, 2);
        doc.text("Carrera: "+datos_remate.idcarrera, 1, 3);
        doc.text("Caballo: "+datos_remate.idcaballo, 1, 4);
        doc.text("Monto Jugado: $"+datos_remate.mjugado,1,5);
        doc.text("Monto a pagar: $"+datos_remate.macobrar,1,6);
       

        doc.save("ficha_remate_"+datos_remate.idremate+".pdf");
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
        <div class="container">
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
                <td>Id carrera</td>
                <td>Id remate</td>
                <td>Id caballo</td>
                <td>Fecha</td>
                <td>Monto jugado</td>
                <td>Monto a cobrar</td>
                <td>Estado</td>
                <td colspan="4">Acciones</td>
            </tr>
        </thead>
        <tbody>
            {remates.map((remates)=>(
                <tr>
                 <td >{remates.idcarrera}</td>
                <td >{remates.idremate}</td>   
                <td >{remates.idcaballo}</td>
                <td >{remates.fecha_formateada}</td>    
                <td >{remates.mjugado}</td>  
                <td >{remates.macobrar}</td>
                <td >{remates.estado}</td>
                                 
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
                {(remates.estado=="A")?
                       <button onClick={(event)=>imprimir_ficha(event, remates.idremate)} class="btn btn-info btn-sm"><i class="bi bi-printer"></i>Imprimir</button>
                    : 
                    <button disabled class="btn btn-warning btn-sm">Imprimir</button>
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
                    min="1"
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
                    min="1"
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
                    min="1"
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
                    min="1"
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
                    min="1"
                    onChange={(event)=>setIdCarreras(event.target.value)}
                    className="form-control" 
                    placeholder="Numero de carrera"
                    />
                    <label for="floatingInput">Numero de carrera</label>
                    </div>
               
                </div>
                <div class="modal-footer">
                <button className="btn btn-primary" type="submit" >Guardar</button>
                {/* <Link to="/remates" >Volver</Link> */}
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
           </div>
        
         </>
    )
}