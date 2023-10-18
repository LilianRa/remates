import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Menu } from "../../menu";
import { Link } from "react-router-dom";
import { Vigia } from "../../Vigia";

 export function Carreras(){
    const [carrera, setCarreras] = useState([])
    const [mensaje , setMensaje] = useState([])

    useEffect(()=>{
        API.getCarreras().then(setCarreras)}, []
    )


    const eliminar = async(idcarrera)=>{
        if(confirm('Esta seguro de eliminar este registro?')){
            const borrado = await API.deleteCarrera(idcarrera);
            if(borrado.status){

                window.location.reload(true)
            }else{
                alert("No se puede eliminar porque ocurrio el error");
            }
        }
        
    }
    
    const guardarCarrera = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddCarrera({idcarreras,idcaballo,idcuidador,idjockey,peso,distancia});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()

            setTimeout(()=>{
                window.location.href='/carreras'
                }, 5000)
        }
        return;
    }

    return(
        <>
        <div>
            {mensaje}
        </div>
        <Menu/>
        <Vigia/>
        <div class="table-responsive small">
        <table class="table table-striped-columns">
             <thead>
             <tr>
                <td  colspan="7" ><Link  class="btn btn-outline-success"  to="/agregacarrera">Agregar</Link></td>    
            </tr>
                <tr>
                    <th >id carrera</th>
                    <th >id cuidador</th>
                    <th >id jockey</th>
                    <th >peso</th>
                    <th >distancia</th>
                    <th >fecha</th>
                    <th  colspan="2">Acciones</th>
                </tr>
             </thead>
             <tbody>
            {carrera.map((c)=>(
                <tr>
                <td >{c.idcaballo}</td>
                <td >{c.idcuidador}</td>
                <td >{c.idjockey}</td>
                <td >{c.peso}</td>
                <td >{c.distancia}</td>
                <td >{c.fecha}</td>
                
                <td >
                    <Link to={`/editcarrera/${c.idcarrera}`} ><button class="btn btn-warning btn-sm">Editar</button></Link>
                </td>
                {/* {(c.estado=="A")?
                <td><button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, ee.id_equipo, ee.estado )}>Desactivar</button></td>
                :
                <td><button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, ee.id_equipo, ee.estado )} >Activar</button></td>
                } */}
                
                </tr>
            ))}
           </tbody>
        </table>
        </div>
        
        </>
    )
 }