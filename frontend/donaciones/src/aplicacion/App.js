import ReactDOM from 'react-dom';
import {Route, Routes} from 'react-router-dom';

import Inicio from '../paginas/jsx/Inicio'
import Nosotros from '../paginas/jsx/Nosotros'
import Proyectos from '../paginas/jsx/Proyectos'
import Barra from '../componentes/jsx/Barra'


function App() {
  return (
    <div className='Aplicacion'>
        <Barra/>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/proyectos' element={<Proyectos />} />
        </Routes>
    </div>
  );
}



export default App;
