import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";

const About = () => {
  const router = useRouter();
  const [aboutEntries, setAboutEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ heading: "", paragraph: "" });
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchAboutEntries = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/about");
      setAboutEntries(response.data);
    } catch (error) {
      console.error("Error fetching about entries:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/about",
        newEntry,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        fetchAboutEntries();
        setNewEntry({ heading: "", paragraph: "" });
        // router.push('/aboute')
      } else {
        console.error("Failed to create new about entry");
      }
    } catch (error) {
      console.error("Error creating new about entry:", error);
    }
  };
  const handleEdit = (entryId) => {
    const selectedEntry = aboutEntries.find((entry) => entry._id === entryId);
    if (selectedEntry) {
      setNewEntry({
        heading: selectedEntry.heading,
        paragraph: selectedEntry.paragraph,
      });
      setSelectedEntryId(entryId);
      setShowEditModal(true);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/about/${selectedEntryId}`,
        newEntry,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        fetchAboutEntries();
        setNewEntry({ heading: "", paragraph: "" });
        setSelectedEntryId(null);
        setShowEditModal(false);
      } else {
        console.error("Failed to update about entry");
      }
    } catch (error) {
      console.error("Error updating about entry:", error);
    }
  };

  const handleDelete = async (entryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/about/${entryId}`
      );

      if (response.status === 200) {
        fetchAboutEntries();
      } else {
        console.error("Failed to delete about entry");
      }
    } catch (error) {
      console.error("Error deleting about entry:", error);
    }
  };
  useEffect(() => {
    fetchAboutEntries();
  }, []);

  return (
    <Container>
      <Row className="py-lg-5 py-4">
        <Col className="col-lg-10 col-12 px-lg-5 px-3">
          <h1 className="text-center">Create About</h1>
          {/* Modal for editing entries */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Entry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formHeading">
                  <Form.Label>Heading</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter heading"
                    value={newEntry.heading}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, heading: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formParagraph" className="mt-2">
                  <Form.Label>Paragraph</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter paragraph"
                    value={newEntry.paragraph}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, paragraph: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {aboutEntries.map((entry) => (
            <div key={entry._id}>
              <h2>{entry.heading}</h2>
              <p>{entry.paragraph}</p>
              <Button
                variant="warning"
                onClick={() => handleEdit(entry._id)}
                className="mx-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(entry._id)}
                className="mx-2"
              >
                Delete
              </Button>
            </div>
          ))}

          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formHeading">
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter heading"
                value={newEntry.heading}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, heading: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formParagraph" className="mt-2">
              <Form.Label>Paragraph</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter paragraph"
                value={newEntry.paragraph}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, paragraph: e.target.value })
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="info"
                type="submit"
                className="my-3 text-light px-4"
              >
                Create
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
