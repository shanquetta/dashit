import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🚀 DashIT</Link>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <ul className={`nav-links ${open ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
        <li><Link to="/dashboards" onClick={() => setOpen(false)}>Dashboards</Link></li>
        <li><Link to="/insights" onClick={() => setOpen(false)}>AI Insights</Link></li>
        <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
