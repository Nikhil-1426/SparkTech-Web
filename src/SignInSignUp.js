// src/SignInSignUp.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from './firebase';
import './SignInSignUp.css';
import logo from './assets/logo.png';

function SignInSignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const auth = getAuth();
    
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        // Sign up user
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign in user
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/landing'); // Redirect to the landing page after successful login/signup
    } catch (error) {
      setError(error.message); // Handle errors (e.g., invalid email/password)
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Government Logo" style={{ width: '70px', height: '80px' }} />
          <h1>Government of Delhi</h1>
        </div>
      </header>
      <main className="main-content">
        <section className="form-section">
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {isSignUp && (
              <label>
                Confirm Password:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
            )}
            <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <p>
            {isSignUp ? 'Already have an account ?' : 'Don’t have an account ?'}
            <button 
            className="toggle-button"
            onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </section>
      </main>
      <footer className="footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default SignInSignUp;



