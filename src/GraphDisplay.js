// src/GraphDisplay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GraphDisplay() {
  const [graphImage, setGraphImage] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const fetchGraph = async () => {
    try {
      const response = await axios.get('http://localhost:5000/graph', { responseType: 'blob' });
      const imageUrl = URL.createObjectURL(response.data);
      setGraphImage(imageUrl);
    } catch (error) {
      console.error('Error fetching graph:', error);
    }
  };

  const analyzeGraph = async () => {
    try {
      const response = await axios.post('http://localhost:5000/analyze-graph', {});
      setAnalysisResult(response.data.analysis);
    } catch (error) {
      console.error('Error analyzing graph:', error);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, []);

  return (
        <div style={{ padding: '20px' }}>
          <h1>House Price Prediction</h1>
          {graphImage && (
            <div style={{ marginTop: '20px' }}>
              <h3>Dataset Graph</h3>
              <img src={graphImage} alt="Dataset Graph" style={{ maxWidth: '100%' }} />
            </div>
          )}
          <button onClick={analyzeGraph} style={{ marginTop: '20px' }}>Analyze Graph</button>
          {analysisResult && (
            <div style={{ marginTop: '20px' }}>
              <h3>Analysis Result</h3>
              <p>{analysisResult}</p>
            </div>
          )}
        </div>
      );
    }

export default GraphDisplay;
