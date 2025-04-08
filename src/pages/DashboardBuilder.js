import React, { useState } from 'react';
import DataSourceSelector from '../components/DataSourceSelector';
import FilterBuilder from '../components/FilterBuilder';
import ChartTypeSelector from '../components/ChartTypeSelector';
import ChartPreview from '../components/ChartPreview';
import DataPreviewTable from '../components/DataPreviewTable';

const DashboardBuilder = () => {
  const [dataSource, setDataSource] = useState('incident');
  const [filters, setFilters] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [filteredData, setFilteredData] = useState([]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Create a Dashboard</h1>

      <DataSourceSelector value={dataSource} onChange={setDataSource} />

      <FilterBuilder filters={filters} setFilters={setFilters} />

      <ChartTypeSelector chartType={chartType} setChartType={setChartType} />

      <ChartPreview type={chartType} data={filteredData} />

      <DataPreviewTable data={filteredData} />
    </div>
  );
};

export default DashboardBuilder;
