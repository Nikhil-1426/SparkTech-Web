import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './LandingPage.css';
import './DuckCurve.css';
import logo2 from './assets/duck_curve.png' ; // Add custom styles for DuckCurve if needed

function DuckCurve() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="duckcurve-container">
      <header className="App-header">
        <div className="header-logo">
          <h1>Government of Delhi</h1>
        </div>
        <nav className="App-nav">
          <ul>
            <li><a href="/landing">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact-us">Contact</a></li>
          </ul>
        </nav>
        <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar">
          <button className="close-sidebar" onClick={toggleSidebar}>×</button>
          <ul>
            <li><Link to="/graph1">Graph 1</Link></li>
            <li><Link to="/graph2">Graph 2</Link></li>
            <li><Link to="/duckcurve">Duck Curve</Link></li>
          </ul>
        </aside>
      )}

      <main className="main-content">
        <h2>The Duck Curve</h2>

        {/* Image of the duck curve */}
        <div className="image-container">
        <div className="image-wrapper">
        <img
        src={logo2} 
        alt="Duck Curve Graph"
        className="duck-curve-image"
        />
        </div>
        </div>

        {/* Explanation of the duck curve */}
        <div className="description-container">
          <h3>What is the Duck Curve?</h3>
          <p>
            The "duck curve" is a graph representing the difference between electricity
            demand and the amount of available solar energy throughout the day. It shows
            how energy production changes throughout the day, especially as more renewable
            energy, like solar, is integrated into the grid.
          </p>
          <p>
            As solar energy production increases in the afternoon and then sharply drops
            after sunset, demand for electricity spikes, creating a steep curve in the 
            late afternoon. This shape resembles a duck, hence the name. Managing this 
            steep increase in demand is a challenge for grid operators, especially with 
            the increasing adoption of renewable energy.
          </p>
        </div>
      </main>

      <footer className="footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default DuckCurve;
