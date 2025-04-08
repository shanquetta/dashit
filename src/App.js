import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Dashboards from './pages/Dashboards';
import Insights from './pages/Insights';
import Login from './pages/Login';
import CreateDashboard from './pages/CreateDashboard';
import EditDashboard from './pages/EditDashboard';

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar now shown on ALL pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboards" element={<Dashboards />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboards/create" element={<CreateDashboard />} />
        <Route path="/dashboards/edit/:id" element={<EditDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
