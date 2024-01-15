import React, { useState } from "react";
import styles from "../style/signin.module.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const resetPasswordSchema = Yup.object().shape({
    userId: Yup.string().required("User ID is required"),
    newPassword: Yup.string().required("Password is required"),
  });

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/admin/reset-password",
        values
      );

      if (response.status === 200) {
        console.log("Password reset successful.");
        router.push("/login");
      } else {
        console.error("Password reset failed.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`row ${styles.confirmme}`}>
        <div className="col-lg-12 d-flex justify-content-center">
          <div className={styles.signupsignupcontainer}>
            <h1 className={styles.signupheading1}>Reset Password</h1>

            <p className="text-light pt-lg-4 ">
              Enter your User ID and new Password.
            </p>

            <div className="row gy-3 d-flex justify-content-center align-center">
              <Formik
                initialValues={{
                  userId: "",
                  password: "",
                }}
                validationSchema={resetPasswordSchema}
                onSubmit={handleResetPassword}
              >
                {({ isValid }) => (
                  <Form>
                    <Field
                      name="userId"
                      style={{ padding: "10px" }}
                      className="form-control rounded-2 border-0 mt-2"
                      placeholder="User ID"
                    />
                    <ErrorMessage
                      name="userId"
                      component="div"
                      className="text-light"
                    />

                    <Field
                      name="newPassword"
                      style={{ padding: "10px" }}
                      className="form-control rounded-2 border-0 mt-2"
                      placeholder="New Password"
                      type="newPassword"
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-light"
                    />

                    <div className="text-center">
                      <button
                        className=" text-dark border-0 px-4 fw-bold rounded-3 py-2 mt-4"
                        type="submit"
                        disabled={!isValid}
                      >
                        {loading ? (
                          <div
                            className="spinner-border text-light"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
