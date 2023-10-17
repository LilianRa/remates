const URL ='http://localhost:2024';

//esta es mi funcion para loguearme
export async function Login(datos){
    
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/login`, Options);
    const data= await respuesta.json();
    return data
}

//esta es mi funcion es para validar el nick
export async function ValidarNick(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validarnick`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}

//esta es mi funcion para loguearme
export async function Registro(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/registro`, Options)
    const data= await respuesta.json()
    return data
}


export async function getUsuariosByID(idusuarios){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${idusuarios}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function getMenuByRol(id_rol){
    const token = JSON.parse(localStorage.getItem('token'));
   const Options={
       method:'GET',
       headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
       }
   }
   const respuesta = await fetch(`${URL}/menu/${id_rol}`, Options)
   const data= await respuesta.json();
   return data;
}


export async function ver_permisos(datos){
    const token = JSON.parse(localStorage.getItem('token'));
   const Options={
       method:'POST',
       body: JSON.stringify(datos),
       headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
       }
   }
   const respuesta = await fetch(`${URL}/menu_permisos`, Options)
   const data= await respuesta.json();
   console.log('respuesta de permisos', data)
   return data;
}



// Inicio de caballos

export async function getCaballos(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/caballos`, Options)
    const data= await respuesta.json()

    return data
}

export async function getCaballosByID(idcaballo){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/caballos/${idcaballo}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function deleteCaballo(idcaballo){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/caballos/${idcaballo}`, Options)
    
}

export async function ActualizarEstadoCaballo(idcaballo, actualizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/caballos/${idcaballo}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function AddCaballo(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/caballos`, Options)
    const data= await respuesta.json()
    return data;
}


export async function EditCaballo(datos, idcaballo){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/caballos/${idcaballo}`, Options)
    const data= await respuesta.json()
    return data;
}

// fin de caballos

// inicio de modelos
export async function getModelos(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/modelos`, Options)
    const data= await respuesta.json();
    return data
}

export async function deleteModelo(id_modelo){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/modelos/${id_modelo}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function AddModelo(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/modelos`, Options)
    const data= await respuesta.json()
    return data;
}

// fin de  modelos


// inicion de Cuidador
export async function getCuidador(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/cuidador`, Options)
    const data= await respuesta.json();
    return data
}

export async function getCuidadorByID(idcuidador){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/cuidador/${idcuidador}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function EditCuidador(datos, idcuidador){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/cuidador/${idcuidador}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function ActualizarEstadoCuidador(idcuidador, actualizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/cuidador/${idcuidador}`, Options)
    const data= await respuesta.json()
    return data;
}
// export async function ActualizarEstadoCuidador(idcuidador, actualizar){
//     const Options={
//         method:'DELETE',
//         body: JSON.stringify(actualizar),
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }
//     const respuesta = await fetch(`${URL}/cuidador/${idcuidador}`, Options)
//     const data= await respuesta.json()
//     return data;
// }

export async function AddCuidador(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/cuidador`, Options)
    const data= await respuesta.json()
    return data;
}

// fin de tipo de equipos


// inicio de equipos
export async function getEquipos(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/equipos`, Options)
    const data= await respuesta.json()
    return data
}
export async function AddEquipo(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/equipos`, Options)
    const data= await respuesta.json()
    return data;
}


export async function EditEquipo(datos, id_equipo){
    console.log(datos)
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/equipos/${id_equipo}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function ActualizarEstadoEquipo(id_equipo, actualizar){
    const Options={
        method:'PUT',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cambiar_estado_equipos/${id_equipo}`, Options)
    const data= await respuesta.json()
    return data;
}


export async function getEquipoByID(id_equipo){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/equipos/${id_equipo}`, Options)
    const data= await respuesta.json();
    console.log(data[0])
    return data[0];
}

// fin de equipos

//inicio de ubicaciones
export async function getUbicaciones(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones`, Options)
    const data= await respuesta.json();
    return data
}

export async function AddUbicacion(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones`, Options)
    const data= await respuesta.json()
    return data;
}

export async function getUbicacionesByID(id_ubicacion){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones/${id_ubicacion}`, Options)
    const data= await respuesta.json();
    return data[0];
}
export async function EditUbicacion(datos, id_ubicacion){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones/${id_ubicacion}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function ActualizarEstadoUbicacion(id_ubicacion, actulizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones/${id_ubicacion}`, Options)
    const data= await respuesta.json()
    return data;
}

// fin de ubicaciones

// inicio usuarios

export async function getUsuarios(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/usuarios`, Options)
    const data= await respuesta.json();
    return data
}

export async function ActualizarEstadoUsuario(id_usuario, actualizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json()
    return data;
}
export async function ResetUsuariosByID(id_usuario){
    const Options={
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/resetpass/${id_usuario}`, Options)
    const data= await respuesta.json()
    return data;
}