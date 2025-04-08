import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const WIDGET_TYPES = {
  TEXT: 'text',
  KPI: 'kpi',
};

const DraggableWidget = ({ type, label }) => {
  const [, drag] = useDrag(() => ({
    type: 'WIDGET',
    item: { type },
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '0.5rem',
        border: '1px dashed #999',
        margin: '0.5rem 0',
        cursor: 'grab',
      }}
    >
      {label}
    </div>
  );
};

const WidgetPalette = () => {
  return (
    <div style={{ borderRight: '1px solid #ccc', paddingRight: '1rem' }}>
      <h3>📦 Widgets</h3>
      <DraggableWidget type={WIDGET_TYPES.TEXT} label="Text Box" />
      <DraggableWidget type={WIDGET_TYPES.KPI} label="KPI Widget" />
    </div>
  );
};

const DashboardCanvas = ({ widgets, addWidget }) => {
  const [, drop] = useDrop(() => ({
    accept: 'WIDGET',
    drop: (item) => addWidget(item.type),
  }));

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        minHeight: '300px',
        border: '2px dashed #ccc',
        padding: '1rem',
        backgroundColor: '#f9fafb',
      }}
    >
      <h3>🧠 Drag Widgets Here</h3>
      {widgets.map((w, idx) => (
        <div
          key={idx}
          style={{
            padding: '1rem',
            background: '#fff',
            marginBottom: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          {w.type === WIDGET_TYPES.TEXT && <p>This is a text widget.</p>}
          {w.type === WIDGET_TYPES.KPI && <h2>📈 1234</h2>}
        </div>
      ))}
    </div>
  );
};

const CreateDashboard = ({ initialName = '', initialWidgets = [], editId = null }) => {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [dashboardName, setDashboardName] = useState(initialName);

  const templates = {
    'Marketing Overview': {
      widgets: [{ type: 'text' }, { type: 'kpi' }],
      thumbnail: 'https://via.placeholder.com/120x60?text=Marketing',
    },
    'Sales Performance': {
      widgets: [{ type: 'kpi' }, { type: 'kpi' }],
      thumbnail: 'https://via.placeholder.com/120x60?text=Sales',
    },
  };

  const addWidget = (type) => {
    setWidgets([...widgets, { type }]);
  };

  const handleSave = () => {
    if (!dashboardName.trim()) {
      alert('Please enter a dashboard name');
      return;
    }

    const newDashboard = {
      id: editId || Date.now(),
      name: dashboardName,
      widgets,
    };

    let saved = JSON.parse(localStorage.getItem('dashboards') || '[]');

    if (editId) {
      saved = saved.map((d) => (d.id === editId ? newDashboard : d));
    } else {
      saved.push(newDashboard);
    }

    localStorage.setItem('dashboards', JSON.stringify(saved));

    alert(`✅ Dashboard "${dashboardName}" saved!`);

    setDashboardName('');
    setWidgets([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '2rem' }}>
        <h2>Create a New Dashboard</h2>

        {/* Template Dropdown */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="template-select">📁 Choose Template: </label>
          <select
            id="template-select"
            onChange={(e) => {
              const selected = templates[e.target.value];
              if (selected) {
                setWidgets(selected.widgets);
                setDashboardName(e.target.value);
              }
            }}
          >
            <option value="">-- Select Template --</option>
            {Object.keys(templates).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {/* Template Thumbnails */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {Object.entries(templates).map(([name, data]) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <img
                  src={data.thumbnail}
                  alt={name}
                  style={{ width: '120px', height: '60px', border: '1px solid #ccc' }}
                />
                <div style={{ fontSize: '0.8rem' }}>{name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Name + Save */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            placeholder="Enter dashboard name"
            style={{ padding: '0.5rem', fontSize: '1rem', flex: '1' }}
          />
          <button onClick={handleSave} style={{ padding: '0.5rem 1rem' }}>
            Save Dashboard
          </button>
        </div>

        {/* Builder */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          <WidgetPalette />
          <DashboardCanvas widgets={widgets} addWidget={addWidget} />
        </div>
      </div>
    </DndProvider>
  );
};

export default CreateDashboard;
