import { useQuery } from '@tanstack/react-query';
import 'chartjs-adapter-moment';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

//Registering ChartJS for it to function
ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  //Getting cases data using useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cases'],
    queryFn: async () => {
      const res = await fetch(
        'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
      );
      const data = await res.json();
      return data;
    },
  });

  //Loading component while data is being fetched
  if (isLoading)
    return (
      <h1 className="m-auto text-3xl font-bold uppercase h-[50vh] text-center">
        Loading...
      </h1>
    );
  //Error component if there was an error in data fetching
  if (isError)
    return (
      <h1 className="m-auto text-3xl font-bold uppercase h-[50vh] text-center">
        There is an Error. Please try again
      </h1>
    );

  const options = {
    radius: 0,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        //Changing the x-axis label to months
        type: 'time' as const,
        time: {
          unit: 'month' as const,
          tooltipFormat: 'DD/MM/YY',
        },
        ticks: {
          color: 'black',
        },
      },
      y: {
        //Changing y-axis label for more readablilty
        ticks: {
          beginAtZero: true,
          callback: (value: any) => value / 1000000 + 'M',
          color: 'black',
        },
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      //Title of the chart
      title: {
        display: true,
        text: 'COVID-19 Cases',
      },
    },
  };

  //Assigning labels from data
  const labels = Object.keys(data.cases);
  const chartData = {
    labels,
    //Assigning the values from data
    datasets: [
      {
        label: 'Cases World-Wide',
        data: Object.values(data.cases),
        borderColor: 'blue',
        backgroundColor: 'blue',
      },
    ],
  };
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold">Covid Cases</h1>
      <div className="h-[50vh]">
        <Line options={options} data={chartData} />
      </div>
    </>
  );
};

export default Charts;
