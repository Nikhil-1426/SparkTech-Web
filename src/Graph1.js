import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
import './LandingPage.css';
import './Graph1.css';

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
    setIsSidebarOpen(prev => !prev);
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
    <div className="graph1-container">
      <header className="top-bar">
        <div className="header-logo">
          <h1>Government of Delhi</h1>
        </div>
        <nav className="nav-links">
          <a href="/landing">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/about-us">About Us</a>
          <a href="/services">Services</a>
          <a href="/contact-us">Contact</a>
        </nav>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar">
          <button className="close-sidebar" onClick={toggleSidebar}>×</button>
          <ul>
            <li><Link to="/graph1">Graph 1</Link></li>
            <li><Link to="/graph2">Graph 2</Link></li>
          </ul>
        </aside>
      )}

      <main className="main-content">
        <h2>Graph 1 Page</h2>
        <div className="graph-container">
          <div className="timeframe-tabs">
            <button className={timeRange === 'Day' ? 'active' : ''} onClick={() => setTimeRange('Day')}>Day</button>
            <button className={timeRange === 'Week' ? 'active' : ''} onClick={() => setTimeRange('Week')}>Week</button>
            <button className={timeRange === 'Month' ? 'active' : ''} onClick={() => setTimeRange('Month')}>Month</button>
            <button className={timeRange === 'Year' ? 'active' : ''} onClick={() => setTimeRange('Year')}>Year</button>
          </div>
          <div className="graph-controls">
            <label htmlFor="district">District: </label>
            <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
              {districts.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>
          <div className="graph-image-container">
            <h3>Dataset Graph</h3>
            {graphImage && <img src={graphImage} alt="Dataset Graph" />}
          </div>
        </div>
        <button onClick={analyzeGraph} className="analyze-button">Analyze Graph</button>
        {analysisResult && (
          <div className="analysis-container">
            <h3>Analysis Result</h3>
            <p>{analysisResult}</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default Graph1;




