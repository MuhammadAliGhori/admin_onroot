// components/Terms.js
import { useState } from "react";
import axios from "axios";

export default () => {
  const [formData, setFormData] = useState({
    heading: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/terms", formData);
      console.log("Terms created successfully!");
    } catch (error) {
      console.error("Error creating terms:", error);
    }
  };

  return (
    <div className="container mt-lg-5 mt-3">
      <h2 className="fw-bold pb-3 text-center">Create Terms</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label htmlFor="heading">Heading:</label>
          <input
            type="text"
            className="form-control"
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="paragraph1">Paragraph 1:</label>
          <textarea
            className="form-control"
            id="paragraph1"
            name="paragraph1"
            rows="3"
            value={formData.paragraph1}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="paragraph2">Paragraph 2:</label>
          <textarea
            className="form-control"
            id="paragraph2"
            name="paragraph2"
            rows="3"
            value={formData.paragraph2}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="paragraph3">Paragraph 3:</label>
          <textarea
            className="form-control"
            id="paragraph3"
            name="paragraph3"
            rows="3"
            value={formData.paragraph3}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="text-end">
          <button
            type="submit"
            className="btn text-light my-3"
            style={{ background: "#31D2F2" }}
          >
            Create Terms
          </button>
        </div>
      </form>
    </div>
  );
};
