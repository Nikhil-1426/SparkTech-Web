

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
import './LandingPage.css';

function Graph1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [graphImage, setGraphImage] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [timeRange, setTimeRange] = useState('Day');
  const [district, setDistrict] = useState('All Districts');
  const [districts] = useState([
    'All Districts', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi',
    'Central Delhi', 'New Delhi', 'North West Delhi', 'South West Delhi',
    'North East Delhi', 'Shahdara'
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchGraph = useCallback(async () => {
    try {
        const response = await axios.get(`http://localhost:5000/graph?timeRange=${timeRange}&district=${district}`, {
            responseType: 'blob'
        });
        
      const imageUrl = URL.createObjectURL(response.data);
      setGraphImage(imageUrl);
    } catch (error) {
      console.error('Error fetching graph:', error);
    }
  }, [timeRange, district]);

  const analyzeGraph = async () => {
    try {
      const response = await axios.post('http://localhost:5000/analyze-graph', {});
      setAnalysisResult(response.data.analysis);
    } catch (error) {
      console.error('Error analyzing graph:', error);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, [fetchGraph]);

  return (
    <div className="App">
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
        {/* Button to open the sidebar */}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="sidebar">
          <button className="close-sidebar" onClick={toggleSidebar}>×</button>
          <ul>
            <li><Link to="/graph1">Graph 1</Link></li>
            <li><Link to="/graph2">Graph 2</Link></li>
          </ul>
        </aside>
      )}

      <main className="App-main">
        <h2>Graph 1 Page</h2>
        <div className="graph-controls" style={{ marginBottom: '20px' }}>
          <label htmlFor="time-range">Time Range: </label>
          <select id="time-range" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>

          <label htmlFor="district" style={{ marginLeft: '20px' }}>District: </label>
          <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
            {districts.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>
        {graphImage && (
          <div style={{ marginTop: '20px' }}>
            <h3>Dataset Graph</h3>
            <img src={graphImage} alt="Dataset Graph" style={{ maxWidth: '100%' }} />
          </div>
        )}
        <button onClick={analyzeGraph} style={{ marginTop: '20px' }}>Analyze Graph</button>
        {analysisResult && (
          <div style={{ marginTop: '20px' }}>
            <h3>Analysis Result</h3>
            <p>{analysisResult}</p>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default Graph1;