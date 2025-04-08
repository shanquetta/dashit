import React, { useEffect, useState } from 'react';

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

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Saved Dashboards</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={exportDashboards}>⬇️ Export Dashboards (.json)</button>
        <input type="file" accept=".json" onChange={importDashboards} style={{ marginLeft: '1rem' }} />
      </div>

      {dashboards.length === 0 ? (
        <p>No dashboards saved yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {dashboards.map((dash) => (
            <li
              key={dash.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '0.5rem',
              }}
            >
              <input
                type="text"
                value={dash.name}
                onChange={(e) => handleRename(dash.id, e.target.value)}
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  border: 'none',
                  backgroundColor: 'transparent',
                  marginBottom: '0.5rem',
                  width: '100%',
                }}
              />
              <p>🧩 {dash.widgets.length} widgets</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
                gap: '0.25rem',
                background: '#f4f4f4',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                marginBottom: '0.75rem'
                }}>
                {dash.widgets.map((w, i) => (
                    <div key={i} style={{
                    background: '#fff',
                    border: '1px solid #ddd',
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    padding: '0.25rem'
                    }}>
                    {w.type.toUpperCase()}
                    </div>
                ))}
                </div>
                <button onClick={() => window.location.href = `/dashboards/edit/${dash.id}`}>
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(dash.id)}>
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboards;
