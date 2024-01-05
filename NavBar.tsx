import React, { useState, useEffect } from 'react'
import {
    AppBar, Toolbar, Box, Grid, Paper, Button, IconButton,
    Typography,
    makeStyles
} from '@material-ui/core'
import { Height } from '@mui/icons-material';

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

    const dd = [17798.12, -77.05, "-0.43"]
    const acct = [777777, 22222]
    return (
        <AppBar position='static' style={{ height: 110, padding: 20 }} >
            <Toolbar>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item xs={4}>
                        <Paper style={{ width: 150, height: 65 }}>加權：{dd[0]}<br />漲跌：{dd[1]}<br />漲幅：{dd[2]}% </Paper>
                        {/* <Paper style={{ width: 150 }}>加權：{dd[0]}<br />漲跌：{dd[1]}<br />漲幅{dd[2]}% </Paper> */}
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h2" align='center'> 📉 ＭＡＸ 📈 </Typography>
                            <Typography variant="subtitle2" align='center'>{Date().toString().slice(0, 10)}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" align='right'>證：{acct[0]}<br />期：0{acct[1]}</Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}
export default NavBar
