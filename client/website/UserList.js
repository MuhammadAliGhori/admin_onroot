import React, { useState, useEffect, createContext, useContext } from "react";
import { useTable } from "react-table";
import Toast from "react-bootstrap/Toast";
import Link from "next/link";
import { DataContext } from "./DataContext";

export default function UserList() {
  const { data ,totalRecommendations} = useContext(DataContext);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(data.users);
  }, []);


  // Columns definition
  const columns = React.useMemo(
    () => [
      //   { Header: "ID", accessor: "_id" },
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Region", accessor: "region" },
      { Header: "Email", accessor: "email" },
      { Header: "Username", accessor: "username" },
    ],
    []
  );

  return (
    <div
      className="d-flex justify-content-center flex-column p-5"
    >
      <h1 className="text-center fw-bold mb-3 text-decoration-underline">
        User List {data.users.length}
      </h1>

      <div className="d-flex flex-wrap justify-content-between gap-3">
        {users.map((post, index) => {
          return (
            <div className="" key={index}>
              <Toast>
                <Toast.Header>
                  <img src={post.image} className="rounded me-2" alt="" />
                  <strong className="me-auto">Name </strong>
                  <small>
                    {post.firstName} {post.lastName}
                  </small>
                </Toast.Header>
                <Toast.Body>
                  <div className="d-flex justify-content-between mt-1">
                    <strong className="me-auto">Region </strong>
                    <small>{post.region}</small>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <strong className="me-auto">Email </strong>
                    <small>{post.email}</small>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <strong className="me-auto">Username </strong>
                    <small>{post.username}</small>
                  </div>
                </Toast.Body>
              </Toast>
            </div>
          );
        })}
      </div>

      <div className="d-flex gap-3 mt-4">
        <Link href="/totalItineraries" className="text-decoration-none">
          <div className="p-3 bg-info text-light  rounded-3">
            <h3 className="">Total Itineraries : 000</h3>
          </div>
        </Link>
        <Link href="/totalrecommendations" className="text-decoration-none">
          <div className="p-3 bg-info text-light rounded-3">
            <h3>
              Total Recommandations :{" "}
              {totalRecommendations ? totalRecommendations.length : "No Data"}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}