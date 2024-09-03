
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
import './LandingPage.css';

function Graph2() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mainGraphImage, setMainGraphImage] = useState('');
  const [smallGraphImages, setSmallGraphImages] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchGraphs = async () => {
    try {
      const [mainResponse, smallResponse] = await Promise.all([
        axios.get('http://localhost:5000/main-graph', { responseType: 'blob' }),
        axios.get('http://localhost:5000/small-graphs', { responseType: 'blob' })
      ]);
      const mainImageUrl = URL.createObjectURL(mainResponse.data);
      setMainGraphImage(mainImageUrl);

      const smallImagesUrls = smallResponse.data.map((blob, index) => 
        URL.createObjectURL(blob)
      );
      setSmallGraphImages(smallImagesUrls);
    } catch (error) {
      console.error('Error fetching graphs:', error);
    }
  };

  const handleSmallGraphClick = (imageUrl) => {
    setMainGraphImage(imageUrl);
  };

  useEffect(() => {
    fetchGraphs();
  }, []);

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
        <div className="graphs-container">
          <div className="main-graph-container">
            {mainGraphImage && (
              <img src={mainGraphImage} alt="Main Graph" style={{ maxWidth: '100%' }} />
            )}
          </div>
          <div className="small-graphs-container">
            {smallGraphImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Small Graph ${index + 1}`}
                onClick={() => handleSmallGraphClick(imageUrl)}
                style={{ cursor: 'pointer', width: '100px', height: '100px', margin: '5px' }}
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
}

export default Graph2;