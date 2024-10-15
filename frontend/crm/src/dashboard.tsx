import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid'; // Correct import for Grid
import { Title } from 'react-admin';
import { DonacionesPorTipo } from "./graphs/tiposDonaciones";
import { ProyectosPorFase } from "./graphs/fasesProyectos";
import { DonacionesMensuales } from "./graphs/ingresoMensual";

export const Dashboard = () => (
    <div>
        <Title title="Dashboard" />
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <DonacionesPorTipo/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <ProyectosPorFase/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <DonacionesMensuales/>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </div>
);
