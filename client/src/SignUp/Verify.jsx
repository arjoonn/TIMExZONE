import React from "react";
import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OtpInput from 'react-otp-input'
import "../SignUp/Verify.css";

function Verify({ setUser }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("success");


  const handleSubmit = async (e) => {
    e.preventDefault();

    //retrive email from localstorage
    const email = localStorage.getItem("userEmail");

    try {
      const res = await fetch("https://timexzone.onrender.com/user/verify", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setAlertColor("success");
        setAlertMessage("verification success");
        setTimeout(() => {
          setAlertMessage("");
          navigate("/");
        }, 2000);
      } else {
        setAlertColor("danger");
        setAlertMessage("invalid otp or expired");
        setTimeout(() => setAlertMessage(""), 500);
      }
    } catch (error) {
      console.log(error);
      setAlertColor("warning");
      setAlertMessage("something went wrong!!");
      setTimeout(() => setAlertMessage(""), 500);
    }
  };
  return (
    <>
      <div className="mainContainer">
        {alertMessage && (
          <div className="alertContainer">
            <Alert variant={alertColor}>{alertMessage}</Alert>
          </div>
        )}
        <div className="verifyBox">
          <Form onSubmit={handleSubmit} className="verifyForm">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              isInputNum
              inputStyle="otpBox"
              containerStyle="otpContainer"
              renderInput={(props) => <input {...props} />}
            />
            <button className={`verifyBtn ${otp ? 'active':''}`} type="submit">
              verify
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Verify;
