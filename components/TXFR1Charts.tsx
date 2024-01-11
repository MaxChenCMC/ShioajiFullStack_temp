import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Typography } from '@material-ui/core'

const TXFR1Charts: React.FC = () => {

    const options: ApexOptions = {
        chart: { type: 'candlestick' },
        xaxis: { type: 'datetime' },
        plotOptions: { candlestick: { colors: { upward: 'red', downward: 'green' } } }
    };

    const [TXFR1Charts, setTXFR1Charts] = useState<any[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/Kbars_Chart'); //57064
            const data = await response.json();
            setTXFR1Charts(data);
            console.log(data);
        };
        fetchPosts();
    }, []);

    const series = [{ data: Object.entries(TXFR1Charts).map(([key, value]) => ({ x: key, y: value })) }];

    return (
        <div>
            <Typography variant="subtitle2" align='center' color='primary' noWrap >台指期全日盤1分K</Typography>
            <Chart options={options} series={series} type="candlestick" height={373} />
        </div>
    );
};
export default TXFR1Charts;
