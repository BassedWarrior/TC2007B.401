import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Define the type of data returned from the API
interface DonacionTipoData {
  monetaria: number;
  especie: number;
}

const COLORS = ['#0088FE', '#00C49F'];

export const DonacionesPorTipo: React.FC = () => {
  console.log('Rendering DonacionesPorTipo');
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DonacionTipoData>('https://localhost:5001/api/donaciones/graphsTipo');
        setData([
          { name: 'Monetaria', value: response.data.monetaria },
          { name: 'Efectivo', value: response.data.efectivo }
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Distribución de Donaciones por Tipo</h2> {/* Title for the chart */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={({ name, value }) => `${name}: ${value}`} // Adds labels
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend /> {/* Adds a legend to describe the colors */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};