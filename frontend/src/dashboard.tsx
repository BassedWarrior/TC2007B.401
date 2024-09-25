// in src/Dashboard.js
import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title } from 'react-admin';
import {graph} from "./graphs";

export const Dashboard = () => (
    <Card>
        <Title title="Fundación Sanders" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        {graph()}
    </Card>
);
