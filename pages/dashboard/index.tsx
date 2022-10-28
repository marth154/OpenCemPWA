import { faker } from '@faker-js/faker';
import { Card, Grid, Stack } from "@mui/material";

import {
    ArcElement,
    BarElement,
    CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, RadialLinearScale, Title,
    Tooltip
} from 'chart.js';
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import Layout from '../../src/components/layout';

ChartJS.register(
    ArcElement,
    RadialLinearScale,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function DashBoard() {
    const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    const dataLine = {
        labels,
        datasets: [
            {
                label: 'Émisphère Nord',
                data: labels.map(() => faker.datatype.number({ min: -50, max: 30 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Émisphère Sud',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
                borderColor: 'rgb(132, 99, 255)',
                backgroundColor: 'rgba(132, 99, 255, 0.5)',
            },
        ],
    };

    const dataBarHumidity = {
        labels,
        datasets: [
            {
                label: 'Humidité',
                data: labels.map(() => faker.datatype.float({ min: 0, max: 1 })),
                backgroundColor: 'rgb(255, 99, 132)',
            },
        ],
    };

    const dataBarWind = {
        labels,
        datasets: [
            {
                label: "Vitesse du vent",
                data: labels.map(() => faker.datatype.float({ min: 0, max: 50 })),
                backgroundColor: 'rgb(255, 99, 132)',
            },
        ],
    };

    const dataPie = {
        labels: ['Temps clair', 'Temps couvert', 'Pluvieux', 'Neige', 'Orage'],
        datasets: [
            {
                label: 'Temps',
                data: [
                    faker.datatype.number({ min: 0, max: 30 }),
                    faker.datatype.number({ min: 0, max: 30 }),
                    faker.datatype.number({ min: 0, max: 30 }),
                    faker.datatype.number({ min: 0, max: 30 }),
                    faker.datatype.number({ min: 0, max: 30 })
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const data = {
        datasets: [
            {
                label: 'Précipitation',
                data: Array.from({ length: 100 }, () => ({
                    x: faker.datatype.number({ min: 0, max: 365 }),
                    y: faker.datatype.number({ min: 0, max: 100 }),
                })),
                backgroundColor: 'rgba(0, 235, 43, 1)',
            },
        ],
    };
    const styleCard = { m: 1 }
    return (
        <>
            <Layout>
                <Grid container>
                    <Grid item xs={8} >
                        <Card sx={styleCard}>
                            <Line data={dataLine} />
                        </Card>
                    </Grid>
                    <Grid item xs={4} >
                        <Stack direction="column">
                            <Card sx={styleCard}>
                                <Bar data={dataBarWind} />
                            </Card>
                            <Card sx={styleCard}>
                                <Bar data={dataBarHumidity} />
                            </Card>
                        </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                        <Card sx={styleCard}>
                            <Pie data={dataPie} />
                        </Card>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={6}>
                        <Card sx={styleCard}>
                            <Scatter data={data} />
                        </Card>
                    </Grid>
                </Grid>
            </Layout>
        </>
    )
}
