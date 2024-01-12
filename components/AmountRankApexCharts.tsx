import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Typography } from '@material-ui/core'
import { Height } from '@mui/icons-material';

const AmountRankApexCharts: React.FC = () => {

  const options: ApexOptions = {
    chart: { type: 'candlestick' }, xaxis: { type: 'category' },
    plotOptions: { candlestick: { colors: { upward: 'red', downward: 'green' } } }
  };

  const [AmountRank, setAmountRank] = useState<any[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:57064/api/ScannersAmountRank'); //57064  9033
      const data = await response.json();
      setAmountRank(data); console.log(data);
    };
    fetchPosts();
  }, []);

  var AmountSum = Object.values(AmountRank).reduce((accumulator, currentValue) => accumulator + currentValue[currentValue.length - 1], 0);
  const series = [{ data: Object.entries(AmountRank).map(([key, value]) => ({ x: key, y: value })), },];

  return (
    <div>
      <Typography variant="subtitle2" align='center' color='primary' noWrap >Top 20 Trading Amt Total {AmountSum / 10} Billion</Typography>
      <Chart options={options} series={series} type="candlestick" height={200}/>
    </div>
  );
};
export default AmountRankApexCharts;