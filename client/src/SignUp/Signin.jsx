import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../SignUp/Style.css";

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [variantColor, setVariantColor] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAlert =(message,variant)=>{
    setAlertMessage(message)
    setVariantColor(variant)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://timexzone-server.onrender.com/user/signin", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const body = await res.json()
        handleAlert(body.message,"info")
        localStorage.setItem("userEmail", formData.email);
        navigate("/verify")
        setTimeout(() => {handleAlert("")}, 500);
      } else {
        handleAlert("invalid credentials ❌","danger");
        setTimeout(() => handleAlert(""), 500);
      }
    } catch (error) {
      console.log(error);
      handleAlert("Something went wrong. Try again later","danger");
      setTimeout(() => handleAlert(""), 500);
    }
  };

  return (
    <>
      <div className="homeWrapper">
        {alertMessage && (
          <div className="alertContiner">
            <Alert variant={variantColor}> {alertMessage}</Alert>
          </div>
        )}
        <div className="authContainer">
          <Form onSubmit={handleSubmit} className="authForm">
            <h2 className="text-center mb-4">Login</h2>
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
              <Form.Label>Password</Form.Label>
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
              className={`loginBtn ${formData.email && formData.password ? "active" : ""
                }`}
              disabled={!formData.email || !formData.password}
            >
              Login
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Signin;
