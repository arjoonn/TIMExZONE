import React from 'react'
import { useState } from 'react'
import { Form,Alert } from 'react-bootstrap'

function ForgotPass() {
    const [email, setEmail] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertColor, setAlertColor] = useState('info')

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        const res = await fetch("https://timexzone-server.onrender.com/user/forgot-password", {
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        const data = await res.json()

        if (res.ok) {
            handleAlert(data.message, 'info')
            setTimeout(() => handleAlert(""), 500)
        } else {
            handleAlert(data.message, 'danger')
            setTimeout(() => handleAlert(""), 500)
        }
    }

    const handleAlert = (message, color) => {
        setAlertMessage(message)
        setAlertColor(color)
    }

    return (
        <>
            <div className='homeWrapper'>
                {alertMessage && (
                    <div className="alertContiner">
                        <Alert variant={alertColor}> {alertMessage}</Alert>
                    </div>
                )}
                <div className="authContainer">
                    <Form onSubmit={handleForgotPassword} className="authForm">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Enter your email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                size="sm"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <button
                            type="submit"
                            className={`loginBtn ${email ? "active" : ""
                                }`}
                            disabled={!email}
                        >
                            Continue
                        </button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ForgotPass 