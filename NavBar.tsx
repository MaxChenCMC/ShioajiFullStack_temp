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
                            <Typography variant="h2" align='center'>【 M a x📈 】</Typography>
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



var Scanners_AmountRank = _api.Scanners(scannerType:ScannerType.AmountRank, date:DateTime.Now.ToString("yyyy-MM-dd"), count:2);

// _AmountRank"s" 最終回傳複式dict
// _AmountRank 個股dict
// _temp 個股逐值
List<Dictionary<string, List<object>>> _AmountRanks = new List<Dictionary<string, List<object>>>();
for (int i = 0; i < Scanners_AmountRank.ToArray().Length ; i++)
{
    Dictionary<string, List<object>> _AmountRank = new Dictionary<string, List<object>>();
    List<object> _temp = new List<object>();
    var _lastClose = Scanners_AmountRank[i].close - Scanners_AmountRank[i].change_price;
    _temp.Add(Scanners_AmountRank[i].name);
    _temp.Add(Math.Round(Scanners_AmountRank[i].change_price * 100 / _lastClose, 2));
    _temp.Add(Scanners_AmountRank[i].tick_type == "1" ? "內":"外");
    _temp.Add(Math.Round(100 *(Scanners_AmountRank[i].open - _lastClose) / _lastClose, 2));
    _temp.Add(Math.Round(100 *(Scanners_AmountRank[i].high - _lastClose) / _lastClose, 2));
    _temp.Add(Math.Round(100 *(Scanners_AmountRank[i].low - _lastClose) / _lastClose, 2));
    _temp.Add(Math.Round(100 *(Scanners_AmountRank[i].close - _lastClose)  /_lastClose, 2));
    _AmountRank.Add(Scanners_AmountRank[i].code, _temp);
    _AmountRanks.Add(_AmountRank);
}

// _AmountRanks


var res = _api.Scanners(scannerType:ScannerType.AmountRank, date:DateTime.Now.ToString("yyyy-MM-dd"), count:20);
List<long> _temp = new List<long>();
foreach(var i in res){
    _temp.Add((long)i.total_amount);
}
_temp.Sum() / 100_000_000
