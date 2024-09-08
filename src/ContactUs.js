import React from 'react';
import { signOut } from 'firebase/auth'; // Correct import for Firebase v9 or later
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from './firebase'; // Ensure this file exports `auth` correctly
import './ContactUs.css'; // Import the CSS file
// import logo from './assets/logo.png'; // Import the logo image (commented out)

function ContactUs() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate('/'); // Redirect to the sign-in/sign-up page after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
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
      </header>

      <main className="App-main">
        <div className="contact-container">
          <div className="contact-intro">
            <h2 style={{ fontFamily: 'Roboto, sans-serif', letterSpacing: '1.42px', textTransform: 'uppercase'}}>Contact Us</h2>
            <p style={{ fontFamily: 'Roboto, sans-serif', letterSpacing: '0.7px'}}>Welcome to our contact page! Feel free to reach out to us using the form below.</p>
          </div>

          <div className="contact-form">
            <form>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4" required></textarea>

              <button type="submit" className="submit-button">Send the message</button>
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
