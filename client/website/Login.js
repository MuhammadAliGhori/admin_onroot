import React, { useState } from "react";
import styles from "../style/signin.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/login",
        values
      );
      if (response.status === 200) {
        console.log("Login successful.");
        router.push("/userlist");
      } else {
        console.error("Password reset failed.");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
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
              userId: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isValid }) => (
              <Form>
                <Field
                  name="userId"
                  style={{ padding: "10px" }}
                  className="form-control rounded-3 border-0 mt-2"
                  placeholder="userId"
                />
                <ErrorMessage
                  name="userId"
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
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
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
