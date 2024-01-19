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
  const [isModalVisible, setModalVisibility] = useState(false);
  const [data, setData] = useState({
    users: [],
  });
  const [emailData, setEmailData] = useState({
    to: [],
    subject: "",
    text: "",
  });
  const [useremail, setUserEmail] = useState([]);
  console.log(useremail, "ali email");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setModalVisibility(false);
  const handleShow1 = () => setModalVisibility(true);
  const sendEmail = () => {
    // const formattedRecipients = useremail
    //   .map((email) => `<${email}>`)
    //   .join(",");

    setEmailData({
      ...emailData,
      to: useremail,
      html: emailData.text,
    });
    axios
      .post("http://localhost:4000/api/users/mail", emailData)
      .then((response) => {
        console.log(response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleDropdownSelect = async (type) => {
    try {
      if (type === "all") {
        const response = await axios.post(
          "http://localhost:4000/api/users/mail",
          {
            to: data.users.map((user) => user.email),
            subject: emailData.subject,
            html: emailData.text,
          }
        );
        console.log(response.data.message);
      } else {
        // Handle other cases if needed
      }
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
                {/* <input
                  type="email"
                  placeholder="To"
                  onChange={(e) =>
                    setEmailData({ ...emailData, to: e.target.value })
                  }
                /> */}
                <div class="mb-3">
                  <label for="subject" class="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="subject"
                    placeholder="Subject"
                    onChange={(e) =>
                      setEmailData({ ...emailData, subject: e.target.value })
                    }
                  />
                </div>

                <div class="mb-3">
                  <label for="text" class="form-label">
                    Text
                  </label>
                  <textarea
                    class="form-control"
                    id="text"
                    placeholder="Text"
                    onChange={(e) =>
                      setEmailData({ ...emailData, text: e.target.value })
                    }
                  ></textarea>
                </div>

                {/* <button onClick={sendEmail}>Send Email</button> */}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={sendEmail}>Send Email</Button>
            </Modal.Footer>
          </Modal>

          {/* for all users */}
          <Modal show={isModalVisible} onHide={handleClose1} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Send Mail To All Users</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-5">
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Subject"
                  onChange={(e) =>
                    setEmailData({ ...emailData, subject: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label htmlFor="text" className="form-label">
                  Text
                </label>
                <textarea
                  className="form-control"
                  id="text"
                  placeholder="Text"
                  onChange={(e) =>
                    setEmailData({ ...emailData, text: e.target.value })
                  }
                ></textarea>
              </div>
              <Button
                variant="info"
                className="fw-bold text-light w-100"
                onClick={() => handleDropdownSelect("all")}
              >
                Send Mail
              </Button>
            </Modal.Body>
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
                    <Dropdown.Item onClick={handleShow1}>
                      Notify to all Users
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
