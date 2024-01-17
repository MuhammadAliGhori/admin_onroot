// DataContext.js
import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    users: [],
  });
  const dataOfUsers = data.users 
  const [recommendation, setRecommendation] = useState(0);
  const [totalRecommendations, setTotalRecommendations] = useState();
  const [trips, setTrips] = useState([]);
  const userID = data.users.map((user) => user._Id);

  console.log(totalRecommendations, userID, "totalRecommendations");
  // users
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
      .then((data) => setRecommendation(data.Recommendations))
      .catch((error) =>
        console.error("Error fetching total recommendations count:", error)
      );
  }, []);
  // usertrips
  useEffect(() => {
    const fetchUserRecommendations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/recommendations/${userID}/recommendations`
        );
        setTotalRecommendations(response.data.Recommendations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user recommendations:", error);
        // setLoading(false);
      }
    };

    fetchUserRecommendations();
  }, [userID]);

  // trips
  useEffect(() => {
    fetch("http://localhost:4000/api/trips")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // del trip
  const deleteTrip = async (tripId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/trips/${tripId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setTrips((prevTrips) =>
          prevTrips.filter((trip) => trip._id !== tripId)
        );
      } else {
        console.error("Failed to delete trip");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };
  return (
    <DataContext.Provider
      value={{
        data,
        dataOfUsers,
        setData,
        recommendation,
        setRecommendation,
        trips,
        setTrips,
        deleteTrip,
        totalRecommendations,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
