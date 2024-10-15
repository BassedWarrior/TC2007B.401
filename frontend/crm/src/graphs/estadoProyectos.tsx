import React from 'react';
import Plot from 'react-plotly.js';

export const EstadosProyectos =()=>(
  <Plot
    data={[{
        type: 'pie', 
        values:[320, 25, 210, 4], 
        labels:["Planeado", "En Progreso", "Completado", "Cancelado"],
        marker: {
          colors: ['#9055FD', '#FDD055', '#FD55CC', '#5522FD']
        }
    }]}
    layout={{width: 500, 
            height: 350, 
            title: {text: 'Estados de los Proyectos', font:{color: "#828282", size:20}},
            legend:{font:{color: "#828282"}},  
            paper_bgcolor:"rgba(0, 120, 0, 0)"}}
    config={{displayModeBar:false}}
  />
);

