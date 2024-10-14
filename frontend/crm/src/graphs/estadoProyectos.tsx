import React from 'react';
import Plot from 'react-plotly.js';

export const EstadosProyectos =()=>(
  <Plot
    data={[{
        type: 'pie', 
        values:[320, 25, 210, 4], 
        labels:["Planeado", "En Progreso", "Completado", "Cancelado"]
    }]}
    layout={ {width: 320, height: 240, title: 'Estados de los Proyectos'} }
    config={{displayModeBar:false}}
  />
);

