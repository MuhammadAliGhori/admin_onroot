import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { Modal, Button, Form } from "react-bootstrap";

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("http://localhost:4000/api/createrecommendation")
      .then((response) => response.json())
      .then((data) => setRecommendations(data.Recommendations))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    fetch("http://localhost:4000/api/createrecommendation")
      .then((response) => response.json())
      .then((data) => setRecommendations(data.Recommendations))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const columns = React.useMemo(
    () => [
      { Header: "Title", accessor: (row) => row.title },
      { Header: "userid", accessor: (row) => row.userID },
      {
        Header: "Description",
        accessor: (row) => row.description,
      },
      {
        Header: "Region",
        accessor: (row) => row.region,
      },
      {
        Header: "Location",
        accessor: (row) => row.location,
      },
      {
        Header: "Cost",
        accessor: (row) => row.cost,
      },
      {
        Header: "Currency",
        accessor: (row) => row.currency,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <>
            <button
              onClick={() => handleEdit(row.original)}
              className="btn btn-primary mx-1 mb-1"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="btn btn-danger mx-1"
            >
              Delete
            </button>
          </>
        ),
      },
    ],
    []
  );
  const handleEdit = (rowData) => {
    // Implement your edit logic using rowData
    console.log("Edit", rowData);
  };

  const handleDelete = (recommendationId) => {
    console.log("Delete", recommendationId);
    fetch(
      `http://localhost:4000/api/createrecommendation/${recommendationId}`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        setRecommendations((prevRecommendations) =>
          prevRecommendations.filter((rec) => rec.id !== recommendationId)
        );
        console.log("Recommendation deleted successfully.");
      })
      .catch((error) => console.error("Error deleting recommendation:", error));
  };
  // ...

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCreateRecommendation = (formData) => {
    // Send a request to your backend API for creating a new recommendation
    // ...

    // Close the modal after submission
    handleClose();
  };

  // Create an instance of useTable hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: recommendations });

  return (
    <div className="d-flex justify-content-center flex-column p-5">
      <h1 className="text-center fw-bold mb-3 text-decoration-underline">
        Total Recommendations : {recommendations?.length}
      </h1>
      <div className="d-flex justify-content-end my-3">
        <button
          className="bg-info text-light border-0 p-2 rounded-2"
          onClick={handleShow}
        >
          {" "}
          Create Recommendatoin
        </button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Recommendation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for creating a new recommendation */}
          <Form>
            <Form.Group controlId="userID">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" placeholder="Enter user ID" />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group controlId="region">
              <Form.Label>Region</Form.Label>
              <Form.Control type="text" placeholder="Enter region" />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter location" />
            </Form.Group>

            <Form.Group controlId="cost">
              <Form.Label>Cost</Form.Label>
              <Form.Control type="text" placeholder="Enter cost" />
            </Form.Group>

            <Form.Group controlId="currency">
              <Form.Label>Currency</Form.Label>
              <Form.Control type="text" placeholder="Enter currency" />
            </Form.Group>

            <Form.Group controlId="hours">
              <Form.Label>Hours</Form.Label>
              <Form.Control type="text" placeholder="Enter hours" />
            </Form.Group>

            <Form.Group controlId="experience">
              <Form.Label>Experience</Form.Label>
              <Form.Control type="text" placeholder="Enter experience" />
            </Form.Group>

            <Form.Group controlId="descriptors">
              <Form.Label>Descriptors</Form.Label>
              <Form.Control type="text" placeholder="Enter descriptors" />
            </Form.Group>

            <Form.Group controlId="links">
              <Form.Label>Links</Form.Label>
              <Form.Control type="text" placeholder="Enter links" />
            </Form.Group>

            <Form.Group controlId="longitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control type="text" placeholder="Enter longitude" />
            </Form.Group>

            <Form.Group controlId="latitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control type="text" placeholder="Enter latitude" />
            </Form.Group>

            <Form.Group controlId="isItinerary">
              <Form.Label>Is Itinerary</Form.Label>
              <Form.Control type="text" placeholder="Enter isItinerary" />
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Enter country" />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="my-2"
              onClick={handleCreateRecommendation}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <table {...getTableProps()} style={{ border: "1px solid black" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ border: "1px solid gray" }}
                  className="p-2 text-center bg-dark text-light"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{ border: "1px solid black" }}
                    className="py-1 px-2 text-center"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
