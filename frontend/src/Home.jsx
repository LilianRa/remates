import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import './Home.css'
import { Login } from "./Login";

export function Home(){

  useEffect(()=>{
    const datos_usuario = JSON.parse(localStorage.getItem('usuario'));

    if(datos_usuario){
        window.location.href='/principal';
        return;
    }
    
},[])

    return(
//         <>
//             <Login/>
//          </>
          
//     ) 
// }
<>
        
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="mb-auto">
    <div>
      {/* <h3 class="float-md-start mb-0">Cover</h3> */}
      <nav class="nav nav-masthead justify-content-center float-md-end">
        {/* <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href=""><Link to="/">Home</Link></a> */}
        <a class="nav-link fw-bold py-1 px-0"><Link to="/login">Login</Link></a>
        <a class="nav-link fw-bold py-1 px-0"><Link to="/registro">Registro</Link></a>
      </nav>
    </div>
  </header>

  <main class="px-2">
    <h1>Sistema de emisión de jugadas</h1>

    <p class="lead">Bienvenidos </p>
    <div>
    <div>
   <img src="imagescaballos2.jpg" width="860" height="540" />
     </div>  
         
    </div>
    <p class="lead">
      {/* <a href="#" class="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</a> */}
    </p>
  </main>

  <footer class="mt-auto text-white-50">
    {/* <p>Cover template for <a href="https://getbootstrap.com/" class="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" class="text-white">@mdo</a>.</p> */}
  </footer>
</div>
</>
)
}
    

