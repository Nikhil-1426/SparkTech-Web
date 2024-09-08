// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import './App.css';
// import './LandingPage.css';
// import './Graph1.css';

// function Graph1() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [chartData, setChartData] = useState(null);
//   const [timeRange, setTimeRange] = useState('Day');
//   const [district, setDistrict] = useState('South Delhi');
//   const [districts] = useState([
//     'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi',
//   'North East Delhi', 'North West Delhi', 'Shahadara', 
//   'South Delhi', 'South East Delhi', 'South West Delhi', 
//   'West Delhi'
//   ]);

//   const filePath = "http://localhost:5000/get-excel-file"; // Make sure this endpoint is correctly set up

//   const toggleSidebar = () => {
//     setIsSidebarOpen(prev => !prev);
//   };

//   const excelDateToJSDate = (serial) => {
//     const date = new Date(Math.round((serial - 25569) * 86400 * 1000));
//     const formattedDate = date.toISOString().split('T')[0]; // Converts to YYYY-MM-DD format
//     return formattedDate;
//   };
  
//   const loadData = useCallback(async () => {
//     try {
//       const response = await axios.get(filePath, {
//         responseType: 'arraybuffer'
//       });
//       const data = response.data;
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

//       const selectedDistrict = district;
//       const powerConsumedKey = `Power Consumed (${selectedDistrict})`;
//       const predictedPowerKey = `Predicted Power (${selectedDistrict})`;

//       const totalEntries = worksheet.length;
//       const indices = Array.from({ length: totalEntries }, (_, i) => i + 1);

//       const powerConsumed = worksheet.map(entry => entry[powerConsumedKey]);
//       const predictedPower = worksheet.map(entry => entry[predictedPowerKey]);

//       const first80Indices = indices.slice(0, 576);
//       const last20Indices = indices.slice(576);
//       const first80PowerConsumed = powerConsumed.slice(0, 576);
//       const last20PowerConsumed = powerConsumed.slice(576);
//       const last20PredictedPower = predictedPower.slice(576);

//       setChartData({
//         labels: [...first80Indices, ...last20Indices], // Use indices as labels
//         datasets: [
//           {
//             label: 'Power Consumed (First 80%)',
//             data: [...first80PowerConsumed, ...Array(last20Indices.length).fill(null)], // Fill null for the last 20% to avoid plotting issues
//             borderColor: 'blue',
//             backgroundColor: 'rgba(0, 0, 255, 0.1)',
//             fill: true,
//             borderWidth: 2,
//             pointRadius: 0.8, // Medium-sized points
//             tension: 0.1
//           },
//           {
//             label: 'Power Consumed (Last 20%)',
//             data: [...Array(576).fill(null), ...last20PowerConsumed], // Fill null for the first 80% to avoid plotting issues
//             borderColor: 'green',
//             backgroundColor: 'rgba(0, 255, 0, 0.1)',
//             fill: true,
//             borderWidth: 2,
//             pointRadius: 0.8, // Medium-sized points
//             tension: 0.1
//           },
//           {
//             label: 'Predicted Power (Last 20%)',
//             data: [...Array(576).fill(null), ...last20PredictedPower], // Fill null for the first 80% to avoid plotting issues
//             borderColor: 'red',
//             backgroundColor: 'rgba(255, 0, 0, 0.1)',
//             fill: true,
//             borderDash: [5, 5],
//             borderWidth: 2,
//             pointRadius: 0.8, // Medium-sized points
//             tension: 0.1
//           }
//         ],
//       });
//     } catch (error) {
//       console.error('Error loading data:', error);
//     }
//   }, [district, filePath]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   return (
//     <div className="graph1-container">
//       <header className="App-header">
//         <div className="header-logo">
//           <h1>Government of Delhi</h1>
//         </div>
//         <nav className="App-nav">
//           <ul>
//             <li><a href="/landing">Home</a></li>
//             <li><a href="/dashboard">Dashboard</a></li>
//             <li><a href="/about-us">About Us</a></li>
//             <li><a href="/services">Services</a></li>
//             <li><a href="/contact-us">Contact</a></li>
//           </ul>        
//         </nav>
//         <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
//       </header>

//       {isSidebarOpen && (
//         <aside className="sidebar">
//           <button className="close-sidebar" onClick={toggleSidebar}>×</button>
//           <ul>
//             <li><Link to="/graph1">Graph 1</Link></li>
//             <li><Link to="/graph2">Graph 2</Link></li>
//             <li><Link to="/duckcurve">Duck Curve</Link></li>
//           </ul>
//         </aside>
//       )}

//       <main className="main-content">
//         <h2>Power Consumption vs Time</h2>
//         <div className="graph-controls">
//           <label htmlFor="district">District: </label>
//           <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
//             {districts.map(dist => (
//               <option key={dist} value={dist}>{dist}</option>
//             ))}
//           </select>
//         </div>

