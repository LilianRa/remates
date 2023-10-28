import React, { useEffect, useState } from "react";
import './Sidebar.css'
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'
import'./style.css'


<style className="css"></style>

export function Sidebar(){
  const [menus, setMenu]= useState([])
  const [user, setUser]= useState()

  useEffect(()=>{
      const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
      if(!datos_usuario){
          window.location.href='/';
          return;
      }
      
      setUser(datos_usuario.apellido+' '+datos_usuario.nombre)
      traer_menu(datos_usuario.id_rol);
  },[])

  const traer_menu =  async (id_rol)=>{
      const datos= await API.getMenuByRol(id_rol);
      setMenu(datos.menu)
  }

  

  const salir = ()=>{
      localStorage.removeItem('usuario');
      window.location.href='/';
  }

    return(
        <>
       
        <div class="container-fluid">
        <div class="row">
         <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
           <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
              <div class="offcanvas-header">
               <h5 class="offcanvas-title" id="sidebarMenuLabel"><Menu:toolbar>Menu</Menu:toolbar></h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
            </div>
        <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <ul className="nav flex-column">
                            {menus.map((m)=>(
                                <li className="nav-item">
                                    <Link  className="nav-link active" aria-current="page"  to={m.href}>{m.nombre}</Link>
                                </li>
                            ))}
                                {/* <li className="nav-item">
                                    <Link  className="nav-link active" aria-current="page"  to='../generador'>Impresión</Link>
                                
                                </li> */}
                            <li className="nav-link active"  aria-current="page" ><b>{user}</b></li>
                            <li><button  class="btn btn-primary" onClick={salir}>Cerrar Session</button></li>
                            </ul>
                  </div>
      </div>
    </div>

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Bienvenido</h1>
        </div>
          <div>
             <h2>Carreras</h2>
            <link rel="stylesheet" href="style.css"/> 
                    <div className="container-scroll">
                        <div className="row">
                          <div className="col">
                            <img className="img-fluit" src="./public/caballos.jpg"/>
                          </div>
                              
                        </div>
                       <div>
                </div>
                           
          </div>            
      </div>
    </main>
  </div>
</div>       
        </>
    )
}