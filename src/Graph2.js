// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './App.css';
// import './LandingPage.css';
// import './Graph1.css';
// import '' // Reuse the CSS for consistent styling

// const Graph2 = () => {
//   const [mainParameter, setMainParameter] = useState('temperature');
//   const [secondaryParameters, setSecondaryParameters] = useState(['humidity', 'windspeed', 'precipitation']);
//   const [timeRange, setTimeRange] = useState('Day');
//   const [district, setDistrict] = useState('South Delhi');
//   const [mainImageSrc, setMainImageSrc] = useState('');
//   const [secondaryImages, setSecondaryImages] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const districts = [
//     'All Districts', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 
//     'Central Delhi', 'North East Delhi', 'North West Delhi', 'South East Delhi', 
//     'South West Delhi', 'New Delhi', 'Shahdara'
//   ];

//   useEffect(() => {
//     const updateImageSrcs = () => {
//       const formattedDistrict = district.replace(/\s+/g, '').toLowerCase();
//       const formattedTimeRange = timeRange.toLowerCase();
//       const formattedMainParameter = mainParameter.toLowerCase();
//       const mainImageName = `${formattedTimeRange}.png`;
//       const mainImageUrl = `/images/${formattedDistrict}/${formattedMainParameter}/${mainImageName}`;
//       setMainImageSrc(mainImageUrl);

//       const updatedSecondaryImages = secondaryParameters.map(param => {
//         const formattedParam = param.toLowerCase();
//         return `/images/${formattedDistrict}/${formattedParam}/${mainImageName}`;
//       });
//       setSecondaryImages(updatedSecondaryImages);
//     };

//     updateImageSrcs();
//   }, [mainParameter, secondaryParameters, timeRange, district]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleTimeRangeClick = (range) => {
//     setTimeRange(range);
//   };

//   const handleGraphClick = (clickedParameter) => {
//     setSecondaryParameters(
//       secondaryParameters.map(param => (param === clickedParameter ? mainParameter : param))
//     );
//     setMainParameter(clickedParameter);
//   };

//   return (
//     <div className="graph1-container">
//       <header className="top-bar">
//         <div className="header-logo">
//           <h1>Government of Delhi</h1>
//         </div>
//         <nav className="nav-links">
//           <a href="/landing">Home</a>
//           <a href="/dashboard">Dashboard</a>
//           <a href="/about-us">About Us</a>
//           <a href="/services">Services</a>
//           <a href="/contact-us">Contact</a>
//         </nav>
//         <button className="sidebar-toggle" onClick={toggleSidebar}>
//           ☰
//         </button>
//       </header>

//       {isSidebarOpen && (
//         <aside className="sidebar">
//           <button className="close-sidebar" onClick={toggleSidebar}>×</button>
//           <ul>
//             <li><Link to="/graph1">Graph 1</Link></li>
//             <li><Link to="/graph2">Graph 2</Link></li>
//           </ul>
//         </aside>
//       )}

//       <main className="main-content">
//         <h2>Graph 2 Page</h2>
//         <div className="graph-container">
//           <div className="timeframe-tabs">
//             {['Day', 'Week', 'Month', 'Year'].map((range) => (
//               <button
//                 key={range}
//                 className={timeRange === range ? 'active' : ''}
//                 onClick={() => handleTimeRangeClick(range)}
//               >
//                 {range}
//               </button>
//             ))}
//           </div>

//           <div className="graph-controls">
//             <label htmlFor="district">District: </label>
//             <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
//               {districts.map((dist) => (
//                 <option key={dist} value={dist}>{dist}</option>
//               ))}
//             </select>
//           </div>

//           <div className="graph-image-container">
//             <h3>Main Graph</h3>
//             {mainImageSrc && <img src={mainImageSrc} alt="Main Graph" />}
//           </div>

//           <div className="secondary-graphs-container">
//             {secondaryImages.map((src, index) => (
//               <img
//                 key={src}
//                 src={src}
//                 alt={`Graph ${secondaryParameters[index]}`}
//                 onClick={() => handleGraphClick(secondaryParameters[index])}
//                 style={{ width: '150px', height: '100px', objectFit: 'contain', cursor: 'pointer' }}
//               />
//             ))}
//           </div>
//         </div>
//       </main>

//       <footer className="footer">
//         <p>© 2024 Government of Delhi. All Rights Reserved.</p>
//         <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
//       </footer>
//     </div>
//   );
// };

// export default Graph2;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './LandingPage.css';
import './Graph1.css';
import './Graph2.css'; // Reuse the CSS for consistent styling

const Graph2 = () => {
  const [mainParameter, setMainParameter] = useState('temperature');
  const [secondaryParameters, setSecondaryParameters] = useState(['humidity', 'windspeed', 'precipitation']);
  const [timeRange, setTimeRange] = useState('Day');
  const [district, setDistrict] = useState('South Delhi');
  const [mainImageSrc, setMainImageSrc] = useState('');
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const districts = [
    'All Districts', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 
    'Central Delhi', 'North East Delhi', 'North West Delhi', 'South East Delhi', 
    'South West Delhi', 'New Delhi', 'Shahdara'
  ];

  useEffect(() => {
    const updateImageSrcs = () => {
      const formattedDistrict = district.replace(/\s+/g, '').toLowerCase();
      const formattedTimeRange = timeRange.toLowerCase();
      const formattedMainParameter = mainParameter.toLowerCase();
      const mainImageName = `${formattedTimeRange}.png`;
      const mainImageUrl = `/images/${formattedDistrict}/${formattedMainParameter}/${mainImageName}`;
      setMainImageSrc(mainImageUrl);

      const updatedSecondaryImages = secondaryParameters.map(param => {
        const formattedParam = param.toLowerCase();
        return `/images/${formattedDistrict}/${formattedParam}/${mainImageName}`;
      });
      setSecondaryImages(updatedSecondaryImages);
    };

    updateImageSrcs();
  }, [mainParameter, secondaryParameters, timeRange, district]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTimeRangeClick = (range) => {
    setTimeRange(range);
  };

  const handleGraphClick = (clickedParameter) => {
    setSecondaryParameters(
      secondaryParameters.map(param => (param === clickedParameter ? mainParameter : param))
    );
    setMainParameter(clickedParameter);
  };

  return (
    <div className="graph1-container">
      <header className="top-bar">
        <div className="header-logo">
          <h1>Government of Delhi</h1>
        </div>
        <nav className="nav-links">
          <a href="/landing">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/about-us">About Us</a>
          <a href="/services">Services</a>
          <a href="/contact-us">Contact</a>
        </nav>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar">
          <button className="close-sidebar" onClick={toggleSidebar}>×</button>
          <ul>
            <li><Link to="/graph1">Graph 1</Link></li>
            <li><Link to="/graph2">Graph 2</Link></li>
          </ul>
        </aside>
      )}

      <main className="main-content">
        <h2>Graph 2 Page</h2>
        <div className="graph-container">
          <div className="timeframe-tabs">
            {['Day', 'Week', 'Month', 'Year'].map((range) => (
              <button
                key={range}
                className={timeRange === range ? 'active' : ''}
                onClick={() => handleTimeRangeClick(range)}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="graph-controls">
            <label htmlFor="district">District: </label>
            <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
              {districts.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          <div className="graph-image-container">
            <h3>Main Graph</h3>
            {mainImageSrc && <img src={mainImageSrc} alt="Main Graph" />}
          </div>

          <div className="secondary-graphs-container">
            {secondaryImages.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Graph ${secondaryParameters[index]}`}
                onClick={() => handleGraphClick(secondaryParameters[index])}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
};

export default Graph2;