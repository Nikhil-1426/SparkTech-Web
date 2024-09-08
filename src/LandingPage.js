import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './App.css';
import './LandingPage.css';

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
          <a href="https://delhi.gov.in/" target="_blank" rel="noopener noreferrer" className="cta-button">
            Learn More
          </a>
        </section>

        <h3 class="left-align">About The Project</h3>
        <p class="left-align"> The Government of Delhi is committed to ensuring the efficient and reliable management of power resources to meet the dynamic and ever-growing energy demands of the National Capital Territory (NCT). In pursuit of this objective, this project leverages state-of-the-art technologies to forecast power consumption patterns and optimize electricity distribution across the region.</p> 
        <p class="left-align"> The Government of Delhi is committed to ensuring the efficient and reliable management of power resources to meet the dynamic and ever-growing energy demands of the National Capital Territory (NCT). In pursuit of this objective, this project leverages state-of-the-art technologies to forecast power consumption patterns and optimize electricity distribution across the region.</p> 
        <p class="left-align"> Recognizing the unique challenges posed by Delhi’s highly variable power demand—ranging from significant seasonal fluctuations to daily peak and off-peak loads—this project employs advanced machine learning models to analyze critical weather parameters such as temperature, humidity, wind speed, and precipitation. These variables are known to have a direct impact on electricity consumption, and through precise data analysis, the system generates accurate forecasts to predict power demand for all 11 districts of Delhi. By doing so, it helps bridge the gap between power supply and consumption, enabling informed decision-making for energy procurement and distribution.</p> 
        <p class="left-align"> The project’s interactive portal provides a user-friendly interface for real-time data visualization, offering insights into power consumption trends and detailed analysis of the relationship between weather conditions and electricity usage. The system also allows for historical comparisons and future projections, empowering authorities to better understand the factors influencing power demand and take proactive measures to ensure grid stability. This initiative is aligned with the Government’s vision of sustainable energy management and supports the broader objective of transitioning towards a more resilient and environmentally responsible energy infrastructure.</p>
        <p class="left-align"> With an emphasis on scalability, the project is designed to evolve alongside Delhi's rapid urban expansion and increasing energy requirements, ensuring that the capital remains at the forefront of innovation in power management. Through this innovative approach, we aim to deliver a comprehensive solution that not only enhances operational efficiency but also contributes to the Government of Delhi’s commitment to providing uninterrupted, affordable, and sustainable power to its citizens.</p>
      </main>

      <footer className="App-footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default LandingPage;

