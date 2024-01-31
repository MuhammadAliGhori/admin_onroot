import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function GetAbout() {
  const [aboutEntries, setAboutEntries] = useState([]);

  const fetchAboutEntries = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/about");
      setAboutEntries(response.data);
    } catch (error) {
      console.error("Error fetching about entries:", error);
    }
  };

  useEffect(() => {
    fetchAboutEntries();
  }, []);
  return (
    <div>
      <Row className="py-lg-5 py-4">
        <h1 className="text-center">About OnRoot</h1>

        {aboutEntries.map((entry) => (
          <Col className="col-lg-6 col-12 px-lg-5 px-3 py-3">
            <div key={entry._id}>
              <h2>{entry.heading}</h2>
              <p>{entry.paragraph}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
