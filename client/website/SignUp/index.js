import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import styles from "../../style/signin.module.css";
import Captcha from "./Captcha";
// import wlogo from "../../public/images/rootwhite.png";
import Image from "next/image";
import { API_URL } from "../../apiConfig";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import { sitekey } from "./apiConfig";
import Link from "next/link";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function Signup() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const recaptchaValueRef = useRef("");
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false); // Added state for the checkbox
  const [privacyPolicyModalOpen, setPrivacyPolicyModalOpen] = useState(false);
  const [termsConditionModalOpen, setTermsConditionModalOpen] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    if (!values.username) {
      const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
      values.username = `${values.firstName}${randomNumbers}`;
    }

    const emptyFields = Object.keys(values).filter((key) => !values[key]);
    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.join(", ");
      Swal.fire({
        title: "Empty Fields",
        text: `Please fill out the following fields: ${fieldNames}`,
        icon: "error",
      });
      setSubmitting(false);
      return;
    }
    if (!privacyPolicyAccepted) {
      Swal.fire({
        title: "Privacy Policy Not Accepted",
        text: "Please accept the Privacy Policy to proceed.",
        icon: "error",
      });
      // setPrivacyPolicyModalOpen(true); // Open the privacy policy modal

      // setSubmitting(false);
      return;
    }
    if (confirmPassword != values.password) {
      setRecaptchaError("Password not matched");
      Swal.fire({
        text: "Both password and confirm password are not same.",
        icon: "error",
      });
      setSubmitting(false);
      return;
    }
    if (!recaptchaValueRef.current) {
      setRecaptchaError("Please complete the reCAPTCHA challenge.");
      Swal.fire({
        text: "Please complete the reCAPTCHA challenge.",
        icon: "error",
      });
      setSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/api/users`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response Data:", response.data);

      if (response.data.status) {
        //localStorage.setItem("userID", _id);
        //Cookies.set("userID", _id);
        //localStorage.setItem("email", email);
        Swal.fire({
          title: "Account Created",
          text: `Welcome, ${
            response.data.user.firstName.charAt(0).toUpperCase() +
            response.data.user.firstName.slice(1)
          }! Your account has been successfully created.`,
          icon: "success",
        });
        // resetForm();
        // if (fileInputRef.current) {
        //   fileInputRef.current.value = "";
        // }
        // setSubmitting(false);
        router.push("/confirmsignup");
      } else if (!response.data.status) {
        if (response.data.message === "Email already exists") {
          Swal.fire({
            title: "Account Exists",
            text: "Provided Email is Already Exists.",
            icon: "warning",
          });
        } else if (response.data.message === "Username already exists") {
          Swal.fire({
            title: "Account Exists",
            text: "Provided Username is Already Exists.",
            icon: "warning",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error",
        text: "Something went wrong in backend. Please try again later",
        icon: "error",
      });

      setSubmitting(false);
    }
  };

  const handleCaptchaChange = (value) => {
    if (value) {
      recaptchaValueRef.current = value; // Store reCAPTCHA value in the ref
      setRecaptchaError("");
    } else {
      recaptchaValueRef.current = ""; // Clear the ref value
      setRecaptchaError("Please complete the reCAPTCHA challenge.");
    }
  };

  const showAccountExistsAlert = () => {
    Swal.fire({
      title: "Account Exists",
      text: "Provided Email is Already Exists.",
      icon: "warning",
    });
  };

  const signupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Firstname is required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Lastname is required"),

    email: Yup.string().email("Email is invalid").required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);

    console.log(decoded.given_name + randomNumbers);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}api/users/createUserwithGoogle`,
        {
          firstName: decoded.given_name,
          lastName: decoded.family_name,
          region: "Islamabad",
          email: decoded.email,
          username: decoded.given_name + randomNumbers,
          language: "English",
          password: decoded.given_name + decoded.family_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response Data:", response.data);

      if (response.data.status) {
        Swal.fire({
          title: "Account Created",
          text: `Welcome, ${
            response.data.user.firstName.charAt(0).toUpperCase() +
            response.data.user.firstName.slice(1)
          }! Your account has been successfully created.`,
          icon: "success",
          confirmButtonText: "OK", // Customize the button text
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
        // Additional logic or navigation
      } else if (!response.data.status) {
        if (response.data.message === "Email already exists") {
          Swal.fire({
            title: "Account Exists",
            text: "Provided Email is Already Exists.",
            icon: "warning",
            confirmButtonText: "OK", // Customize the button text
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/login");
            }
          });
        } else if (response.data.message === "Username already exists") {
          Swal.fire({
            title: "Account Exists",
            text: "Provided Username is Already Exists.",
            icon: "warning",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Server Error",
        text: "Something went wrong in the backend. Please try again later",
        icon: "error",
      });
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };

  const openTermsModal = (e) => {
    e.stopPropagation();
    setTermsConditionModalOpen(true);
  };

  const openPrivacyModal = (e) => {
    e.stopPropagation();
    setPrivacyPolicyModalOpen(true);
  };

  return (
    <>
      <div className={`row w-100 ${styles.confirmme}`}>
        <div className="col-lg-12 d-flex justify-content-center">
          <div className={styles.signupsignupcontainer} style={{width:"95%"}}>
            <h1 className={styles.signupheading1}>Welcome to</h1>
            {/* <Image width={160} src={wlogo} alt="wlogo" /> */}
            <p className="text-light pt-lg-4 pt-3">
              Share your experiences and get inspired to plan your next trip.
            </p>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                region: "Islamabad",
                email: "",
                username: "",
                password: "",
              }}
              validationSchema={signupSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isValid }) => (
                <Form>
                  <div className="d-flex gap-3 mt-4">
                    <div className="w-100">
                      <Field
                        name="firstName"
                        style={{ padding: "10px" }}
                        className="form-control rounded-5 border-0 "
                        placeholder="First Name*"
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="text-light">{errors.firstName}</div>
                      ) : null}
                    </div>

                    <div className="w-100">
                      <Field
                        name="lastName"
                        style={{ padding: "10px" }}
                        className="form-control rounded-5 border-0 "
                        placeholder="Last Name*"
                      />
                      {errors.lastName && touched.lastName ? (
                        <div className="text-light ">{errors.lastName}</div>
                      ) : null}
                    </div>
                  </div>


                  <Field
                    name="email"
                    type="email"
                    style={{ padding: "10px" }}
                    className="form-control rounded-5 border-0 mt-2"
                    placeholder="Email*"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-light">{errors.email}</div>
                  ) : null}

                  <Field
                    name="username"
                    style={{ padding: "10px" }}
                    className="form-control rounded-5 border-0 mt-2"
                    placeholder="Username"
                  />
                  {errors.username && touched.username ? (
                    <div className="text-light ">{errors.username}</div>
                  ) : null}

                  <div className="position-relative">
                    <Field
                      // type="password"
                      name="password"
                      style={{ padding: "10px" }}
                      className="form-control rounded-5 border-0 mt-2"
                      placeholder="Password*"
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
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-light"
                  />

                  <div className="position-relative">
                    <Field
                      // type="password"
                      name="c"
                      style={{ padding: "10px" }}
                      className="form-control rounded-5 border-0 mt-2"
                      placeholder="Confim Password*"
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>

                  <div className="mt-2">
                    {/* Privacy Policy Checkbox */}
                    <div
                      style={{
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Field
                        type="checkbox"
                        name="privacyPolicyAccepted"
                        checked={privacyPolicyAccepted}
                        onChange={(e) =>
                          setPrivacyPolicyAccepted(e.target.checked)
                        }
                        style={{ zoom: 1.5 }} // Adjust the zoom value to change the size of the checkbox
                      />{" "}
                      <span
                        style={{
                          fontSize: "16px",
                          marginLeft: "5px",
                          color: "#04104A",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                        onClick={openTermsModal}
                      >
                        I agree to the{" "}
                        <strong onClick={openTermsModal}>
                          Terms of Service
                        </strong>
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          marginLeft: "5px",
                          color: "#04104A",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                        onClick={openPrivacyModal}
                      >
                        and the{" "}
                        <strong onClick={openPrivacyModal}>
                          Privacy Policy
                        </strong>
                      </span>
                    </div>
                    {errors.privacyPolicyAccepted && (
                      <div className="text-light" style={{ fontSize: "16px" }}>
                        {errors.privacyPolicyAccepted}
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <div className="w-100 d-flex justify-content-center mt-3">
                      <ReCAPTCHA
                        sitekey={sitekey}
                        onChange={handleCaptchaChange}
                      />
                    </div>
                    {recaptchaError && (
                      <div className="text-light">{recaptchaError}</div>
                    )}
                    <button
                      type="submit"
                      className="savebtn bg-white text-dark fw-bold px-4 py-2 mt-4"
                      // disabled={!isValid}
                      disabled={!!recaptchaError}
                    >
                      SIGN UP
                    </button>
                  </div>
                  <div className="text-center mt-2 ">
                    <Link
                      href="/login"
                      style={{ color: "#fff", textDecoration: "none" }}
                    >
                      Already have an account? Login here.
                    </Link>
                  </div>
                  <div
                    className="w-100 d-flex justify-content-center"
                    style={{
                      marginTop: "2%",
                      cursor: "pointer",
                    }}
                  >
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginError}
                      text={"Sign Up with Google"}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

     

     
      </div>
    </>
  );
}

export default Signup;



const modalContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxHeight: "75%",
  bgcolor: "background.paper",
  borderWidth: "0px",
  borderColor: "white",
  borderRadius: "30px",
  boxShadow: 24,
  overflow: "auto",
  scrollbarColor: "#F7F8FA #FFFFFF", // For Firefox
  // WebKit browsers (Chrome, Safari)
  "&::-webkit-scrollbar": {
    width: "0px", // You can adjust the width as needed
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#F7F8FA",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#FFFFFF",
  },
};
