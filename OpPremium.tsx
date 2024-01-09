import React, { useState, useEffect } from 'react'
import {
    makeStyles, Grid, Box, Typography,
    TableContainer, Paper, Table, TableHead,
    TableBody, TableRow, TableCell,
    Card, AppBar, Tab, Toolbar,
} from '@material-ui/core'

export const OpPremium = () => {

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


    const [Margin, setMargin] = useState<any[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:57064/api/Margin');
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
                console.log(data);
                setMargin(data);
            } catch (error) { console.log(error) }
        };
        fetchPosts();
    }, []);

    return (
        <>
            <Typography variant="subtitle2" align='center' color='primary' noWrap >選擇權區</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ textAlign: 'center' }} colSpan={2}>Vertical Spread<br />BCSC</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >Parity +/- Strike</TableCell>
                        <TableCell style={{ textAlign: 'center' }} colSpan={2}>Vertical Spread<br />BPSP</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >庫存<br />權益數、可出金</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={2} style={{ textAlign: 'center' }} >{OpPremium[2] - OpPremium[3]}</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium[3]}</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium[1]}</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium[4]}</TableCell>
                        <TableCell rowSpan={2} style={{ textAlign: 'center' }} >{OpPremium[4] - OpPremium[5]}</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >{Margin[3]}、{Margin[4]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium[2]}</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium[0]}</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium[5]}</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >{Margin[0]}、{Margin[1]}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>

    )
}

export default OpPremium



