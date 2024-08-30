import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSignUp from './SignInSignUp'; // Import your sign-in/sign-up component
import LandingPage from './LandingPage';
import Services from './Services'; // Import the Services component
import AboutUs from './AboutUs';
import './App.css';
import './firebase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSignUp />} />  {/* Signup/Signin page */}
        <Route path="/landing" element={<LandingPage />} />  {/* Landing page */}
        <Route path="/services" element={<Services />} />  {/* Services page */}
        <Route path="/about-us" element={<AboutUs />} />  {/* About Us page */}
      </Routes>
    </Router>
  );
}

export default App;



