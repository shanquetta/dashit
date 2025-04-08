import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Dashboards = () => {
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('dashboards');
    if (stored) {
      setDashboards(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this dashboard?')) return;
    const updated = dashboards.filter((d) => d.id !== id);
    setDashboards(updated);
    localStorage.setItem('dashboards', JSON.stringify(updated));
  };

  const handleRename = (id, newName) => {
    const renamed = dashboards.map((d) =>
      d.id === id ? { ...d, name: newName } : d
    );
    setDashboards(renamed);
    localStorage.setItem('dashboards', JSON.stringify(renamed));
  };

  const exportDashboards = () => {
    const blob = new Blob([JSON.stringify(dashboards, null, 2)], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dashboards.json';
    link.click();
  };

  const importDashboards = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);

        if (!Array.isArray(imported) || !imported.every(d => Array.isArray(d.widgets))) {
          alert("❌ This file is not a valid dashboard export.");
          return;
        }

        const merged = [...dashboards, ...imported];
        setDashboards(merged);
        localStorage.setItem('dashboards', JSON.stringify(merged));
        alert(`✅ Imported ${imported.length} dashboards`);
      } catch (err) {
        alert('❌ Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const importCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const widgets = result.data.map((row) => ({
          type: row.type?.toLowerCase() || 'text',
        }));

        const newDashboard = {
          id: Date.now(),
          name: file.name.replace('.csv', ''),
          template: 'CSV Import',
          widgets,
        };

        const updated = [...dashboards, newDashboard];
        setDashboards(updated);
        localStorage.setItem('dashboards', JSON.stringify(updated));
        alert('✅ CSV imported as new dashboard');
      },
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2>📋 Saved Dashboards</h2>
        <button
          onClick={() => window.location.href = '/dashboards/create'}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          ➕ New Dashboard
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button onClick={exportDashboards}>⬇️ Export JSON</button>
        <label style={{ cursor: 'pointer' }}>
          📂 Import JSON
          <input type="file" accept=".json" onChange={importDashboards} style={{ display: 'none' }} />
        </label>
        <label style={{ cursor: 'pointer' }}>
          📄 Import CSV
          <input type="file" accept=".csv" onChange={importCSV} style={{ display: 'none' }} />
        </label>
      </div>

      {Array.isArray(dashboards) && dashboards.length === 0 ? (
        <p>No dashboards saved yet.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {Array.isArray(dashboards) && dashboards.map((dash) => {
            const safeWidgets = Array.isArray(dash.widgets) ? dash.widgets : [];

            return (
              <div
                key={dash.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '1rem',
                  padding: '1rem',
                  background: '#fff',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {dash.template && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: '#10b981',
                      background: '#ecfdf5',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '0.25rem',
                      marginBottom: '0.25rem',
                      display: 'inline-block',
                    }}
                  >
                    📁 {dash.template}
                  </span>
                )}

                <input
                  type="text"
                  value={dash.name}
                  onChange={(e) => handleRename(dash.id, e.target.value)}
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    border: 'none',
                    backgroundColor: 'transparent',
                    marginBottom: '0.5rem',
                  }}
                />

                <p>🧩 {safeWidgets.length} widgets</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
                  {safeWidgets.map((w, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        background: '#f3f4f6',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                      }}
                    >
                      {w.type.toUpperCase()}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => window.location.href = `/dashboards/edit/${dash.id}`}>✏️ Edit</button>
                  <button onClick={() => handleDelete(dash.id)}>🗑️ Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboards;