import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './LandingPage.css';

const Graph2 = () => {
  const [parameter, setParameter] = useState('temperature');
  const [timeRange, setTimeRange] = useState('Day');
  const [district, setDistrict] = useState('South Delhi');
  const [imageSrc, setImageSrc] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // List of districts
  const districts = [
    'All Districts', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 
    'Central Delhi', 'North East Delhi', 'North West Delhi', 'South East Delhi', 
    'South West Delhi', 'New Delhi', 'Shahdara'
  ];

  // Function to update the image source based on selected options
  useEffect(() => {
    const updateImageSrc = () => {
      const formattedDistrict = district.replace(/\s+/g, '').toLowerCase();
      const formattedParameter = parameter.toLowerCase();
      const formattedTimeRange = timeRange.toLowerCase();
      
      const imageName = `${formattedTimeRange}.png`; // Ensure this uses the timeRange state
      const imageUrl = `/images/${formattedDistrict}/${formattedParameter}/${imageName}`;
      
      console.log(`Image Name: ${imageName}`);
      console.log(`Image URL: ${imageUrl}`);

      setImageSrc(imageUrl);
    };

    updateImageSrc();
  }, [parameter, timeRange, district]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTimeRangeClick = (range) => {
    setTimeRange(range); // Update the timeRange state on button click
  };

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
        <h2>Graph 2 Page</h2>
        <div className="controls">
          <select onChange={(e) => setParameter(e.target.value)} value={parameter}>
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="windspeed">Wind Speed</option>
            <option value="precipitation">Precipitation</option>
            {/* Add more options as needed */}
          </select>

          <div className="time-range-buttons">
            {['Day', 'Week', 'Month', 'Year'].map((range) => (
              <button
                key={range}
                className={timeRange === range ? 'active' : ''}
                onClick={() => handleTimeRangeClick(range)}
              >
                {range}
              </button>
            ))}
          </div>

          <select onChange={(e) => setDistrict(e.target.value)} value={district}>
            {districts.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>
        <div className="graph-container">
          {imageSrc && <img src={imageSrc} alt="Graph" style={{ width: '600px', height: '400px', objectFit: 'contain' }} />}
        </div>
      </main>

      <footer className="App-footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default Graph2;
