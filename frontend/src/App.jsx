
import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'

import { Login } from './Login'
import { Principal } from './Principal'
import { Registro } from './Registro'


import { Equipos } from './componentes/equipos/Equipos'
import { Modelos } from './componentes/modelos/Modelos'
import { AddCaballo } from './componentes/Caballos/AddCaballo'
import { AddModelo } from './componentes/modelos/AddModelo'
import { EditCaballo } from './componentes/Caballos/EditCaballo'
import { EditEquipo } from './componentes/equipos/EditEquipo'
import { AddEquipo } from './componentes/equipos/AddEquipo'
import { Ubicaciones } from './componentes/ubicaciones/Ubicaciones'
import { Usuarios } from './componentes/usuarios/Usuarios'
import { GenPdf } from './GenPdf'
import { Caballo } from './componentes/Caballos/Caballos'
import { AddCuidador } from './componentes/Cuidador/AddCuidador'
import { Cuidador } from './componentes/Cuidador/Cuidador'
import { Localidad } from './componentes/Localidad/Localidad'
import { EditCuidador } from './componentes/Cuidador/EditCuidador'
import { Remates } from './componentes/remates/remates'
import { Carreras } from './componentes/carreras/Carreras'
import { AddRemates } from './componentes/remates/AddRemates'
import { Jockey } from './componentes/jockey/Jockey'


function App() {

  return (
    <>
     
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/principal' element={<Principal/>}></Route>
        <Route path='/registro' element={<Registro/>}></Route>
        <Route path='/equipos' element={<Equipos/>}></Route>
        <Route path='/ubicaciones' element={<Ubicaciones/>}></Route>
        <Route path='/usuarios' element={<Usuarios/>}></Route>
        <Route path='/localidad' element={<Localidad/>}></Route>
        <Route path='/cuidador' element={<Cuidador/>}></Route>
        <Route path='/addcuidador' element={<AddCuidador/>}></Route>
        <Route path='/carreras' element={<Carreras/>}></Route>
        <Route path='/agregarcaballo' element={<AddCaballo/>}></Route>
        <Route path='/agregarremate' element={<AddRemates/>}></Route>
        <Route path='/jockey' element={<Jockey/>}></Route>
        {/* <Route path='/editlocalidad/:idlocalidad' element={<EditLocalidad/>}></Route> */}
        <Route path='/agregarequipo' element={<AddEquipo/>}></Route>
        <Route path='/agregarmodelo' element={<AddModelo/>}></Route>
        <Route path='/editcaballo/:idcaballo' element={<EditCaballo/>}></Route>
        <Route path='/editequipo/:id_equipo' element={<EditEquipo/>}></Route>
        <Route path='/caballos' element={<Caballo/>}></Route>
        <Route path='/remates' element={<Remates/>}></Route>
        



        <Route path='/generador' element={<GenPdf/>}></Route>
      </Routes>
      
      
     
    </>
  )
}

export default App
