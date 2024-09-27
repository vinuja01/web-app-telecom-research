import React, { useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        { email }
      );
      setMessage(response.data.msg);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: "100px",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <MDBCardBody className="p-5 text-center">
          <h2 className="fw-bold mb-5">Forgot Password</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MDBBtn className="w-100 mb-4" size="md" type="submit">
              Send Reset Link
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default ForgotPassword;