//         {chartData && (
//           <div className="chart-container" style={{ width: '80%', height: '500px' }}>
//             <Line data={chartData} options={{
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: true,
//                   position: 'top',
//                 },
//                 tooltip: {
//                   callbacks: {
//                     label: (context) => {
//                       return `Power: ${context.raw}`;
//                     }
//                   }
//                 }
//               },
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: 'Date',
//                   },
//                   ticks: {
//                     maxRotation: 90,
//                     minRotation: 45,
//                   }
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: 'Power (1000MW)',
//                   },
//                   beginAtZero: true,
//                   ticks: {
//                     stepSize: 500, // Adjust this to better display your data
//                   }
//                 }
//               }
//             }} />
//           </div>
//         )}
//       </main>

//       <footer className="footer">
//         <p>© 2024 Government of Delhi. All Rights Reserved.</p>
//         <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
//       </footer>
//     </div>
//   );
// }

// export default Graph1;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';
import './LandingPage.css';
import './Graph1.css';

function Graph1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [district, setDistrict] = useState('South Delhi');
  const [analysisResult, setAnalysisResult] = useState(null); // New state for analysis result
  const [districts] = useState([
    'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi',
    'North East Delhi', 'North West Delhi', 'Shahadara', 
    'South Delhi', 'South East Delhi', 'South West Delhi', 
    'West Delhi'
  ]);

  const filePath = "http://localhost:5000/get-excel-file"; // Excel file path

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const loadData = useCallback(async () => {
    try {
      const response = await axios.get(filePath, {
        responseType: 'arraybuffer'
      });
      const data = response.data;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const selectedDistrict = district;
      const powerConsumedKey = `Power Consumed (${selectedDistrict})`;
      const predictedPowerKey = `Predicted Power (${selectedDistrict})`;

      const totalEntries = worksheet.length;
      const indices = Array.from({ length: totalEntries }, (_, i) => i + 1);

      const powerConsumed = worksheet.map(entry => entry[powerConsumedKey]);
      const predictedPower = worksheet.map(entry => entry[predictedPowerKey]);

      const first80Indices = indices.slice(0, 576);
      const last20Indices = indices.slice(576);
      const first80PowerConsumed = powerConsumed.slice(0, 576);
      const last20PowerConsumed = powerConsumed.slice(576);
      const last20PredictedPower = predictedPower.slice(576);

      setChartData({
        labels: [...first80Indices, ...last20Indices],
        datasets: [
          {
            label: 'Power Consumed (First 80%)',
            data: [...first80PowerConsumed, ...Array(last20Indices.length).fill(null)],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            fill: true,
            borderWidth: 2,
            pointRadius: 0.8,
            tension: 0.1
          },
          {
            label: 'Power Consumed (Last 20%)',
            data: [...Array(576).fill(null), ...last20PowerConsumed],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            fill: true,
            borderWidth: 2,
            pointRadius: 0.8,
            tension: 0.1
          },
          {
            label: 'Predicted Power (Last 20%)',
            data: [...Array(576).fill(null), ...last20PredictedPower],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            fill: true,
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0.8,
            tension: 0.1
          }
        ],
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, [district]);

  // Function to handle analysis using the Gemini API
  const analyzeData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/analyze-graph');
      setAnalysisResult(response.data.analysis); // Assuming the analysis is in the 'analysis' key
    } catch (error) {
      console.error('Error analyzing data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="graph1-container">
      <header className="App-header">
        <div className="header-logo">
          <h1>Government of Delhi</h1>
        </div>
        <nav className="App-nav">
          <ul>
            <li><a href="/landing">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact-us">Contact</a></li>
          </ul>        
        </nav>
        <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar">
          <button className="close-sidebar" onClick={toggleSidebar}>×</button>
          <ul>
            <li><Link to="/graph1">Graph 1</Link></li>
            <li><Link to="/graph2">Graph 2</Link></li>
            <li><Link to="/duckcurve">Duck Curve</Link></li>
          </ul>
        </aside>
      )}

      <main className="main-content">
        <h2>Power Consumption vs Time</h2>
        <div className="graph-controls">
          <label htmlFor="district">District: </label>
          <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
            {districts.map(dist => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>

        {chartData && (
          <div className="chart-container" style={{ width: '80%', height: '500px' }}>
            <Line data={chartData} options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      return `Power: ${context.raw}`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date',
                  },
                  ticks: {
                    maxRotation: 90,
                    minRotation: 45,
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Power (1000MW)',
                  },
                  beginAtZero: true,
                  ticks: {
                    stepSize: 500,
                  }
                }
              }
            }} />
          </div>
        )}

        <button onClick={analyzeData}>Analyze</button> {/* Analyze button */}
        {analysisResult && (
          <div className="analysis-result">
            <h3>Analysis Result:</h3>
            <p>{analysisResult}</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default Graph1;
