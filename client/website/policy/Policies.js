// components/PolicyDisplay.js
import { useEffect, useState } from "react";
import axios from "axios";

export default () => {
  const [policies, setPolicies] = useState([]);
  const [editedPolicy, setEditedPolicy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/policy/getall"
        );
        setPolicies(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  const handleDelete = async (policyId) => {
    try {
      await axios.delete(`http://localhost:4000/api/policy/delete/${policyId}`);
      setPolicies((prevPolicies) =>
        prevPolicies.filter((policy) => policy._id !== policyId)
      );
      console.log("Policy deleted successfully!");
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  const handleEdit = (policy) => {
    setEditedPolicy(policy);
    openModal();
  };

  const handleModalClose = () => {
    setEditedPolicy(null);
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPolicy((prevPolicy) => ({ ...prevPolicy, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/policy/edit/${editedPolicy._id}`,
        editedPolicy
      );
      // Update the policies list or perform any necessary actions after saving changes
      console.log("Policy edited successfully!");
      handleModalClose();
    } catch (error) {
      console.error("Error editing policy:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Policies</h2>
      <div className="row">
        {policies.map((policy) => (
          <div key={policy._id} className="col-lg-10 col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-bold">{policy.heading}</h5>
                <p className="card-text">{policy.section1}</p>
                <p className="card-text">{policy.section2}</p>
                <p className="card-text">{policy.section3}</p>
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-success border-0 rounded-3"
                    onClick={() => handleEdit(policy)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger border-0 rounded-3"
                    onClick={() => handleDelete(policy._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editedPolicy && (
        <div
          className={`modal fade ${isModalOpen ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{ display: isModalOpen ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Policy</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="heading" className="form-label">
                      Heading:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="heading"
                      name="heading"
                      value={editedPolicy.heading}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="section1" className="form-label">
                      Section 1:
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      id="section1"
                      name="section1"
                      value={editedPolicy.section1}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="section2" className="form-label">
                      Section 2:
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      id="section2"
                      name="section2"
                      value={editedPolicy.section2}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="section3" className="form-label">
                      Section 3:
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      id="section3"
                      name="section3"
                      value={editedPolicy.section3}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={saveChanges}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
