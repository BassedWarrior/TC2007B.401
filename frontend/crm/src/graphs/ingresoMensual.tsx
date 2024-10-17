import React, { useEffect, useState } from 'react';
import { useGetOne, Loading, Error } from "react-admin";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

// Define the type of data returned from the API
interface DonacionesMensualesData {
    year: number;
    donacionesMensuales: number[];
}

const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

export const DonacionesMensuales: React.FC = () => {
    const { data: graph, isPending, error } = useGetOne<DonacionesMensualesData>(
        "graphs", { id: "donaciones-mensuales" }
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

    const monthlyData = graph.donacionesMensuales.map((value, index) => ({
        name: months[index],
        value
    }));

    return (
        <div>
            <h2>Donaciones Mensuales en {graph.year}</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
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
