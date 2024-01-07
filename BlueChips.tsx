import React, { useState, useEffect } from 'react'
import {
    makeStyles, Grid, Typography,
    TableContainer, Paper, Table, TableHead,
    TableBody, TableRow, TableCell,
    Card, AppBar, Tab, Toolbar
} from '@material-ui/core'


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

    var AmountSum = Object.values(BlueChips).reduce((acc, val) => acc + val[1][2], 0);

    return (
        <>
            <Typography variant="subtitle2" align='center' color='primary' noWrap>權值股漲跌</Typography>
            <Table size="small"  >
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>chg%</TableCell>
                        <TableCell>AmtSum</TableCell>
                        <TableCell width={250}>Bid Ask</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {BlueChips.map((i) => (
                        <TableRow >
                            <TableCell >{i[0]}</TableCell>
                            <TableCell >{i[1][0]}</TableCell>
                            <TableCell >{i[1][1]}</TableCell>
                            <TableCell >{i[1][2]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>

    )
}

// export default BlueChips
// 好像這邊若沒預設匯出的話，在App.tsx匯入時就得用大括包著
// 也代表一個.tsx可以寫多個  export const BlueChips = () => {}
// 但光寫一個const就夠長了，寫多個那還得了