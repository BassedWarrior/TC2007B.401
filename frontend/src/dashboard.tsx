// in src/Dashboard.js
import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardContent';
import Grid from '@mui/material/CardContent';
import { Title } from 'react-admin';
import {IngresoMensual} from "./graphs/ingresoMensual";
import {TipoDonacion} from "./graphs/tipoDonacion";

export const Dashboard = () => (
    <div>
    <Card>
        <CardContent>
            {IngresoMensual()}
        </CardContent>
    </Card>
    <Card>
        <CardContent>
            {TipoDonacion()}
        </CardContent>
    </Card>
    </div>

);
