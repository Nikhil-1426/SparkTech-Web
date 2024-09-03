import React from 'react';
import './AboutUs.css';
// import logo from './assets/logo.png'; // Comment out the logo import

function AboutUs() {
  return (
    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        <div className="header-logo">
          {/* <img src={logo} alt="Government Logo" /> */} {/* Comment out the logo image */}
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
              <button className="sign-out-link">Sign Out</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="App-main">
        <div className="about-container">
          {/* Intro Section */}
          <section className="about-intro">
            <h2>About Us</h2>
            <p>Learn more about the Government of Delhi and its mission to serve the public.</p>
          </section>

          {/* Details Section */}
          <section className="about-details">
            <article className="about-section">
              <h3>Our Mission</h3>
              <p>Our mission is to deliver effective governance and provide high-quality services to the citizens of Delhi. We strive to ensure transparency, accountability, and accessibility in all our initiatives.</p>
            </article>

            <article className="about-section">
              <h3>Our Vision</h3>
              <p>We envision a thriving and sustainable Delhi where every citizen has access to essential services and opportunities for growth. Our vision focuses on urban development, public welfare, and environmental sustainability.</p>
            </article>

            <article className="about-section">
              <h3>Contact Information</h3>
              <p>For any inquiries or support, please reach out to us at:</p>
              <p>Email: contact@govdelhi.in</p>
              <p>Phone: +91-123-456-7890</p>
            </article>
          </section>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="App-footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default AboutUs;
