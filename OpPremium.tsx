import React, { useState, useEffect } from 'react'
import {
    makeStyles, Grid, Box, Typography,
    TableContainer, Paper, Table, TableHead,
    TableBody, TableRow, TableCell,
    Card, AppBar, Tab, Toolbar
} from '@material-ui/core'

export const Chart = () => {

    const [OpPremium, setOpPremium] = useState<any[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:57064/api/OpPremium');
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
                console.log(data);
                setOpPremium(data);
            } catch (error) { console.log(error) }
        };
        fetchPosts();
    }, []);

    return (
        // item才適用xs={}
        <TableContainer component={Paper} style={{ height: 600 }}>
            <Grid container direction='row' justifyContent="space-between" alignItems='center'>
                <Paper style={{ width: 115, height: 70, textAlign: 'center', padding: '2px' }}>
                    BC：{OpPremium[0]}<br />
                    SC：{OpPremium[1]}
                </Paper>
                <Paper style={{ width: 115, height: 70, textAlign: 'center', padding: '2px' }}>
                    {OpPremium[0] - OpPremium[1]}<br />
                    複式價差單<br />
                    {OpPremium[2] - OpPremium[3]}
                </Paper>
                <Paper style={{ width: 115, height: 70, textAlign: 'center', padding: '2px' }}>
                    BC：{OpPremium[2]}<br />
                    SC：{OpPremium[3]}
                </Paper>
            </Grid>
        </TableContainer>
    )
}





