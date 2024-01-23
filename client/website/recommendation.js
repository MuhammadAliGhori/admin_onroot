import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editRecommendationId, setEditRecommendationId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    "user._id": "",
    title: "",
    description: "",
    region: "",
    location: "",
    cost: "",
    currency: "",
    hours: "",
    experience: "",
    descriptors: "",
    links: "",
    longitude: "",
    latitude: "",
    isItinerary: "",
    country: "",
  });

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
              onClick={() => handleDelete(row.original._id)}
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
    setShowUpdateModal(true);
    setEditRecommendationId(rowData._id);
    setFormData({
      // populate formData with existing recommendation data for editing
      "user._id": rowData.userID,
      title: rowData.title,
      description: rowData.description,
      region: rowData.region,
      location: rowData.location,
      cost: rowData.cost,
      currency: rowData.currency,
      hours: rowData.hours,
      experience: rowData.experience,
      descriptors: rowData.descriptors,
      links: rowData.links,
      longitude: rowData.longitude,
      latitude: rowData.latitude,
      isItinerary: rowData.isItinerary,
      country: rowData.country,
    });
  };

  const handleUpdateRecommendation = async () => {
    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        region: formData.region,
        location: formData.location,
        cost: formData.cost,
        currency: formData.currency,
        hours: formData.hours,
        experience: formData.experience,
        descriptors: formData.descriptors,
        links: formData.links,
        longitude: formData.longitude,
        latitude: formData.latitude,
        isItinerary: formData.isItinerary,
        country: formData.country,
      };

      // Make the update request
      const response = await axios.put(
        `http://localhost:4000/api/createrecommendation/${editRecommendationId}`,
        updateData
      );

      const updatedRecommendation = response.data;
      setRecommendations((prevRecommendations) =>
        prevRecommendations.map((rec) =>
          rec._id === editRecommendationId ? updatedRecommendation : rec
        )
      );

      // Close the edit modal
      setShowUpdateModal(false);
      setEditRecommendationId(null);
      const existingData = response.data;

      // Populate the formData state with the existing data
      setFormData({
        "user._id": existingData.userID,
        title: existingData.title,
        description: existingData.description,
        region: existingData.region,
        location: existingData.location,
        cost: existingData.cost,
        currency: existingData.currency,
        hours: existingData.hours,
        experience: existingData.experience,
        descriptors: existingData.descriptors,
        links: existingData.links,
        longitude: existingData.longitude,
        latitude: existingData.latitude,
        isItinerary: existingData.isItinerary,
        country: existingData.country,
      });
      console.log("Recommendation updated successfully.");
    } catch (error) {
      console.error("Error updating recommendation:", error);
    }
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
  const handleClose1 = () => setShowUpdateModal(false);

  const handleCreateRecommendation = async () => {
    try {
      const userId = formData["user._id"];
      const newRecommendation = {
        title: formData.title,
        description: formData.description,
        region: formData.region,
        location: formData.location,
        cost: formData.cost,
        currency: formData.currency,
        hours: formData.hours,
        experience: formData.experience,
        descriptors: formData.descriptors,
        links: formData.links,
        longitude: formData.longitude,
        latitude: formData.latitude,
        isItinerary: formData.isItinerary,
        country: formData.country,
        userID: userId,
      };

      const response = await axios.post(
        "http://localhost:4000/api/createrecommendation",
        newRecommendation
      );

      setRecommendations((prevRecommendations) => [
        ...prevRecommendations,
        response.data.Recommendation,
      ]);

      handleClose(); // Close the modal after creating a recommendation

      console.log("Recommendation created successfully.");
    } catch (error) {
      console.error("Error creating recommendation:", error);
    }
  };

  console.log(formData, "ali");
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
            <Form.Group controlId="user._id">
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

      <Modal show={showUpdateModal} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Update Recommendation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for updating an existing recommendation */}
          <Form>
            <Form.Group controlId="user._id">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user ID"
                value={formData["user._id"]}
                onChange={(e) =>
                  setFormData({ ...formData, "user._id": e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="region">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter region"
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="cost">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cost"
                value={formData.cost}
                onChange={(e) =>
                  setFormData({ ...formData, cost: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="currency">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter currency"
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="hours">
              <Form.Label>Hours</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hours"
                value={formData.hours}
                onChange={(e) =>
                  setFormData({ ...formData, hours: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="experience">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter experience"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="descriptors">
              <Form.Label>Descriptors</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter descriptors"
                value={formData.descriptors}
                onChange={(e) =>
                  setFormData({ ...formData, descriptors: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="links">
              <Form.Label>Links</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter links"
                value={formData.links}
                onChange={(e) =>
                  setFormData({ ...formData, links: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="longitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter longitude"
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({ ...formData, longitude: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="latitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter latitude"
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({ ...formData, latitude: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="isItinerary">
              <Form.Label>Is Itinerary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter isItinerary"
                value={formData.isItinerary}
                onChange={(e) =>
                  setFormData({ ...formData, isItinerary: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
            </Form.Group>

            {/* Add other form fields here based on your data structure */}

            <Button
              variant="primary"
              type="submit"
              className="my-2"
              onClick={() => {
                handleUpdateRecommendation();
                handleClose();
              }}
            >
              Update
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
