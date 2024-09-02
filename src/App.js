import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSignUp from './SignInSignUp'; // Import your sign-in/sign-up component
import LandingPage from './LandingPage';
import Services from './Services'; // Import the Services component
import AboutUs from './AboutUs';
import ContactUs from './ContactUs'; // Import the ContactUs component
import Dashboard from './Dashboard'; //Import the Dashboard component
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
        <Route path="/contact-us" element={<ContactUs />} />  {/* Contact Us page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
      </Routes>
    </Router>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [graphImage, setGraphImage] = useState('');
//   const [analysisResult, setAnalysisResult] = useState('');

//   const fetchGraph = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/graph', { responseType: 'blob' });
//       const imageUrl = URL.createObjectURL(response.data);
//       setGraphImage(imageUrl);
//     } catch (error) {
//       console.error('Error fetching graph:', error);
//     }
//   };

  // const analyzeGraph = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/analyze-graph', {});
  //     setAnalysisResult(response.data.analysis);
  //   } catch (error) {
  //     console.error('Error analyzing graph:', error);
  //   }
  // };

//   useEffect(() => {
//     fetchGraph(); // Fetch the graph image on component mount
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>House Price Prediction</h1>
//       {graphImage && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>Dataset Graph</h3>
//           <img src={graphImage} alt="Dataset Graph" style={{ maxWidth: '100%' }} />
//         </div>
//       )}
//       <button onClick={analyzeGraph} style={{ marginTop: '20px' }}>Analyze Graph</button>
//       {analysisResult && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>Analysis Result</h3>
//           <p>{analysisResult}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



