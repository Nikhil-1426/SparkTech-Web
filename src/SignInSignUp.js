// src/SignInSignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase'; // Import the Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import './SignInSignUp.css';
import logo from './assets/logo3.jpg'; // Import logo image

function SignInSignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState(''); // New state for name
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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Add user data to Firestore
        await addDoc(collection(db, 'Sparks'), {
          name: name, // Add name field
          email: email,
          uid: userCredential.user.uid
        });

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
      <main className="main-content">
        <section className="background-box">
          <section className="background-shapes">
            <div className="shape shape1"></div>
            <div className="shape shape2"></div>
            <div className="shape shape3"></div>
            <div className="shape shape4"></div>
            <div className="shape shape5"></div>
            <div className="shape shape6"></div>
            <div className="shape shape7"></div>
            <div className="shape shape8"></div>
          </section>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <section className="form-section">
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <form className="form" onSubmit={handleSubmit}>
              {isSignUp && (
                <label>
                  Name:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isSignUp}
                  />
                </label>
              )}
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
              {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}
              <button
                className="toggle-button"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </section>
        </section>
      </main>
    </div>
  );
}

export default SignInSignUp;
