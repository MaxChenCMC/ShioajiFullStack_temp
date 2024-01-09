import React, { useState, useEffect } from 'react'
import {
    Typography, TableContainer, Paper, Table, Grid, TableHead,
    TableBody, TableRow, TableCell, makeStyles,
    Card, AppBar, Tab, Toolbar
} from '@material-ui/core'


export const TicksLastCount = () => {

    const [TicksLastCount, setTicksLastCount] = useState<any[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:57064/api/TicksLastCount');
            const data = await response.json();
            setTicksLastCount(Object.entries(data));
        };
        fetchPosts();
    }, []);


    return (
        <>
            <Typography variant="subtitle2" align='center' color='primary' noWrap >逐筆明細</Typography>
            {/* <TableContainer style={{ maxHeight: "380px" }}> */}
            <TableContainer style={{ height: "375px" }}>
                <Table size="small" >
                    {TicksLastCount.map((i) => (
                        <TableRow  >
                            <TableCell >{i[0]}</TableCell>
                            <TableCell >{i[1]}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>

        </>

    )
}
export default TicksLastCount
