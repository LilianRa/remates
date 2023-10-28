import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'

import { Link } from "react-router-dom";

import { Vigia } from "../../Vigia";
import { Menu } from "../../Menu";

export function Carreras(){
    const [carrera, setCarrera]=useState([])
    const [idcarreras, setIdCarreras]=useState('')
    const [idcaballo, setIdCaballo] = useState('')
    const [nombre_caballo, setNombreCaballo] = useState('')
    const [idcuidador, setIdCuidador]=useState('')
    const [nombre_cuidador, setNombreCuidador] = useState('')
    const [idjockey,setIdJockey]=useState('')
    const [peso,setPeso]=useState('')
    const [distancia,setDistancia]=useState('')
    const [fecha,setFecha]=useState('')
  
    const [caballo, setCaballo]=useState([]);
    const [cuidador, setCuidador]=useState([]);
    const [jockey, setJockey]=useState([]);
    const [mensaje, setMensaje] = useState('')
   

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
    const guardarCarrera = async(event)=>{
        event.preventDefault();
        if(!idcarreras){
                   console.log('entro en edit')
            const respuesta = await API.EditCarrera({idcaballo,idcuidador,idjockey,peso,distancia,fecha},idcarreras)
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/carreras'
                  
                    }, 2500)
            }
            return;
        }else{
            const respuesta = await API.AddCarrera({idcarreras,idcaballo,idcuidador,idjockey,peso,distancia,fecha})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/carreras'
                    }, 1500)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        API.getCarreras().then(setCarrera)
        API.getCaballos().then(setCaballo)
        API.getCuidador().then(setCuidador)
        API.getJockey().then(setJockey)
    }, [])


    const eliminar = async(idcarreras)=>{
        console.log('el registro a eliminar es :'+idcarreras)
        if(confirm('Esta seguro de eliminar este registro?')){
            const borrado = await API.deleteCarrera(idcarreras);
            if(borrado.status){
                window.location.reload(true)
            }else{
                alert("No se puede eliminar porque ocurrio un error");
            }
        }
        
    }


    const editar_registro = async (e, idcarreras)=>{
        e.preventDefault();
        console.log('el id que vamos a editar es el ', idcarreras)
        setIdCarreras(idcarreras)
        const datos_carrera= await API.getCarreraByID(idcarreras);
        console.log(datos_carrera)
        setIdCaballo(datos_carrera.idcaballo)
        setNombreCaballo(datos_carrera.nombre_caballo)
        setIdCuidador(datos_carrera.idcuidador)
        setNombreCuidador(datos_carrera.nombre_cuidador)
        setIdJockey(datos_carrera.idjockey)
        setPeso(datos_carrera.peso)
        setDistancia(datos_carrera.distancia)
        setFecha(datos_carrera.fecha_sin_formato)
        
     
    }
    const limpiarModal = async ()=>{
        setIdCaballo('')
        setNombreCaballo('')
        setIdCuidador('')
        setNombreCuidador('')
        setIdJockey('')
        setPeso('')
        setDistancia('')
        setFecha('')

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
                <button onClick={(event)=>limpiarModal('')} class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" >Agregar </button>
                </th>    
            </tr>

            <tr>
               <td>Id Carrera</td>
                <td>Id Cuidador</td>
                <td>Nombre del Cuidador</td>
                <td>Id jockey</td>
                <td>Nombre del  jockey</td>
                <td>Peso</td>
                <td>Distancia</td>
                <td>Fecha</td>
                <td colspan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {carrera.map((ca)=>(
                <tr>
                <td >{ca.idcarreras}</td> 
                <td >{ca.idcaballo}</td>
                <td >{ca.nombre_caballo}</td> 
                <td >{ca.idcuidador}</td>
                <td >{ca.nombre_cuidador}</td> 
                <td >{ca.peso}</td>  
                <td >{ca.distancia}</td> 
                <td >{ca.fecha_formateada}</td> 
                
                {/* <td >
                    <Link to={`/editcarreras/${ca.idcarreras}`} ><button class="btn btn-warning btn-sm">Editar</button></Link>
                </td>
              */}
                <td >
                    {/* <Link to={`/editcuidador/${cuidador.idcuidador}`} ><button class="btn btn-warning btn-sm">Editar Link</button></Link> */}
                    <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, ca.idcarreras)} class="btn btn-outline-warning btn-sm">Editar</button>
                    <button onClick={()=>eliminar(ca.idcarreras)}  class="btn btn-danger btn-sm" ><i class="bi bi-trash"></i>Eliminar</button>                
                {/* {(cuidador.estado=="A")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, cuidador.idcuidador,cuidador.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, cuidador.idcuidador, cuidador.estado )} >Activar</button>
                
                } */}
                </td>
                </tr>
            ))}
            </tbody>
            
           
        </table>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos de carrera </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={guardarCarrera}>
                <div class="modal-body">
                    
                
                    <div className="form-floating">
                    <input required
                    type="number" 
                    value={idcarreras}
                    min="1"
                    onChange={(event)=>setIdCarreras(event.target.value)}
                    className="form-control" 
                    placeholder="Num carreras"
                    />
                    <label for="floatingInput">Número de Carrera</label>
                    </div>
                                                       
                    <div className="form-floating">
                    <input required
                    type="number" 
                    value={idcaballo}
                    min="1"
                    onChange={(event)=>setIdCaballo(event.target.value)}
                    className="form-control" 
                    placeholder="Num caballo"
                    />
                    <label for="floatingInput">Número de Caballo</label>
                    </div>

                    <div className="form-floating">
                    <input required
                    type="number" 
                    value={idcuidador}
                    min="1"
                    onChange={(event)=>setIdCuidador(event.target.value)}
                    className="form-control" 
                    placeholder="Num carreras"
                    />
                    <label for="floatingInput">Número de Cuidador</label>
                    </div>
                    <div className="form-floating">
                    <input required
                    type="number" 
                    value={idjockey}
                    min="1"
                    onChange={(event)=>setIdJockey(event.target.value)}
                    className="form-control" 
                    placeholder="Num carreras"
                    />
                    <label for="floatingInput">Número de Jockey</label>
                    </div>
                    
                    <div className="form-floating">
                    <input required
                    type="number" 
                    value={peso}
                    min="40"
                    max="60"
                    onChange={(event)=>setPeso(event.target.value)}
                    className="form-control" 
                    placeholder="Num carreras"
                    />
                    <label for="floatingInput">Peso</label>
                    </div>
                    <div className="form-floating">
                    <input required
                    type="number" 
                    value={distancia}
                    min="1"
                    onChange={(event)=>setDistancia(event.target.value)}
                    className="form-control" 
                    placeholder="Num carreras"
                    />
                    <label for="floatingInput">Distancia</label>
                    </div>
                    <div className="form-floating">
                    <input required
                    type="date" 
                    value={fecha}
                    
                    onChange={(event)=>setFecha(event.target.value)}
                    className="form-control" 
                    placeholder="Num carreras"
                    />
                    <label for="floatingInput">Fecha</label>
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