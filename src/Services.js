import React from 'react';
import './Services.css';
// import logo from './assets/logo.png'; // Commented out the logo import

function Services() {
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
              <button className="sign-out-link">
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="App-main">
        <section className="services-intro">
          <h2>Our Services</h2>
          <p>Explore the range of services provided by the Government of Delhi.</p>
        </section>

        <section className="services-list">
          <article className="service">
            <h3>Service 1</h3>
            <p>Description of Service 1. This service includes various government programs and initiatives aimed at improving public welfare.</p>
          </article>

          <article className="service">
            <h3>Service 2</h3>
            <p>Description of Service 2. Details about how citizens can benefit from this service, including eligibility criteria and application processes.</p>
          </article>

          <article className="service">
            <h3>Service 3</h3>
            <p>Description of Service 3. Information on the resources and support provided by the government under this service.</p>
          </article>
        </section>
      </main>

      <footer className="App-footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default Services;
