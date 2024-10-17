import React, { useEffect, useState } from 'react';
import { useGetOne, Loading } from "react-admin";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

// Define the type of data returned from the API
interface DonacionTipoData {
  digital: number;
  efectivo: number;
}

const COLORS = ['#0088FE', '#00C49F'];

export const DonacionesPorTipo: React.FC = () => {
    const { data: graph, isPending, error } = useGetOne(
        "graphs", { id: "donaciones-tipo" }
    );

    if (isPending) {
        return <Loading />;
    };
    if (error) {
        return <Error />;
    };
    if (!graph) {
        return null;
    };

    const data = [
        { name: 'Digital', value: graph.digital },
        { name: 'Efectivo', value: graph.efectivo }
    ];

    return (
        <div>
            {/* Title for the chart */}
            <h2>Distribución de Donaciones por Tipo</h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        // Adds labels
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend /> {/* Adds a legend to describe the colors */}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
