import React from 'react';
import './HomePage.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">

      <header className="hero">
        <h1>Welcome to DashIT 🧠📊</h1>
        <p>The future of drag-and-drop dashboards, powered by AI.</p>
        <button onClick={() => navigate('/dashboards/create')}>Get Started</button>
      </header>

      <section className="features">
        <h2>Why DashIT?</h2>
        <ul>
          <li>✅ Real-time dashboard building</li>
          <li>🤖 AI-powered insights and predictions</li>
          <li>🔗 Seamless integrations (Slack, Zoom, Teams)</li>
          <li>☁️ 100% cloud — access anywhere</li>
        </ul>
      </section>

      <section className="cta">
        <h2>Ready to visualize your data?</h2>
        <button onClick={() => navigate('/dashboards/create')}>Build Your First Dashboard</button>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} DashIT. Built for insight.</p>
      </footer>
    </div>
  );
};

export default HomePage;
