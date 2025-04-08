import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Link to="/" className="logo">
        <span className="dash">Dash</span><span className="it">IT</span>
      </Link>

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
