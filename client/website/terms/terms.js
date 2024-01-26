// components/TermsDisplay.js
import { useEffect, useState } from "react";
import axios from "axios";

export default () => {
  const [terms, setTerms] = useState([]);
  const [editedTerm, setEditedTerm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/getterms");
        setTerms(response.data);
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };

    fetchTerms();
  }, []);

  const handleDelete = async (termId) => {
    try {
      await axios.delete(`http://localhost:4000/api/delete/${termId}`);
      setTerms((prevTerms) => prevTerms.filter((term) => term._id !== termId));
      console.log("Term deleted successfully!");
    } catch (error) {
      console.error("Error deleting term:", error);
    }
  };

  const handleEdit = (term) => {
    setEditedTerm(term);
    openModal();
  };

  const handleModalClose = () => {
    setEditedTerm(null);
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
    setEditedTerm((prevTerm) => ({ ...prevTerm, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/editterm/${editedTerm._id}`,
        editedTerm
      );
      // Update the terms list or perform any necessary actions after saving changes
      console.log("Term edited successfully!");
      handleModalClose();
    } catch (error) {
      console.error("Error editing term:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Terms</h2>
      <div className="row">
        {terms.map((term) => (
          <div key={term._id} className="col-lg-10 col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-bold">{term.heading}</h5>
                <p className="card-text">{term.paragraph1}</p>
                <p className="card-text">{term.paragraph2}</p>
                <p className="card-text">{term.paragraph3}</p>
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-success border-0 rounded-3"
                    onClick={() => handleEdit(term)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger border-0 rounded-3"
                    onClick={() => handleDelete(term._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editedTerm && (
        <div
          className={`modal fade ${isModalOpen ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{ display: isModalOpen ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Term</h5>
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
                      value={editedTerm.heading}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="paragraph1" className="form-label">
                      Paragraph 1:
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      id="paragraph1"
                      name="paragraph1"
                      value={editedTerm.paragraph1}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="paragraph2" className="form-label">
                      Paragraph 2:
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      id="paragraph2"
                      name="paragraph2"
                      value={editedTerm.paragraph2}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="paragraph3" className="form-label">
                      Paragraph 3:
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      id="paragraph3"
                      name="paragraph3"
                      value={editedTerm.paragraph3}
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
