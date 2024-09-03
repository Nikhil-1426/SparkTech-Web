import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import logo from './assets/logo.png';

function TopBar() {
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

  return (
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
            <button className="sign-out-link" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default TopBar;