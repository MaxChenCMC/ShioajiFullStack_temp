import React, { useState, useEffect } from 'react'
import {
    Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
    // Paper, Card, AppBar, Tab, Grid,Typography,  Toolbar
} from '@material-ui/core'

interface ScannerEntry {
    [key: string]: [string, number, number, number, number, number];
}

const ScannersChangePercentRank: React.FC = () => {

    const [ScannersChangePercentRank, setScannersChangePercentRank] = useState<ScannerEntry[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/ScannersChangePercentRank'); //57064
            const data = await response.json();

            const dataArray: ScannerEntry[] = Object.entries(data).map(([key, value]) => ({
                [key]: value as [string, number, number, number, number, number],
            }));

            dataArray.sort((a, b) => b[Object.keys(b)[0]][2] - a[Object.keys(a)[0]][2]);
            setScannersChangePercentRank(dataArray);
            console.table(dataArray);
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
                        {ScannersChangePercentRank.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell >{Object.keys(entry)[0]}</TableCell>
                                <TableCell >{entry[Object.keys(entry)[0]][2]}</TableCell>
                                <TableCell >{entry[Object.keys(entry)[0]][3]}</TableCell>
                                <TableCell >{Math.round(100 * entry[Object.keys(entry)[0]][5])}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
export default ScannersChangePercentRank
