
import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'

import { Login } from './Login'
import { Principal } from './Principal'
import { Registro } from './Registro'






import { EditCaballo } from './componentes/Caballos/EditCaballo'



import { Usuarios } from './componentes/usuarios/Usuarios'
// import { GenPdf } from './GenPdf'
import { Caballo } from './componentes/Caballos/Caballos'

import { Cuidador } from './componentes/Cuidador/Cuidador'
import { Localidad } from './componentes/Localidad/Localidad'

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
       
        
        <Route path='/usuarios' element={<Usuarios/>}></Route>
        <Route path='/localidad' element={<Localidad/>}></Route>
        <Route path='/cuidador' element={<Cuidador/>}></Route>
        {/* <Route path='/addcuidador' element={<AddCuidador/>}></Route> */}
        <Route path='/carreras' element={<Carreras/>}></Route>
        {/* <Route path='/agregarcaballo' element={<AddCaballo/>}></Route> */}
        <Route path='/agregarremate' element={<AddRemates/>}></Route>
        <Route path='/jockey' element={<Jockey/>}></Route>
        {/* <Route path='/editlocalidad/:idlocalidad' element={<EditLocalidad/>}></Route> */}
        
        
        <Route path='/editcaballo/:idcaballo' element={<EditCaballo/>}></Route>
        
        <Route path='/caballos' element={<Caballo/>}></Route>
        <Route path='/remates' element={<Remates/>}></Route>
        



        {/* <Route path='/generador' element={<GenPdf/>}></Route> */}
      </Routes>
      
      
     
    </>
  )
}

export default App
