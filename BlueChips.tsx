import React, { useState, useEffect } from 'react'
import {
    makeStyles, Grid, Typography, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, Card, AppBar, Tab, Toolbar
} from '@material-ui/core'

const useStyles = makeStyles({ greenText: { color: "green" }, redText: { color: "red" } });

export const BlueChips = () => {
    // map function只適用array，所以obj要套map時只能先轉成「Object.entries()」
    const [BlueChips, setBlueChips] = useState<any[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:57064/api/BlueChips');
            const data = await response.json();
            // setBlueChips(data); //純array是這樣寫
            setBlueChips(Object.entries(data));
            console.log(data);
        };
        fetchPosts();
    }, []);

    const classes = useStyles();

    var buySum = Object.values(BlueChips).reduce((acc, val) => acc + val[1][0], 0);
    var amt = "↗7";
    var sellSum = "↘7";

    return (
        <>
            <Typography variant="subtitle2" align='center' color='primary' noWrap>(內盤{amt}) 成交值sum{Math.round(buySum)} (外盤{sellSum})</Typography>
            <TableContainer style={{ maxHeight: "550px" }}>
                <Table size="small" style={{ height: "100%" }} stickyHeader>
                    <TableHead >
                        <TableRow>
                            <TableCell>Sid</TableCell>
                            <TableCell>Chg%</TableCell>
                            <TableCell>Amt</TableCell>
                            <TableCell width={10}>T_Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {BlueChips.map((i) => (
                            <TableRow >
                                <TableCell >{i[0]}</TableCell>
                                <TableCell >{i[1][0]}</TableCell>
                                <TableCell >{i[1][1]}</TableCell>
                                <TableCell align='center' className={(i[1][2]) === "Buy" ? classes.redText : classes.greenText}>
                                    {i[1][2] === "Buy" ? "　　↗" : "↙　　"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}

// export default BlueChips
// 好像這邊若沒預設匯出的話，在App.tsx匯入時就得用大括包著
// 也代表一個.tsx可以寫多個  export const BlueChips = () => {}
// 但光寫一個const就夠長了，寫多個那還得了
