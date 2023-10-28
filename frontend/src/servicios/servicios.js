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


export async function getUsuariosByID(id_usuario){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function EditUsuario(datos, id_usuario){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function AddUsuario(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios`, Options)
    const data= await respuesta.json()
    return data;
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

// inicio de Localidad (modelos)

export async function getLocalidad(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/localidad`, Options)
    const data= await respuesta.json()

    return data
}






// export async function getLocalidad(){
//     const Options={
//         method:'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }
//     const respuesta = await fetch(`${URL}/localidad`, Options)
//     const data= await respuesta.json();
//     return data
// }

export async function AddLocalidad(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/localidad`, Options)
    const data= await respuesta.json()
    return data;
}

export async function deleteLocalidad(idlocalidad){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/localidad/${idlocalidad}`, Options)
    const data= await respuesta.json()
    return data;
}



export async function getLocalidadByID(idlocalidad){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/localidad/${idlocalidad}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function EditLocalidad(datos, idlocalidad){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/localidad/${idlocalidad}`, Options)
    const data= await respuesta.json()
    return data;
}


// fin de  localidad (modelos)

//inicio Remates


export async function getRemates(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/remates`, Options)
    const data= await respuesta.json()

    return data
}


export async function getRematesByID(idremate){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/remates/${idremate}`, Options)
    const data= await respuesta.json();
    return data[0];
}
export async function EditRemate(datos, idremate){
        const token = JSON.parse(localStorage.getItem('token'));
        const Options={
            method:'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const respuesta = await fetch(`${URL}/remates/${idremate}`, Options)
        const data= await respuesta.json()
        return data;
}

    export async function ActualizarEstadoRemate(idremate, actualizar){
        const token = JSON.parse(localStorage.getItem('token'));
        const Options={
            method:'DELETE',
            body: JSON.stringify(actualizar),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const respuesta = await fetch(`${URL}/remates/${idremate}`, Options)
        const data= await respuesta.json()
        return data;
    }

    export async function AddRemate(datos){
        const token = JSON.parse(localStorage.getItem('token'));
        const Options={
            method:'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const respuesta = await fetch(`${URL}/remates`, Options)
        const data= await respuesta.json()
        return data;
    }
    






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

// fin de cuidador


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
    return data;}

//COMIENZO DE CARRERAS

export async function getCarreras(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/carreras`, Options)
    const data= await respuesta.json();
    return data
}


export async function AddCarrera(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/carreras`, Options)
    const data= await respuesta.json()
    return data;
}

export async function deleteCarrera(idcarreras){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/carreras/${idcarreras}`, Options)
    const data= await respuesta.json()
    return data;
}



export async function getCarreraByID(idcarreras){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/carreras/${idcarreras}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function EditCarrera(datos,idcarreras){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/carreras/${idcarreras}`, Options)
    const data= await respuesta.json()
    return data;
}

// FIN DE CARRERAS


//inicio de jockey

export async function getJockey(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/jockey`, Options)
    const data= await respuesta.json()

    return data
}



export async function AddJockey(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/jockey`, Options)
    const data= await respuesta.json()
    return data;
}

export async function deleteJockey(idjockey){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/jockey/${idjockey}`, Options)
    const data= await respuesta.json()
    return data;
}



export async function getJockeyByID(idjockey){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/jockey/${idjockey}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function EditJockey(datos, idjockey){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/jockey/${idjockey}`, Options)
    const data= await respuesta.json()
    return data;
}

