import React, { useState } from "react";
import styles from "../style/signin.module.css";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";

export default function Login() {
  const [storedUserID, setStoredUserID] = useState("");
  const [storedEmail, setStoredEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`row ${styles.confirmme}`}>
      <div className="col-lg-12 d-flex justify-content-center">
        <div className={styles.signupsignupcontainer}>
          <h1 className={`text-align-left ${styles.signupheading1}`}>
            Welcome to
          </h1>
          {/* <Image width={160} src={wlogo} alt="wlogo" /> */}
          <p className="text-light pt-lg-4 pt-3">
            Share your experiences and get inspired to plan your next trip.
          </p>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema=""
            onSubmit=""
          >
            {({ isValid }) => (
              <Form>
                <Field
                  name="email"
                  style={{ padding: "10px" }}
                  className="form-control rounded-3 border-0 mt-2"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-light"
                />
                <div className="position-relative ">
                  <Field
                    name="password"
                    style={{ padding: "10px" }}
                    className="form-control rounded-3 border-0 mt-2"
                    placeholder="Password"
                    // type="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    className="password-toggle-button position-absolute"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: "0",
                      margin: "0",
                      cursor: "pointer",
                      right: "12px",
                      top: "13px",
                      color: "black",
                    }}
                  >
                    {/* <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /> */}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-light"
                />

                <div className="text-center">
                  <button
                    className="savebtn1 text-light mt-4 cursor-pointer"
                    type="submit"
                    disabled={!isValid}
                  >
                    Login
                  </button>
                  <div className="text-center mt-3">
                    <Link
                      href="/forgotpassword"
                      style={{ color: "#fff", textDecoration: "none" }}
                    >
                      Forgot Password?
                    </Link>{" "}
                    <br />
                    <Link
                      href="/signup"
                      style={{ color: "#fff", textDecoration: "none" }}
                    >
                      New member? Register here.
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
