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

interface ProyectoFaseData {
    phase: string;
    count: number;
}

interface GraphData {
    [key:string]: ProyectoFaseData
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const ProyectosPorFase: React.FC = () => {
    const { data: graph, isPending, error } = useGetOne<GraphData>(
        "graphs", { id: "proyectos-fases" }
    );

    if (isPending) {
        return <Loading />
    };
    if (error) {
        return <Error />
    };
    if (!graph) {
        return null;
    };

    const formattedData = graph.data.map((item) => ({
        name: item.phase,
        value: item.count
    }));

    return (
        <div>
            <h2>Proyectos por Fase</h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={formattedData}
                        cx="50%"
                        cy="50%"
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {formattedData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
