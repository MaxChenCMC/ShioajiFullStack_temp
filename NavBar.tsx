import React, { useState, useEffect } from 'react'
import {
    Typography, AppBar, makeStyles, Toolbar, Box
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


const NavBar = () => {

    const classes = useStyles();

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
        <AppBar position='static' style={{ height: 80, padding: 10 }} >
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    指期：{TbarTseTxfOtc[0]}<br />漲跌：{TbarTseTxfOtc[1]}<br />幅度：{TbarTseTxfOtc[2]}%
                    {/* <Typography variant='h6' component="div">
                        指期:{TbarTseTxfOtc[0]}&nbsp;漲跌:{TbarTseTxfOtc[1]}&nbsp;{TbarTseTxfOtc[2]}%
                        <br />
                        加權:{TbarTseTxfOtc[3]}&nbsp;漲跌:{TbarTseTxfOtc[4]}&nbsp;{TbarTseTxfOtc[5]}%
                        <br />
                        櫃買:{TbarTseTxfOtc[6]}&nbsp;漲跌:{TbarTseTxfOtc[7]}&nbsp;{TbarTseTxfOtc[8]}%
                    </Typography> */}
                </Box>&nbsp;&nbsp;&nbsp;
                <Box sx={{ flexGrow: 1 }}>
                    加權：{TbarTseTxfOtc[3]}<br />漲跌：{TbarTseTxfOtc[4]}<br />幅度：{TbarTseTxfOtc[5]}%
                </Box>&nbsp;&nbsp;&nbsp;
                <Box sx={{ flexGrow: 1 }}>
                    櫃買：{TbarTseTxfOtc[6]}<br />漲跌：{TbarTseTxfOtc[7]}<br />幅度：{TbarTseTxfOtc[8]}%
                </Box>
                <Typography variant='h3' component="div" align='center'>【Max📈】</Typography>
                <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                    證：{TbarTseTxfOtc[9]}<br />期：0{TbarTseTxfOtc[10]}<br />{Date().slice(0, 10)}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar
