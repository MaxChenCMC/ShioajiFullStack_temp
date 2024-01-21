import React, { useState, useEffect } from 'react'
import {
    makeStyles, Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
    // Paper, Card, AppBar, Tab, Grid,Typography,  Toolbar
} from '@material-ui/core'

const useStyles = makeStyles({ greenText: { color: "green" }, redText: { color: "red" } });

interface OrderBy { [key: string]: [number, number, string] }

export const BlueChips = () => {

    const classes = useStyles();

    // const [BlueChips, setBlueChips] = useState<any[]>([])
    const [BlueChips, setBlueChips] = useState<OrderBy[]>([])  // 讓fetch而來的變數需參照interface的型別

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/Snapshots_BlueChips');
            const data = await response.json();

            // map function只適用array，所以C#目前多是return成obj就需要先轉成「Object.entries(data)」才可套map； setBlueChips(data); //純array是這樣寫
            // setBlueChips(Object.entries(data));

            const dataArray: OrderBy[] = Object.entries(data).map(([key, value]) => ({
                [key]: value as [number, number, string],
            }));
            dataArray.sort((a, b) => b[Object.keys(b)[0]][1] - a[Object.keys(a)[0]][1]);
            setBlueChips(dataArray);
            console.table(dataArray);
        };
        fetchPosts();
    }, []);

    // var buySum = Object.values(BlueChips).reduce((acc, val) => acc + val[1][0], 0);
    // var AmountSum = Object.values(AmountRank).reduce((accumulator, currentValue) => accumulator + currentValue[currentValue.length - 1], 0);
    // console.log(buySum);

    return (
        <>
            {/* <Typography variant="subtitle2" align='center' color='primary' noWrap>(內盤{amt}) 成交值sum{Math.round(buySum)} (外盤{sellSum})</Typography> */}
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
                        {BlueChips.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell >{Object.keys(entry)[0]}</TableCell>
                                <TableCell >{entry[Object.keys(entry)[0]][1]}</TableCell>
                                <TableCell >{entry[Object.keys(entry)[0]][1]}</TableCell>
                                <TableCell align='center' className={(entry[Object.keys(entry)[0]][2]) === "Buy" ? classes.redText : classes.greenText}>
                                    {entry[Object.keys(entry)[0]][2] === "Buy" ? "　　↗" : "↙　　"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
    // export default BlueChips
    // 好像這邊若沒預設匯出的話，在App.tsx匯入時就得用大括包著
    // 也代表一個.tsx可以寫多個  export const BlueChips = () => {}
    // 但光寫一個const就夠長了，寫多個那還得了    
}
