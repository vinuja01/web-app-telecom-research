import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5000/auth/login"
      : "http://localhost:5000/auth/signup";
    try {
      const response = await axios.post(url, formData);
      console.log(`${isLogin ? "Login" : "Signup"} successful`, response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Signup"} error`, error);
      alert(`${isLogin ? "Login" : "Signup"} failed`);
    }
  };

  return (
    <MDBContainer fluid>
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
          height: "300px",
        }}
      ></div>
      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: "-100px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <MDBCardBody className="p-5 text-center">
          <h2 className="fw-bold mb-5">{isLogin ? "Login" : "Signup"}</h2>
          <form onSubmit={handleSubmit}>
            <MDBRow>
              {!isLogin && (
                <MDBCol col="12">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </MDBCol>
              )}
              <MDBCol col="12">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol col="12">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </MDBCol>
            </MDBRow>
            <MDBBtn className="w-100 mb-4" size="md" type="submit">
              {isLogin ? "Login" : "Signup"}
            </MDBBtn>
            <button type="button" className="btn btn-link" onClick={toggleForm}>
              {isLogin
                ? "Need to create an account?"
                : "Already have an account?"}
            </button>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Auth;
