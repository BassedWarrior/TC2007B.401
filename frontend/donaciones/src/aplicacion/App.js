import ReactDOM from 'react-dom';
import {Route, Routes} from 'react-router-dom';

import Barra from '../componentes/jsx/Barra';
import PieAbajo from '../componentes/jsx/PieAbajo'

import Inicio from '../paginas/jsx/Inicio'
import Nosotros from '../paginas/jsx/Nosotros'
import Proyectos from '../paginas/jsx/Proyectos'
import Donaciones from '../paginas/jsx/Donaciones';



function App() {
  return (
    <div className='Aplicacion'>
        <Barra/>
    

          <Routes>
            <Route path='/' element={<Inicio />}/>
            <Route path='/nosotros' element={<Nosotros/>}/>
            <Route path='/proyectos' element={<Proyectos/>}/>
            <Route path='/donaciones' element={<Donaciones/>}/>
          </Routes>

        <PieAbajo/>
        
    </div>
  );
}



export default App;
