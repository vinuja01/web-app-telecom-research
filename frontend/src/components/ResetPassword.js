import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/auth/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.msg);
      // Optionally redirect to login after a delay
      setTimeout(() => navigate("/"), 3000);
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
          <h2 className="fw-bold mb-5">Reset Password</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="New Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <MDBBtn className="w-100 mb-4" size="md" type="submit">
              Reset Password
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default ResetPassword;
