import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Define the type of data returned from the API
interface DonacionesMensualesData {
  year: number;
  donacionesMensuales: number[];
}

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export const DonacionesMensuales: React.FC = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DonacionesMensualesData>('https://localhost:5001/api/donaciones/graphsMes');
        const monthlyData = response.data.donacionesMensuales.map((value, index) => ({
          name: months[index],
          value
        }));
        setData(monthlyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Donaciones Mensuales en {new Date().getFullYear()}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#0088FE" name="Donaciones" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
