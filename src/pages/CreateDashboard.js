// ✅ Always at the top of the file
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import html2pdf from 'html2pdf.js';
import Papa from 'papaparse';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const CreateDashboard = () => {
  const [dashboardName, setDashboardName] = useState('Interactive Dashboard');
  const [widgets, setWidgets] = useState([]);

  const handleAddWidget = (type) => {
    const newWidget = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'Edit this text' : type === 'kpi' ? '12345' : null
    };
    setWidgets([...widgets, newWidget]);
  };

  const handleDelete = (id) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const handleChange = (id, value) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, content: value } : w));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(widgets);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setWidgets(items);
  };

  
// Add inside CreateDashboard component

const exportCSV = () => {
  const csv = Papa.unparse(widgets.map(w => ({
    type: w.type,
    content: w.content || '',
  })));
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${dashboardName || 'dashboard'}.csv`;
  link.click();
};

const exportPDF = () => {
  const element = document.getElementById('dashboard-canvas');
  html2pdf().from(element).save(`${dashboardName || 'dashboard'}.pdf`);
};

const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Revenue',
      data: [1200, 1900, 3000, 2500, 2100],
      backgroundColor: '#6366f1',
    }],
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🧩 Dashboard Builder</h1>

      <input
        className="w-full p-2 mb-4 border rounded-lg text-xl font-medium"
        value={dashboardName}
        onChange={(e) => setDashboardName(e.target.value)}
      />

      <div className="mb-6 flex gap-3">
        <button onClick={() => handleAddWidget('text')} className="bg-blue-500 text-white px-4 py-2 rounded shadow">➕ Text</button>
        <button onClick={() => handleAddWidget('kpi')} className="bg-green-500 text-white px-4 py-2 rounded shadow">➕ KPI</button>
        <button onClick={() => handleAddWidget('chart')} className="bg-purple-500 text-white px-4 py-2 rounded shadow">➕ Chart</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="canvas">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
              {widgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided) => (
                    <div
                      className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 uppercase">{widget.type}</p>
                        <button onClick={() => handleDelete(widget.id)} className="text-red-500 hover:underline text-sm">Delete</button>
                      </div>

                      {widget.type === 'text' && (
                        <textarea
                          className="w-full border rounded p-2"
                          value={widget.content}
                          onChange={(e) => handleChange(widget.id, e.target.value)}
                        />
                      )}

                      {widget.type === 'kpi' && (
                        <input
                          type="text"
                          className="text-2xl font-bold text-green-600 p-2 border rounded w-full"
                          value={widget.content}
                          onChange={(e) => handleChange(widget.id, e.target.value)}
                        />
                      )}

                      {widget.type === 'chart' && (
                        <div className="h-64">
                          <Bar data={chartData} />
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      
<div className="mt-6 flex gap-3">
  <button onClick={exportCSV} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">⬇ Export CSV</button>
  <button onClick={exportPDF} className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-800">📄 Export PDF</button>
</div>

</DragDropContext>
    </div>
  );
};

export default CreateDashboard;