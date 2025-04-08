const chartTypes = ['bar', 'line', 'pie', 'doughnut'];

const ChartTypeSelector = ({ chartType, setChartType }) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">Chart Type</label>
    <div className="flex gap-4">
      {chartTypes.map((type) => (
        <button
          key={type}
          onClick={() => setChartType(type)}
          className={`px-4 py-2 border rounded ${
            chartType === type ? 'bg-blue-100' : ''
          }`}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  </div>
);

export default ChartTypeSelector;
