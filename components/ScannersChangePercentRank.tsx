import React, { useState, useEffect } from 'react'
import {
    Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
} from '@material-ui/core'

interface ScannerEntry {
    [key: string]: [string, number, number, number, number, number];
}

const ScannersChangePercentRank: React.FC = () => {

    // 為了把fetch的資料排序，不能再無腦用 useState <any[]> ([]), 而需添一個interface
    const [ScannersChangePercentRank, setScannersChangePercentRank] = useState<ScannerEntry[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/ScannersChangePercentRank');
            const data = await response.json();

            const dataArray: ScannerEntry[] = Object.entries(data).map(([key, value]) => ({
                [key]: value as [string, number, number, number, number, number],
            }));
            dataArray.sort((a, b) => b[Object.keys(b)[0]][4] - a[Object.keys(a)[0]][4]);
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
                            <TableCell>symbol</TableCell>
                            <TableCell>close</TableCell>
                            <TableCell>chg%</TableCell>
                            <TableCell>bias</TableCell>
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