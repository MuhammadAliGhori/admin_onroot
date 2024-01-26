// components/PrivacyPolicyForm.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    heading: "",
    section1: "",
    section2: "",
    section3: "",
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
      await axios.post("http://localhost:4000/api/policy/create", formData);
      console.log("Privacy Policy created successfully!");
      router.push("/policy");
    } catch (error) {
      console.error("Error creating Privacy Policy:", error);
    }
  };

  return (
    <div className="container mt-lg-5 mt-3">
      <h2 className="fw-bold pb-3 text-center">Create Privacy Policy</h2>
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
          <label htmlFor="section1">Section 1:</label>
          <textarea
            className="form-control"
            id="section1"
            name="section1"
            rows="3"
            value={formData.section1}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="section2">Section 2:</label>
          <textarea
            className="form-control"
            id="section2"
            name="section2"
            rows="3"
            value={formData.section2}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="section3">Section 3:</label>
          <textarea
            className="form-control"
            id="section3"
            name="section3"
            rows="3"
            value={formData.section3}
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
            Create Privacy Policy
          </button>
        </div>
      </form>
    </div>
  );
};
