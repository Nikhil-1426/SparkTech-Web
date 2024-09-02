// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase'; // Import the Firestore instance and Auth
import TopBar from './TopBar.js'; // Ensure 'TopBar' matches the file name exactly
import './Dashboard.css';

function Dashboard() {
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
      <TopBar /> {/* Include the TopBar component */}
      <h1 className="dashboard-title">Dashboard</h1> {/* Center the title */}
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
        <p>Please log in to view your data.</p> // Message for non-logged-in users
      )}
    </div>
  );
}

export default Dashboard;

