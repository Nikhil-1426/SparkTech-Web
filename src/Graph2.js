import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './LandingPage.css';

const Graph2 = () => {
  const [mainParameter, setMainParameter] = useState('temperature');
  const [secondaryParameters, setSecondaryParameters] = useState(['humidity', 'windspeed', 'precipitation']);
  const [timeRange, setTimeRange] = useState('Day');
  const [district, setDistrict] = useState('South Delhi');
  const [mainImageSrc, setMainImageSrc] = useState('');
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // List of districts
  const districts = [
    'All Districts', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 
    'Central Delhi', 'North East Delhi', 'North West Delhi', 'South East Delhi', 
    'South West Delhi', 'New Delhi', 'Shahdara'
  ];

  // Function to update the main and secondary image sources
  useEffect(() => {
    const updateImageSrcs = () => {
      const formattedDistrict = district.replace(/\s+/g, '').toLowerCase();
      const formattedTimeRange = timeRange.toLowerCase();

      // Update main image
      const formattedMainParameter = mainParameter.toLowerCase();
      const mainImageName = `${formattedTimeRange}.png`;
      const mainImageUrl = `/images/${formattedDistrict}/${formattedMainParameter}/${mainImageName}`;
      setMainImageSrc(mainImageUrl);

      // Update secondary images
      const updatedSecondaryImages = secondaryParameters.map(param => {
        const formattedParam = param.toLowerCase();
        return `/images/${formattedDistrict}/${formattedParam}/${mainImageName}`;
      });
      setSecondaryImages(updatedSecondaryImages);
    };

    updateImageSrcs();
  }, [mainParameter, secondaryParameters, timeRange, district]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTimeRangeClick = (range) => {
    setTimeRange(range); // Update the timeRange state on button click
  };

  const handleGraphClick = (clickedParameter) => {
    setSecondaryParameters(
      secondaryParameters.map(param => (param === clickedParameter ? mainParameter : param))
    );
    setMainParameter(clickedParameter);
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

      <main className="App-main">
        <h2>Graph 2 Page</h2>
        <div className="controls">
          <select onChange={(e) => setDistrict(e.target.value)} value={district}>
            {districts.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
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
        </div>

        <div className="graphs-wrapper">
          <div className="main-graph-container">
            {mainImageSrc && (
              <img
                src={mainImageSrc}
                alt="Main Graph"
                style={{ width: '600px', height: '400px', objectFit: 'contain' }}
              />
            )}
          </div>

          <div className="secondary-graphs-container">
            {secondaryImages.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Graph ${secondaryParameters[index]}`}
                onClick={() => handleGraphClick(secondaryParameters[index])}
                style={{ width: '150px', height: '100px', objectFit: 'contain', cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
};

export default Graph2;
