import React from 'react';
import Plot from 'react-plotly.js';

export const graph =()=>(
  <Plot
    data={[
      {
        x: ["enero", "febrero", "marzo"],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},
      },
      {type: 'bar', x: ["enero", "febrero", "marzo"], y: [2, 5, 3]},
      ]}
    layout={ {width: 320, height: 240, title: 'Ingresos Mensuales'} }
  />
);

