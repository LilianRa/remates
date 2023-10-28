import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";
import { Vigia } from "../../Vigia";

 export function Carreras(){
    const [carrera, setCarreras] = useState([])
    const [caballo,setCaballo]= useState([])
    const [cuidador,setCuidador]= useState([])
    const [jockey,setJockey]= useState([])

    const [mensaje , setMensaje] = useState([])
    const [idcarreras,setIdCarreras]=useState('')
    const [idcaballo,setIdCaballo]=useState('')
    const [idcuidador,setIdCuidador]=useState('')
    const [idjockey,setIdJockey]=useState('')
    const [peso,setPeso]=useState('')
    const [distancia,setDistancia]=useState('')
    const [fecha,setFecha]=useState('')
    const [nombrecuidador,setNombreCuidador]=useState('')
    const [nombrejockey,setNombreJockey]=useState('')
    const [nombreCaballo,setNombreCaballo]=useState('')

    const [permisoDenegado, setPermisoDenegado] = useState(false)
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
        if(idcarreras){
            const respuesta = await API.EditCarrera({idcaballo,idcuidador,idjockey,peso,distancia,fecha}, idcarreras)
    
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
                    // API.getUsuarios().then(setUsuarios)
                    }, 2500)
            }
            return;
        }
        
    }
    
    useEffect(()=>{

        
        API.getCarreras().then(setCarreras)
        API.getCuidador().then(setCuidador)  
        API.getCaballos().then(setCaballo)
        API.getJockey().then(setJockey)
        
            
    }, [])


    const eliminar = async(idcarreras)=>{
        if(confirm('Esta seguro de eliminar este registro?')){
            console.log('este es mi codigo:'+idcarreras)
            const borrado = await API.deleteCarrera(idcarreras);
            if(borrado.status){
                window.location.reload(true)
            }else{
                alert("No se puede eliminar porque ocurrio el error");
            }
        }
        
    }

    const editar_registro = async (e, idcarreras)=>{
        e.preventDefault();
        
        setIdCarreras(idcarreras)
        const datos_carrera= await API.getCarreraByID(idcarreras);
        console.log(datos_carrera)
        setIdCarreras(datos_carrera.idcarreras)
        setIdCaballo(datos_carrera.idcaballo)
        setIdCuidador(datos_carrera.idcuidador)
        setIdJockey(datos_carrera.idjockey)
        setPeso(datos_carrera.peso)
        setDistancia(datos_carrera.distancia)
        setFecha(datos_carrera.fecha_sin_formato)
    }

    const limpiarModal = async ()=>{
        setIdCarreras('')
        setIdCaballo('')
        setIdCuidador('')
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
                <button onClick={(event)=>limpiarModal('')}  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i class="bi bi-database-add"></i>Agregar</button>
                </th>    
            </tr>

            <tr>
               <td>Id carreras</td>
                <td>Id caballo</td>
                <td>Id cuidador</td>
                <td>Id jockey</td>
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
                <td >{ca.idcuidador}</td>
                <td >{ca.idjockey}</td>
                <td >{ca.peso}</td>
                <td >{ca.distancia}</td>
                <td >{ca.fecha_formateada}</td>
                <td >
                    {/* <Link to={`/editcaballo/${caballo.idcaballo}`} ><button class="btn btn-warning btn-sm">Editar Link</button></Link> */}
                    <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, ca.idcarreras)} class="btn btn-outline-warning btn-sm"><i class="bi bi-pencil"></i>Editar</button>
                    <button onClick={()=>eliminar(ca.idcarreras )}  class="btn btn-danger btn-sm" ><i class="bi bi-trash"></i>Eliminar</button>                
                {/* {(caballo.estado=="A")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, caballo.idcaballo, caballo.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, caballo.idcaballo, caballo.estado )} >Activar</button>
                
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos de las carreras </h1>
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
                    placeholder="Numero de carrera"
                    id="ncarrera"
                    />
                    <label for="floatingInput">Numero de carrera</label>
                    </div>

                    <div className="form-floating">
                  
                    <select onChange={(event)=>setIdCaballo(event.target.value)} className="form-control">
                     {caballo.map((caballo)=>(
                      
                     <option value={caballo.idcaballo}>{caballo.nombre}</option>
                     ))}
                    </select>
                    <label for="floatingInput">Caballo</label>
                    </div>

                  
                 <div className="form-floating">
                  
                  <select onChange={(event)=>setIdCuidador(event.target.value)} className="form-control">
                     {cuidador.map((cu)=>(
                       
                     <option value={cu.idcuidador}>{cu.nombre}-{cu.idlocalidad}</option>
                     ))}
                  </select>
                  <label for="floatingInput">Cuidador</label>
                 </div>
                 
                 <div className="form-floating">
                  
                  <select onChange={(event)=>setIdJockey(event.target.value)} className="form-control">
                     {jockey.map((j)=>(
                       
                     <option value={j.idjockey}>{j.nombre}-{j.direccion}-{j.telefono}-{j.peso}</option>
                     ))}
                  </select>
                  <label for="floatingInput">Jockey</label>
                 </div>
                 <div className="form-floating">
                    <input required
                    type="number" 
                    value={peso}
                    min="1"
                    onChange={(event)=>setPeso(event.target.value)}
                    className="form-control" 
                    placeholder="Peso"
                    id="peso"
                   
                    />
                    <label for="floatingInput">Peso del jockey</label>
                    </div>
                    <div className="form-floating">
                    <input required
                    type="number" 
                    value={distancia}
                    min="1"
                    onChange={(event)=>setDistancia(event.target.value)}
                    className="form-control" 
                    placeholder="Distancia"
                    id="distancia"
                   
                    />
                    <label for="floatingInput">Distancia</label>
                    </div>

                    <div className="form-floating">
                    <input required
                    type="date" 
                    value={fecha}
                    onChange={(event)=>setFecha(event.target.value)}
                    className="form-control" 
                    placeholder="Fecha"
                    id="fecha"
                   
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
                
                
                </div>
                <div class="toast-body">
                {mensaje}
                </div>
            </div>
        </div>
        </>
    )
}
            