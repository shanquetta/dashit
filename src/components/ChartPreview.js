import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

const ChartPreview = ({ type, data }) => {
  const chartProps = {
    data: {
      labels: data.map((_, i) => `Item ${i + 1}`),
      datasets: [
        {
          label: 'Example Values',
          data: data.map(() => Math.floor(Math.random() * 100)),
          backgroundColor: '#3b82f6',
        },
      ],
    },
  };

  const Chart = {
    bar: Bar,
    line: Line,
    pie: Pie,
    doughnut: Doughnut,
  }[type];

  return (
    <div className="mb-6 bg-white p-4 shadow rounded">
      <Chart {...chartProps} />
    </div>
  );
};

export default ChartPreview;
