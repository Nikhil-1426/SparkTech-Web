import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase'; // Import the Firestore instance and Auth
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './Dashboard.css'; // Import the updated CSS file for Dashboard

function Dashboard() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to the sign-in/sign-up page after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const [data, setData] = useState([]); // State to hold fetched data
  const [user, setUser] = useState(null); // State to hold the logged-in user

  // Function to fetch data from Firebase for the logged-in user
  const fetchData = async (userEmail) => {
    const q = query(collection(db, 'Sparks'), where('email', '==', userEmail)); // Query for the user's data based on their email
    const querySnapshot = await getDocs(q);
    const fetchedData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(fetchedData);
  };

  useEffect(() => {
    // Check for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user state
        fetchData(user.email); // Fetch data for the logged-in user
      } else {
        setUser(null); // User is not logged in
        setData([]); // Clear the data
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <div className="dashboard-container">
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
            <li>
              <button className="sign-out-link" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="App-main">
        <div className="dashboard-box">
          <h1 className="dashboard-title">Dashboard</h1>
          {user ? (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Field</th>
                  {data.map((item) => (
                    <th key={item.id}>User {item.id}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ID</td>
                  {data.map((item) => (
                    <td key={`id-${item.id}`}>{item.id}</td>
                  ))}
                </tr>
                <tr>
                  <td>Name</td>
                  {data.map((item) => (
                    <td key={`name-${item.id}`}>{item.name}</td>
                  ))}
                </tr>
                <tr>
                  <td>Email ID</td>
                  {data.map((item) => (
                    <td key={`email-${item.id}`}>{item.email}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Please log in to view your data.</p>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>© 2024 Government of Delhi. All Rights Reserved.</p>
        <p><a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default Dashboard;
