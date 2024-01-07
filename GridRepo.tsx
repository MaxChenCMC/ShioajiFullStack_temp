import React, { useState, useEffect } from 'react'
import {
    Typography, TableContainer, Paper, Table, Grid, TableHead,
    TableBody, TableRow, TableCell, makeStyles,
    Card, AppBar, Tab, Toolbar
} from '@material-ui/core'


export const FiveItems = () => {

    return (
        <Grid container >
            
            <TableContainer component={Paper} style={{ height: 450 }}>
                <Grid container spacing={1} direction="row" justifyContent='center'>
                    {[0, 1, 2, 3, 4].map((value) => (
                        <Grid key={value} item >
                            {
                                value === 0 ? (
                                    <Table component={Paper} >
                                        <Grid>
                                            <TableCell >5210 寶碩 ▼6.58%</TableCell>
                                        </Grid>
                                        <Grid>
                                            <TableCell >5210 寶碩 ▼6.58%</TableCell>
                                        </Grid>
                                        <Grid>
                                            <TableCell >5210 寶碩 ▼6.58%</TableCell>
                                        </Grid>
                                    </Table>
                                )
                                    : value === 1 ? (
                                        <Table component={Paper} style={{ width: 230, height: 250 }} >
                                            <Typography align='center' gutterBottom color='error'>昨日熱門</Typography>
                                        </Table>
                                    )
                                        : value === 2 ? (
                                            <Table component={Paper} style={{ width: 230, height: 250 }} >
                                                <Typography align='center' gutterBottom color='error'>當沖熱門</Typography>

                                            </Table>
                                        )
                                            : value === 3 ? (
                                                <Table component={Paper} style={{ width: 230, height: 250 }} >
                                                    <Typography align='center' gutterBottom color='error'>未平倉</Typography>

                                                </Table>
                                            )
                                                : (
                                                    <Paper>
                                                        <Typography align='center'>權益數</Typography>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell >可動金</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>

                                                            </TableBody>
                                                        </Table>
                                                    </Paper>
                                                )
                            }
                        </Grid>
                    ))}
                </Grid>

            </TableContainer>
        </Grid>
    )
}
