import React, { useState, useEffect } from 'react'
import {
    Typography, TableContainer, Paper, Table, Grid, TableHead,
    TableBody, TableRow, TableCell, makeStyles,

    Card, AppBar, Tab, Toolbar
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    App: { color: 'black', backgroundColor: '#a2d1fa', minHeight: "70vh" },
    headerFont: { fontSize: '24px', textAlign: 'center' },
    cellFontL: { fontSize: '18px', textAlign: 'left' },
    cellFontC: { fontSize: '18px', textAlign: 'center' },
    cellFontR: { fontSize: '18px', textAlign: 'center' },
    tbar: { backgroundColor: '#red', },
    Layout: {},
}));


export const MoneyFlow = () => {

    const classes = useStyles();

    const [TicksLastCount, setTicksLastCount] = useState<any[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/TicksLastCount');
            const data = await response.json();
            setTicksLastCount(data);
        };
        fetchPosts();
    }, []);


    return (
        <Grid item xs={12} sm={6} md={3} >
            <Table></Table>
        </Grid>
    )
}


