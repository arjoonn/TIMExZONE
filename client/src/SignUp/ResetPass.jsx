import React from 'react'
import { useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'

function ResetPass() {
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertColor, setAlertColor] = useState('info')

    const { token } = useParams()
    const navigate = useNavigate()

    const handleAlert = (message, color) => {
        setAlertMessage(message)
        setAlertColor(color)
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('https://timexzone-server.onrender.com/user/reset-pass', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, password: newPassword })
            })
            const body = await res.json()

            if (res.ok) {
                handleAlert(data.message, 'info')
                setTimeout(() => handleAlert(''), 500)
            } else {
                handleAlert(data.message, 'dager')
                setTimeout(() => handleAlert(''), 500)
            }
        } catch (error) {
            console.log('password reset request failed', error)
        }
    }
    return (
        <div className="homeWrapper">
            {alertMessage && (
                <div className="alertContiner">
                    <Alert variant={alertColor}> {alertMessage}</Alert>
                </div>
            )}
            <div className="authContainer">
                <Form onSubmit={handleResetPassword} className="authForm">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Enter your New Password</Form.Label>
                        <Form.Control
                            type="password"
                            size="sm"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <button
                        type="submit"
                        className={`loginBtn ${password ? "active" : ""
                            }`}
                        disabled={!password}
                    >
                        confirm
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default ResetPass