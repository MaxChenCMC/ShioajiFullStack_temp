import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import NavBar from './NavBar';


const gpt = () => {
    return (
        <Grid container direction="column" spacing={2}>
            <NavBar/>
            {/* Upper Half */}
            <Grid item container>

                {/* Part A */}
                <Grid item xs={4}>
                    <Paper>Part A</Paper>
                </Grid>

                {/* Part B */}
                <Grid item xs={4}>
                    <Paper>Part B</Paper>
                    <Paper>Part B</Paper>
                    <Paper>Part B</Paper>
                </Grid>

                {/* Part C */}
                <Grid item xs={4}>
                    <Paper>Part C</Paper>
                </Grid>
            </Grid>



            {/* Lower Half */}
            <Grid item container direction="row">

                {/* Part E (with 9 cells) */}
                <Grid item xs={3}>
                    <Grid container direction="row" spacing={1}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell) => (
                            <Grid item xs={4} key={cell}>
                                <Paper>E{cell}</Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Part D */}
                <Grid item xs={3}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Paper>D1</Paper>
                        </Grid>
                        <Grid item>
                            <Paper>D2</Paper>
                        </Grid>
                        <Grid item>
                            <Paper>D3</Paper>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Part F */}
                <Grid item xs={3}>
                    <Paper>F</Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper>Part B</Paper>
                    <Paper>Part B</Paper>
                </Grid>

            </Grid>
        </Grid>
    );
}

export default gpt
