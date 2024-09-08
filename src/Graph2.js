import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './LandingPage.css';
import './Graph1.css';
import './Graph2.css'; // Reuse the CSS for consistent styling
import temperatureLogo from './assets/temperature.jpg';
import humidityLogo from './assets/humidity.jpg';
import windspeedLogo from './assets/windspeed.jpg';

const Graph2 = () => {
  const [mainParameter, setMainParameter] = useState('Temperature');
  const [secondaryParameters, setSecondaryParameters] = useState(['Humidity', 'Windspeed', 'Precipitation']);
  const [timeRange, setTimeRange] = useState('Year');
  const [district, setDistrict] = useState('South Delhi');
  const [mainImageSrc, setMainImageSrc] = useState('');
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [logoSrcs, setLogoSrcs] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const districts = [
    'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi',
  'North East Delhi', 'North West Delhi', 'Shahadara', 
  'South Delhi', 'South East Delhi', 'South West Delhi', 
  'West Delhi'
  ];

  useEffect(() => {
    const updateImageSrcs = () => {
      const formattedDistrict = district.replace(/\s+/g, '').toLowerCase();
      const formattedTimeRange = timeRange.toLowerCase();
      const formattedMainParameter = mainParameter.toLowerCase();
      const mainImageName = `${formattedTimeRange}.png`;
      const mainImageUrl = `/images/${formattedDistrict}/${formattedMainParameter}/${mainImageName}`;
      setMainImageSrc(mainImageUrl);

      const updatedSecondaryImages = secondaryParameters.map(param => {
        const formattedParam = param.toLowerCase();
        return `/images/${formattedDistrict}/${formattedParam}/${mainImageName}`;
      });
      setSecondaryImages(updatedSecondaryImages);

      const updatedLogoSrcs = secondaryParameters.map(param => {
        const formattedParam = param.toLowerCase();
        switch (formattedParam) {
          case 'temperature':
            return temperatureLogo;
          case 'humidity':
            return humidityLogo;
          case 'windspeed':
            return windspeedLogo;
          case 'precipitation':
            return ''; // No logo needed for precipitation
          default:
            return ''; // Default path for other logos
        }
      });
      setLogoSrcs(updatedLogoSrcs);
    };

    updateImageSrcs();
  }, [mainParameter, secondaryParameters, timeRange, district]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleTimeRangeClick = (range) => {
    setTimeRange(range);
  };

  const handleGraphClick = (clickedParameter, index) => {
    setSecondaryParameters(prev => prev.map(param => param === clickedParameter ? mainParameter : param));
    setMainParameter(clickedParameter);

    // Move the clicked graph to the secondary graph
    const updatedSecondaryImages = [...secondaryImages];
    updatedSecondaryImages[index] = mainImageSrc;
    setSecondaryImages(updatedSecondaryImages);

    setMainImageSrc(secondaryImages[index]);
  };

  return (
    <div className="graph2-container">
      <header className="App-header">
        <div className="header-logo">
          <h1>Government of Delhi</h1>
        </div>
        <nav className="App-nav">
          <ul>
            <li><Link to="/landing">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
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

      <main className="main-content-graph2">
        <h2>Parameters' Graphs</h2>
        <div className="graph-container">
          <div className="timeframe-tabs-graph2">
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

          <div className="graph-controls-graph2">
            <label htmlFor="district">District : </label>
            <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
              {districts.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          <div className="graph2-layout">
            <div className="secondary-graphs-container-graph2">
              {secondaryImages.map((src, index) => (
                <div key={src} className="secondary-graph">
                  <img
                    src={src}
                    alt={`Secondary Graph ${secondaryParameters[index]}`}
                    onClick={() => handleGraphClick(secondaryParameters[index], index)}
                  />
                  <p className="parameter-label">{secondaryParameters[index]}</p> {/* Added class for centering */}
                </div>
              ))}
            </div>

            <div className="main-graph-container">
              <h3>Main Graph : {mainParameter}</h3>
              {mainImageSrc && (
                <>
                  <img src={mainImageSrc} alt="Main Graph" />
                  <p>{mainParameter}</p> {/* Added parameter name below the main graph */}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
};

export default Graph2;
