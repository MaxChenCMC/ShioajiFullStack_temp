import React, { useState, useEffect } from 'react'
import {
    // makeStyles, Grid, Box, TableContainer, Paper,
    // Card, AppBar, Tab, Toolbar,
    Typography, TableBody, TableRow, TableCell, Table, TableHead,
} from '@material-ui/core'

interface _OpPremium { strike: string[]; premium: number[]; }
interface _Margin { Margin: number[]; ListPositions: string | number[]; }

export const OpPremium = () => {

    const [OpPremium, setOpPremium] = useState<_OpPremium>({ strike: [], premium: [] });
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/Snapshots_OpPremium');  // 57064
            const data = await response.json();
            setOpPremium(data);
        };
        fetchPosts();
    }, []);

    const [MarginListPositions, setMarginListPositions] = useState<_Margin>({ Margin: [], ListPositions: [] });
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/MarginListPositions');  // 57064
            const data = await response.json();
            setMarginListPositions(data);
        };
        fetchPosts();
    }, []);

    return (
        <>
            <Typography variant="subtitle2" align='center' color='primary' noWrap >選擇權區</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ textAlign: 'center' }} colSpan={2}>Vertical Spread<br />BCSC</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >Parity +/- Strike</TableCell>
                        <TableCell style={{ textAlign: 'center' }} colSpan={2}>Vertical Spread<br />BPSP</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >商品：成本<br />權益數、可出金</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={2} style={{ textAlign: 'center' }} >{OpPremium.premium[0] - OpPremium.premium[1]}</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium.premium[1]}</TableCell> {/* SC */}
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium.strike[1]}</TableCell>  {/* upper strike */}
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium.premium[2]}</TableCell> {/* BP */}
                        <TableCell rowSpan={2} style={{ textAlign: 'center' }} >{OpPremium.premium[2] - OpPremium.premium[3]}</TableCell>
                        <TableCell style={{ textAlign: 'center' }} >
                            {MarginListPositions.ListPositions[0]}：{MarginListPositions.ListPositions[1]}<br />
                            {MarginListPositions.ListPositions[2]}：{MarginListPositions.ListPositions[3]}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium.premium[0]}</TableCell> {/* BC */}
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium.strike[0]}</TableCell>  {/* lower strike */}
                        <TableCell style={{ textAlign: 'center' }} >{OpPremium.premium[3]}</TableCell> {/* SP */}
                        <TableCell style={{ textAlign: 'center' }} >{MarginListPositions.Margin[0]}、{MarginListPositions.Margin[1]}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}
export default OpPremium