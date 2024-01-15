// DataContext.js
import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    users: [],
  });
  const [totalRecommendations, setTotalRecommendations] = useState(0);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users/getusers")
      .then((response) => response.json())
      .then((data) => {
        setData((prevData) => ({
          ...prevData,
          users: data.data,
        }));
      })
      .catch((error) => console.error("Error fetching initial data:", error));
    fetch("http://localhost:4000/api/createrecommendation")
      .then((response) => response.json())
      .then((data) => setTotalRecommendations(data.Recommendations))
      .catch((error) =>
        console.error("Error fetching total recommendations count:", error)
      );
  }, []);


  useEffect(() => {
    fetch('http://localhost:4000/api/trips')
      .then(response => response.json())
      .then(data => setTrips(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

// del trip

const deleteTrip = async (tripId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/trips/${tripId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== tripId));
      } else {
        console.error("Failed to delete trip");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };
  return (
    <DataContext.Provider value={{ data, setData, totalRecommendations, setTotalRecommendations,trips, setTrips,deleteTrip }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
