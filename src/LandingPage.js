import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './App.css';
import './LandingPage.css';
// import logo from './assets/logo.png';

function LandingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to the sign-in/sign-up page after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-logo">
          {/* <img src={logo} alt="Government Logo" style={{ width: '70px', height: '60px' }} /> */}
          <h1>Government of Delhi</h1>
        </div>
        <nav className="App-nav">
          <ul>
            <li><a href="/landing">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact-us">Contact</a></li>
            <li>
              <button className="sign-out-link" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
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
            <li><a href="/graph1">Graph 1</a></li>
            <li><a href="/graph2">Graph 2</a></li>
          </ul>
        </aside>
      )}

      <main className="App-main">
        <section className="hero">
          <h2>Welcome to the Official Government Portal of Delhi</h2>
          <p>Your gateway to information, services, and updates from the Government of Delhi.</p>
          <button className="cta-button">Learn More</button>
        </section>

        <section className="info-section">
          <h3>Latest Updates</h3>
          <ul>
            <li>Update 1: Details about power load management initiatives.</li>
            <li>Update 2: New policies introduced for sustainable urban development.</li>
            <li>Update 3: Upcoming events and public consultations.</li>
          </ul>
        </section>
      </main>

      <footer className="App-footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default LandingPage;