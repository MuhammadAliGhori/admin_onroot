import React, { useContext, useState } from "react";
import { DataContext } from "./DataContext";

export default function TripsData() {
  const { trips, setTrips,deleteTrip } = useContext(DataContext);
  const [deletedTrips, setDeletedTrips] = useState([]);

  const handleDeleteTrip = async (tripId) => {
    if (!tripId) {
      alert("Please enter a Trip ID.");
      return;
    }
    await deleteTrip(tripId);
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <div className="w-50">
        <h1>Total Trip : {trips.length} </h1>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={cellStyle}>#</th>
              <th style={cellStyle}>Title</th>
              <th style={cellStyle}>Email</th>

              <th style={cellStyle}>Delete Trip</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={trip._id} style={rowStyle} className="text-center">
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{trip.title}</td>
                <td style={cellStyle}>{trip.email}</td>
                <button
                  className="border-0 rounded-3 px-3 mt-2"
                  onClick={() => handleDeleteTrip(trip._id)}
                >
                  {" "}
                  Delet
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const rowStyle = {
  borderBottom: "1px solid #ddd",
};
