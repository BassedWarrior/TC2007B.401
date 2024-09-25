import React from 'react';
import {BrowserRoutes as Routes, Route,Router,Switch} from 'react-router-dom';
import Inicio from '../paginas/jsx/Inicio';
import Nosotros from '../paginas/jsx/Nosotros';
import Proyectos from '../paginas/jsx/Proyectos';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={<Inicio/>} />
        <Route path="/inicio" component={<Inicio/>}/>
        <Route path="/nosotros" component={<Nosotros/>}/>
        <Route path="/proyectos" component={<Proyectos/>}/>
      </Routes>
    </Router>
  )
}

export default Routers
