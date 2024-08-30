// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSignUp from './SignInSignUp'; // Import your sign-in/sign-up component
import LandingPage from './LandingPage';
import './App.css';
import './firebase'; // Import your landing page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSignUp />} />  {/* Signup/Signin page */}
        <Route path="/landing" element={<LandingPage />} />  {/* Landing page */}
      </Routes>
    </Router>
  );
}

export default App;



