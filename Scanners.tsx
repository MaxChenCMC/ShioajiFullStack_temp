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

export const Scanners = () => {

    const classes = useStyles();

    const [AmountRank, setAmountRank] = useState<any[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:57064/api/AmountRank');
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
                setAmountRank(data);
            } catch (error) { console.log(error) }
        };
        fetchPosts();
    }, []);

    const [ChangePercentRank, setChangePercentRank] = useState<any[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:57064/api/ChangePercentRank');
            const data = await response.json();
            setChangePercentRank(data);
        };
        fetchPosts();
    }, []);


    return (
        <Grid container >
            {/* 這邊就算高寫到450，但在layout的component沒寫足450*2=900的話，那D區就會把A遮住 */}
            <TableContainer component={Paper} style={{ height: 300 }}>
                <Typography align={'center'} variant='h5' color='primary'>【成交值排行】</Typography>
                <Table aria-label='simple table' stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cellFontC} width={45}>內/外</TableCell>
                            <TableCell className={classes.cellFontC}>股號</TableCell>
                            <TableCell className={classes.cellFontC}>股名</TableCell>
                            <TableCell className={classes.cellFontC}>漲跌幅</TableCell>
                            <TableCell className={classes.cellFontC}>開</TableCell>
                            <TableCell className={classes.cellFontC} width={10}></TableCell>
                            <TableCell className={classes.cellFontC}>收</TableCell>
                            <TableCell className={classes.cellFontC}>振幅</TableCell>
                            <TableCell className={classes.cellFontC}>【成交值】</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {AmountRank.map((row) => (
                            <TableRow>
                                <TableCell className={classes.cellFontC}>{(row.tick_type === 1) ? "內" : "外"}</TableCell>
                                <TableCell className={classes.cellFontC}>{row.code}</TableCell>
                                <TableCell className={classes.cellFontC}>{row.name}</TableCell>
                                <TableCell className={classes.cellFontR}>{Math.round(row.change_price / row.average_price * 100)} %</TableCell>
                                <TableCell className={classes.cellFontR}>{row.open}</TableCell>
                                <TableCell className={classes.cellFontC}>{(row.close > row.open ? "↗" : "↘")}</TableCell>
                                <TableCell className={classes.cellFontR}>{row.close}</TableCell>
                                <TableCell className={classes.cellFontR}>{Math.round(row.price_range / row.average_price * 100)} %</TableCell>
                                <TableCell className={classes.cellFontR}>{Math.round(row.total_amount / 100_000_000)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper} style={{ height: 300 }} >
                <br /><br />
                <Typography align={'center'} variant='h5' color='primary'>【漲幅排行】</Typography>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cellFontC} width={45}>內/外</TableCell>
                            <TableCell className={classes.cellFontC}>股號</TableCell>
                            <TableCell className={classes.cellFontC}>股名</TableCell>
                            <TableCell className={classes.cellFontC}>【漲跌幅】</TableCell>
                            <TableCell className={classes.cellFontC}>開</TableCell>
                            <TableCell className={classes.cellFontC} width={10}></TableCell>
                            <TableCell className={classes.cellFontC}>收</TableCell>
                            <TableCell className={classes.cellFontC}>振幅</TableCell>
                            <TableCell className={classes.cellFontC}>成交值</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ChangePercentRank.map((row) => (
                            <TableRow >
                                <TableCell className={classes.cellFontC}>{(row.tick_type === 1) ? "內" : "外"}</TableCell>
                                <TableCell className={classes.cellFontC}>{row.code}</TableCell>
                                <TableCell className={classes.cellFontC}>{row.name}</TableCell>
                                <TableCell className={classes.cellFontR}>{Math.round(row.change_price / row.average_price * 100)} %</TableCell>
                                <TableCell className={classes.cellFontR}>{row.open}</TableCell>
                                <TableCell className={classes.cellFontC}>{((row.close - row.open) >= 0 ? "↗" : "↘")}</TableCell>
                                <TableCell className={classes.cellFontR}>{row.close}</TableCell>
                                <TableCell className={classes.cellFontR}>{Math.round(row.price_range / row.average_price * 100)} %</TableCell>
                                <TableCell className={classes.cellFontR}>{Math.round(row.total_amount / 100_000_000)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}
