//import logo from './logo.svg';
import './App.css';
//import { AppBar } from '@mui/material';
//import Layout from './componentes/jsx/Layout';
//import Routes from './routes/Routers'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Inicio from './paginas/jsx/Inicio'
import Nosotros from './paginas/jsx/Nosotros'
import Proyectos from './paginas/jsx/Proyectos'


function App() {
  return (
    <div className='Aplicacion'>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/proyectos' element={<Proyectos />} />
        </Routes>
    </div>
  );
}



export default App;
