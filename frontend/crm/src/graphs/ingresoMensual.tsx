import React from 'react';
import Plot from 'react-plotly.js';

export const IngresoMensual =()=>(
  <Plot
    data={[
      {type: 'bar', x: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio"], 
                    y: [2, 5, 3, 4, 2, 5, 8], 
                    marker:{color: "rgba(144, 85, 253, 0.5)"}},
      ]}
    layout={{width: 600, height: 350, 
            title: {text: 'Ingresos Mensuales 2024', font:{color: "#828282", size:25}}, 
            xaxis:{color: "828282"}, 
            yaxis:{title: "Ingresos (MXN)", color: "828282"}, 
            paper_bgcolor:"rgba(0, 120, 0, 0)"}}
    config={{displayModeBar:false}}
  />
);