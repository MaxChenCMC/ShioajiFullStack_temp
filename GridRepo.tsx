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


export const FiveItems = () => {


    return (
        <Grid container >
                        {/* A、B1 B2 B3、C */}
            <Grid item container spacing={2}>
                {/* Grid item A 的height定義最多到這(不過調了會看不出來)，若height A調300(比height B:300+100+200少)那D區不會被遮到，仍會擠出第一個Grid(即ABC)區之外
                調paper的height因有陰影才可見，，但若調成700那D區就會再下移*/}
                <Grid item style={{ width: 900, height: 600 }}>
                    {/* <Paper style={{ height: 600 }}>Part A</Paper> */}
                    <Scanners/>
                </Grid>

                {/* spacing好像只對grid有效，若grid裡層是Paper那也沒用  */}
                <Grid item style={{ width: 400 }}>
                    {/* <Paper style={{ height: 300 }}>Part B</Paper> */}
                    {/* <Paper style={{ height: 100 }}>Pasdfsdfrt B</Paper> */}
                    {/* <Paper style={{ height: 200 }}>Part B</Paper> */}
                    <Chart/>
                </Grid>

                <Grid item style={{ width: 390 }}>
                    {/* <Paper style={{ height: 600 }}>Part C</Paper> */}
                    <BlueChips/>
                </Grid>
            </Grid>

            {/* D1 D2 D3 D4 D5 */}
            <Grid item container direction="row" spacing={2}>

                {/* Part E (with 9 cells) */}
                <Grid item xs={3}>
                    <Grid container direction="row" spacing={1}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell) => (
                            <Grid item xs={4} key={cell}>
                                <Paper>D{cell}</Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Part D */}
                <Grid item xs={3}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Paper style={{ height: 100 }}>E1</Paper>
                        </Grid>
                        <Grid item >
                            <Paper style={{ height: 100 }}>E2</Paper>
                        </Grid>
                        <Grid item>
                            <Paper style={{ height: 100 }}>E3</Paper>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Part F */}
                <Grid item xs={3}>
                    <Paper style={{ height: 330 }}>F</Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper style={{ height: 165 }}>Part G</Paper>
                    <Paper style={{ height: 165 }}>Part G</Paper>
                </Grid>

            </Grid>

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
        // <Typography align={'center'} variant='h5' component='div' gutterBottom>即時行情</Typography>
        // </Grid >
    )
}
