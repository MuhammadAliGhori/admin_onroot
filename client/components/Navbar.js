import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import logo from "../public/images/logo.svg";
import styles from "../style/home.module.css";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    users: [],
  });
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
  });
  const [useremail, setUserEmail] = useState([]);
  console.log(useremail, "ali email");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sendEmail = () => {
    setEmailData({
      ...emailData,
      to: useremail,
    });
    axios
      .post("http://localhost:4000/api/users/mail", emailData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleDropdownSelect = async (type) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/mail",
        {
          to: useremail, // Change 'recipient' to 'to'
          html: "I am Muhammad Ali", // Add HTML content if needed
          type: type, // Add type parameter to indicate single user or all users
        }
      );

      console.log(response.data.message);
    } catch (error) {
      console.error("Error triggering email notification:", error);
    }
  };

  const handleEmailSelect = (selectedEmail) => {
    setUserEmail((prevEmails) => {
      const emailIndex = prevEmails.indexOf(selectedEmail);

      if (emailIndex === -1) {
        return [...prevEmails, selectedEmail];
      } else {
        const updatedEmails = [...prevEmails];
        updatedEmails.splice(emailIndex, 1);
        return updatedEmails;
      }
    });
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/users/getusers")
      .then((response) => response.json())
      .then((data) => {
        setData((prevData) => ({
          ...prevData,
          users: data.data,
        }));
      })
      .catch((error) => console.error("Error fetching initial data:", error));
  }, []);

  return (
    <div>
      <div>
        <header className="container-fluid">
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Single User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className="py-3 d-flex justify-content-around">
                  <Dropdown className="mx-2 ">
                    <Dropdown.Toggle
                      className="text-light fw-bold"
                      variant="info"
                      id="dropdown-basic"
                    >
                      User emails list
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {data.users.map((user) => (
                        <Dropdown.Item
                          key={user.id}
                          onClick={() => handleEmailSelect(user.email)}
                        >
                          {user.email}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown className="mx-2">
                    <Dropdown.Toggle
                      className="text-light fw-bold"
                      variant="info"
                      id="dropdown-basic"
                    >
                      Selected Emails
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {useremail.map((mail, index) => (
                        <Dropdown.Item key={index}>{mail}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <input
                  type="email"
                  placeholder="To"
                  onChange={(e) =>
                    setEmailData({ ...emailData, to: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Subject"
                  onChange={(e) =>
                    setEmailData({ ...emailData, subject: e.target.value })
                  }
                />
                <textarea
                  placeholder="Text"
                  onChange={(e) =>
                    setEmailData({ ...emailData, text: e.target.value })
                  }
                ></textarea>
                <button onClick={sendEmail}>Send Email</button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <div
            className={`row d-flex align-items-center position-relative ${styles.headerhero}`}
          >
            <div
              className={`col-xl-6 col-lg-6 col-md-6 col-sm-6  d-flex justify-content-start ${styles.logo}`}
            >
              {/* logo */}
              <Link href="/" className="mx-3">
                <Image
                  // onClick={handleReload}
                  width={270}
                  height={50}
                  className={styles.logoimage}
                  src={logo}
                  alt="logo"
                />
              </Link>
              {/* uploaes */}
              <div
                className={`icons-right col-xl-3 col-lg-3 col-md-3 col-sm-3 position-absolute d-flex justify-content-end align-items-center ${styles.right_box}`}
              >
                <Button
                  className="bg-transparent border-0 outline-none"
                  // onClick={() => setModalShow(true)}
                ></Button>

                <Dropdown className="mx-2 ">
                  <Dropdown.Toggle
                    className="text-light fw-bold"
                    variant="info"
                    id="dropdown-basic"
                  >
                    Email Notification
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleShow}>
                      Single User
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-2"
                      onClick={() => handleDropdownSelect("allUsers")}
                    >
                      All Users
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  className="bg-info border-0 outline-none"
                  // onClick={() => setModalShow(true)}
                >
                  <Link
                    href="/login"
                    className="text-decoration-none text-light fw-bold px-3 mx-3"
                  >
                    Login
                  </Link>
                </Button>
              </div>
            </div>
            {/* searchbar */}
            <div className="mr-5 d-flex w-100 justify-content-center">
              {/* <Searchbar /> */}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
