import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import NavBar from './NavBar';


const gpt = () => {
    return (
        <Grid container direction="column" spacing={2}>
            <NavBar/>
            <Grid item container spacing={2}>
                {/* Grid的height調了會看不出來，調paper的height才有影響可見；若這裡height調300(比B區300+100+200少)，那D區不會被遮到，仍會擠出第一個Grid(即ABC)區之外，但若調成700那D區就會再下移*/}
                <Grid item style={{width:900, height:700}}>
                    <Paper style={{height:350}}>Part A</Paper>
                </Grid>

                <Grid item style={{width:400}} >
                    <Paper style={{height:300}}>Part B</Paper>
                    <Paper style={{height:100}}>Part B</Paper>
                    <Paper style={{height:200}}>Part B</Paper>
                </Grid>

                <Grid item style={{width:900, height:700}}>
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
