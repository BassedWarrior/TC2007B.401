import React from 'react';
import Plot from 'react-plotly.js';

export const ProyectosMensual =()=>(
  <Plot
    data={[{
        type: 'pie', 
        values:[320, 25], 
        labels:["Digital", "Efectivo"],
        marker: {
          colors: ['#FDD055', '#FD55CC', '#5522FD']
        }
    }]}
    layout={{width: 500, 
            height: 350, 
            title:{text: 'Tipo de Donación', font:{color: "828282", size:20}}, 
            legend:{font:{color: "828282"}}, 
            paper_bgcolor:"rgba(0, 120, 0, 0)"}}
    config={{displayModeBar:false}}
  />
);

