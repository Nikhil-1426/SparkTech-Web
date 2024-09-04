import React from 'react';
import { signOut } from 'firebase/auth'; // Import signOut
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from './firebase'; // Import your Firebase auth instance
import './Services.css';

function Services() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to the sign-in/sign-up page after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="services-page">
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
            <li>
              <button className="sign-out-link" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="services-main">
        <section className="services-banner">
          <h2>Services</h2>
          <p>Our website provides</p>
        </section>

        <section className="services-content">
          <div className="service-box">
            <h3>Data Visualization :</h3>
            <p>Our platform offers intuitive data visualization tools that transform complex electricity load data into clear, actionable insights. Interactive charts and heat maps reveal load variations influenced by weather, holidays, and urban growth, enabling informed decisions for optimized power management and enhanced grid stability.</p>
          </div>

          <div className="service-box">
            <h3>Data Prediction Models :</h3>
            <p>Our AI-powered prediction models forecast electricity demand with precision, analyzing historical data alongside weather, holidays, and urban development. These insights help you anticipate peaks, optimize power procurement, and ensure reliable energy management, keeping you ahead of demand fluctuations.</p>
          </div>

          <div className="service-box">
            <h3>Multi-Graph Analysis :</h3>
            <p>Our multi-graph analysis tools enable side-by-side comparisons of key variables like load, temperature, and solar generation. This comprehensive approach uncovers critical correlations, helping you address challenges like the Duck-curve effect and make data-driven decisions for efficient energy management.</p>
          </div>
        </section>
      </main>

      <footer className="services-footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default Services;
