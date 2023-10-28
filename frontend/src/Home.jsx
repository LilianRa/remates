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
        <>
            <Login/>
         </>
          
    ) 
}
 
    