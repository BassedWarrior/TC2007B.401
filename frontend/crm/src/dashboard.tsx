import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid'; // Correct import for Grid
import { Title } from 'react-admin';
import { IngresoMensual } from "./graphs/ingresoMensual";
import { ProyectosMensual } from "./graphs/proyectosMensual";
import { EstadosProyectos } from "./graphs/estadoProyectos";

export const Dashboard = () => (
    <div>
        <Title title="Dashboard" />
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <IngresoMensual />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <ProyectosMensual />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <EstadosProyectos />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </div>
);
