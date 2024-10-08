import React from 'react';
import Plot from 'react-plotly.js';

export const IngresoMensual =()=>(
  <Plot
    data={[
      {type: 'bar', x: ["enero", "febrero", "marzo"], y: [2, 5, 3]},
      ]}
    layout={ {width: 320, height: 240, title: 'Ingresos Mensuales'} }
    config={{displayModeBar:false}}
  />
);

