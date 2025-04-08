import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CreateDashboard from './CreateDashboard';

const EditDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dashboards') || '[]');
    const found = saved.find((d) => d.id === parseInt(id));
    if (!found) {
      alert('Dashboard not found');
      return navigate('/dashboards');
    }
    setDashboard(found);
  }, [id, navigate]);

  if (!dashboard) return null;

  return (
    <CreateDashboard
      initialName={dashboard.name}
      initialWidgets={dashboard.widgets}
      editId={dashboard.id}
    />
  );
};

export default EditDashboard;
