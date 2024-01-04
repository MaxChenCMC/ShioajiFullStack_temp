import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';


const CandlestickChart: React.FC = () => {

  const options: ApexOptions = {
    chart: { type: 'candlestick' }, xaxis: { type: 'category' },
    plotOptions: { candlestick: { colors: { upward: 'red', downward: 'green' } }}
  };


  const [AmountRank, setAmountRank] = useState<any[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:57064/api/AmountRank');
      const data = await response.json();
      setAmountRank(data);
      console.log(data);
    };
    fetchPosts();
  }, []);

  const series = [
    {
      data: Object.entries(AmountRank).map(([key, value]) => ({ x: key, y: value })),
    },
  ];

  return (
    <Chart options={options} series={series} type="candlestick" width={1000} height={300} />
  );
};

export default CandlestickChart;
