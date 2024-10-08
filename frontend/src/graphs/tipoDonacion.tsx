import React from 'react';
import Plot from 'react-plotly.js';

export const TipoDonacion =()=>(
  <Plot
    data={[{
        type: 'pie', 
        values:[320, 25], 
        labels:["Digital", "Efectivo"]
    }]}
    layout={ {width: 320, height: 240, title: 'Tipo de Donación'} }
    config={{displayModeBar:false}}
  />
);

