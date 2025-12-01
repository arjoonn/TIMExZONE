import React from "react";
import { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../SignUp/Style.css";

function Signup() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!emailFormat.test(formData.email)){
      setAlertMessage('Not a valid format!')
      setTimeout(()=>setAlertMessage(''),500)
      return;
    }

    try {
      const res = await fetch("https://timexzone-server.onrender.com/user/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json()

      if (res.ok) {
        setAlertMessage(data.message,"info")
        localStorage.setItem("userEmail",formData.email)
        setTimeout(() => { setAlertMessage(""), navigate("/verify") }, 500);
        return;
      } else {
        setAlertMessage(data.message,"danger");
        setTimeout(() => setAlertMessage(""), 500);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("OOPS!! submission failed");
      setTimeout(() => setAlertMessage(""), 500);
    }
  };

  return (
    <>
      <div className="homeWrapper">
        {alertMessage && (
          <div className="alertContainer">
            <Alert variant="warning">{alertMessage}</Alert>
          </div>
        )}
        <div className="authContainer">
          <Form onSubmit={handleSubmit} className="authForm">
            <h2 className="text-center mb-4">Register</h2>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                size="sm"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                size="sm"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Create Password</Form.Label>
              <Form.Control
                type="Password"
                size="sm"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <button
              type="submit"
              className={`loginBtn ${
                formData.email && formData.password ? "active" : ""
              }`}
              disabled={!formData.email || !formData.password}
            >
              Create Account
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Signup;
