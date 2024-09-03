import React from 'react';
import './ContactUs.css';
import logo from './assets/logo.png';

function ContactUs() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-logo">
          <img src={logo} alt="Government Logo" style={{ width: '70px', height: '60px' }} />
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

      <main className="App-main">
        {/* Contact Container with Intro and Form */}
        <div className="contact-container">
          <div className="contact-intro">
            <h2>Contact Us</h2>
            <p>Welcome to our contact page! Feel free to reach out to us using the form below.</p>
          </div>
          
          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
              
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
              
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4" required></textarea>
              
              <button type="submit" className="submit-button">Submit</button>
            </form>
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

export default ContactUs;
