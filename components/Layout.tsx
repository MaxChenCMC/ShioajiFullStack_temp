import * as React from 'react';
import { Typography, Box, Paper, Grid, styled } from '@mui/material';

import AmountRankApexCharts from './AmountRankApexCharts';
import TicksLastCount from './TicksLastCount';
import OpPremium from './OpPremium';
import { BlueChips } from './BlueChips';
import TXFR1Charts from './TXFR1Charts';
import NavBar from './NavBar';

// two types of layout: containers and items.
// Item widths are set in percentages, so they're always fluid and sized relative to their parent element.支援padding
// RWD五個斷點 xs, sm, md, lg, and xl僅適用寬, 但不適用direction="column"，以< xs={12} sm={6} >為例  螢幕寬超過600px就Viewport 6 col寬，若比600px窄就12 col寬
// xs={12} sizes a component to occupy the full width of its parent container, regardless of the viewport size
// Responsive values is supported by:columns,columnSpacing,direction,rowSpacing,spacing

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const Layout = () => {
    return (
        <Grid container spacing={1} paddingTop={1} paddingLeft={1} paddingRight={1}>
            <NavBar/>
            {/* Grid有要細切就要container包item */}
            <Grid item xs={9}> {/* 橫K垂直區 */}

                <Grid container spacing={1}>
                    <Grid item xs={12} >  {/* 橫K區 */}
                        <AmountRankApexCharts />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={7.5} > {/* 1分K + 逐筆 + 選擇權區*/}

                        <Grid container spacing={0}>
                            <Grid item xs={8.5}>  {/*1分K*/}
                                <TXFR1Charts/>
                            </Grid>
                            <Grid item xs={3.5}>  {/*逐筆 */}
                                <TicksLastCount />
                            </Grid>
                            <Grid item xs={12} > {/*選擇權區 */}
                                <OpPremium/>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    <Grid item xs={4.5}>
                        <BlueChips/>  {/*藍籌股區 */}
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={3} ></Grid>
                </Grid>
            </Grid>

            {/* 有要細切就要用container再細分item，像這就外最層container的右item*/}
            <Grid item xs={3} spacing={1}> {/* 自選股垂直區 */}

                <Grid container spacing={1}>
                    <Grid item xs={12} >
                        <Paper style={{ height: 440, textAlign: 'center' }}>自選股1</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper style={{ height: 440, textAlign: 'center' }}>自選股2</Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Layout
