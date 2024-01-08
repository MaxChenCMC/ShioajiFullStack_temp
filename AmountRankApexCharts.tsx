import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import {  Typography} from '@material-ui/core'

const AmountRankApexCharts: React.FC = () => {

  const options: ApexOptions = {
    chart: { type: 'candlestick' }, xaxis: { type: 'category' },
    plotOptions: { candlestick: { colors: { upward: 'red', downward: 'green' } } }
  };

  const [AmountRank, setAmountRank] = useState<any[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:57064/api/AmountRankCharts');
      const data = await response.json();
      setAmountRank(data);
      // 僅OHLC四個值的話有些K棒會畫錯，非得塞V(就算不是張數而是成交量)才畫對
      console.log(data);
    };
    fetchPosts();
  }, []);

  var AmountSum = Object.values(AmountRank).reduce((accumulator, currentValue) => accumulator + currentValue[currentValue.length - 1], 0);

  const series = [
    {
      data: Object.entries(AmountRank).map(([key, value]) => ({ x: key, y: value })),
    },
  ];

  return (
    <div>
      {/* <h1>{AmountSum}億</h1> */}
      {/* 中文股名要寬一點，若僅股號可再寬些 */}
      <Typography variant="subtitle2" align='center' color='primary' noWrap >Top20 Trading Amt Sum {AmountSum/10} Billion</Typography>
      <Chart options={options} series={series} type="candlestick" height={285} />
    </div>
  );
};

export default AmountRankApexCharts;
