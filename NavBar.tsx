import React, { useState, useEffect } from 'react'
import {
    AppBar, Toolbar, Box, Grid, Paper, Button, IconButton,
    Typography,
} from '@material-ui/core'

const NavBar = () => {

    const [TbarTseTxfOtc, setTbarTseTxfOtc] = useState<any[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:57064/api/TbarTseTxfOtc');
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
                console.log(data);
                setTbarTseTxfOtc(data);
            } catch (error) { console.log(error) }
        };
        fetchPosts();
    }, []);

    return (
        <AppBar position='static' style={{ height: 100, padding: 20 }} >
            <Toolbar>
                <Grid item container justifyContent="space-evenly" alignItems="center">
                    <Grid item xs={1}>
                        <Paper style={{ width: 120, height: 70 }}> 指期：{TbarTseTxfOtc[2]}<br />漲跌：{TbarTseTxfOtc[3]}<br />漲幅：{TbarTseTxfOtc[4]}% </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper style={{ width: 120, height: 70 }}> 加權：{TbarTseTxfOtc[5]}<br />漲跌：{TbarTseTxfOtc[6]}<br />漲幅：{TbarTseTxfOtc[7]}% </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper style={{ width: 120, height: 70 }}> 櫃買：{TbarTseTxfOtc[8]}<br />漲跌：{TbarTseTxfOtc[9]}<br />漲幅：{TbarTseTxfOtc[10]}% </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h2" align='center' noWrap> 📉 ＭＡＸ 📈 </Typography>
                            <Typography variant="subtitle2" align='center' noWrap>{Date().toString().slice(0, 10)}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" align='right' >證：****{TbarTseTxfOtc[0]}<br />期：****{TbarTseTxfOtc[1]}</Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}
export default NavBar