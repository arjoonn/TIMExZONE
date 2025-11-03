import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Mycart({ OnAlert, productId }) {
    const [cartItem, setCartItem] = useState([])
    const navigate = useNavigate()

    const handleMycart = async () => {
        try {
            const res = await fetch(`https://timexzone-server.onrender.com/cart/mycart/${productId}`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
            })

            if (res.status === 401) {
                navigate('/signin', { replace: true })
            }

            const data = await res.json()

            if (data.message == 'product already in cart') {
                OnAlert(data.message, 'danger')
            } else {
                setCartItem(data.cart || [])
                OnAlert('product added to your cart', 'success')
            }
        } catch (error) {
            console.log('error while adding');
        }
    };
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", padding: "12px" }}>
                <Button type="button" variant="light" onClick={handleMycart} style={{}}>Add to Cart</Button>
            </div>
        </>
    );
}

export default Mycart;
