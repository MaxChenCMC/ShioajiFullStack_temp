import React, { useState, useEffect } from 'react'
import {
    Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
    // Paper, Card, AppBar, Tab, Grid,Typography,  Toolbar
} from '@material-ui/core'


const ScannersChangePercentRank = () => {

    const [ScannersChangePercentRank, setScannersChangePercentRank] = useState<any[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/ScannersChangePercentRank'); //57064
            const data = await response.json();
            setScannersChangePercentRank(Object.entries(data));
            console.log(data);
        };
        fetchPosts();
    }, []);


    return (
        <>
            <TableContainer style={{ maxHeight: "660px" }}>
                <Table size="small" stickyHeader>
                    <TableHead >
                        <TableRow>
                            <TableCell>名</TableCell>
                            <TableCell>收</TableCell>
                            <TableCell>幅</TableCell>
                            <TableCell>乖</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ScannersChangePercentRank.map((i) => (
                            <TableRow >
                                <TableCell >{i[1][0]}</TableCell>
                                <TableCell >{i[1][2]}</TableCell>
                                <TableCell >{i[1][3]}</TableCell>
                                <TableCell >{Math.round(100 * i[1][5])}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
export default ScannersChangePercentRank