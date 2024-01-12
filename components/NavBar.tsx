import React, { useState, useEffect } from 'react'
import {
    AppBar, Toolbar, Box, Grid, Paper, Typography
} from '@material-ui/core'
// import axios from 'axios';

interface Data { Acct: string[]; TAIFEX: string[]; TSE: string[]; OTC: string[]; }

const NavBar = () => {

    const [TbarTseTxfOtc, setTbarTseTxfOtc] = useState<Data>({ Acct: [], TAIFEX: [], TSE: [], OTC: [] });
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:57064/api/ListAccountsSnapshots_NavBar'); //57064  9033
                if (!response.ok) { throw new Error('Error fetching data'); }
                const data = await response.json();
                console.log(data);
                setTbarTseTxfOtc(data);      // setTbarTseTxfOtc(Object.entries(data));
            } catch (error) { console.log(error) }
        };
        fetchPosts();
    }, []);

    return (
        <AppBar position='static' style={{ height: 100, padding: 20 }} >
            <Toolbar>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item xs={1}>
                        <Paper style={{ width: 120, height: 70 }}> 指期：{TbarTseTxfOtc.TAIFEX[0]}<br />漲跌：{TbarTseTxfOtc.TAIFEX[1]}<br />漲幅：{TbarTseTxfOtc.TAIFEX[2]}% </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper style={{ width: 120, height: 70 }}> 加權：{TbarTseTxfOtc.TSE[0]}<br />漲跌：{TbarTseTxfOtc.TSE[1]}<br />漲幅：{TbarTseTxfOtc.TSE[2]}% </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper style={{ width: 120, height: 70 }}> 櫃買：{TbarTseTxfOtc.OTC[0]}<br />漲跌：{TbarTseTxfOtc.OTC[1]}<br />漲幅：{TbarTseTxfOtc.OTC[2]}% </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h2" align='center' noWrap>　　 📉 ＭＡＸ 📈 </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" align='right' >證：****{TbarTseTxfOtc.Acct[0]}<br />期：****{TbarTseTxfOtc.Acct[1]}</Typography>
                        <Typography variant="subtitle2" align='right' noWrap>{Date().toString().slice(0, 10)}</Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}
export default NavBar