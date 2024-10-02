import React from 'react'
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div>
      <nav>
        <h1>ESTAS EN EL INICIO</h1>
        <Link to='/nosotros'></Link>
        <Link to='/proyectos'></Link>
      </nav>
    </div>
  )
}

export default Inicio;
