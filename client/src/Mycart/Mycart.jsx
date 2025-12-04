import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Mycart({ OnAlert, productId }) {
    const [cartItem, setCartItem] = useState([])
    const navigate = useNavigate()
    const [addedToCart, setAddedToCart] = useState(false)

    useEffect(() => {
        const handleCartCheck = async () => {
            const res = await fetch('https://timexzone-server.onrender.com/cart/viewmycart', {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            const cartCheck = data.some(item => item.productId === productId)
            setAddedToCart(cartCheck)
        }
        handleCartCheck()
    }, [productId])

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
                setAddedToCart(true)
                OnAlert('product added to your cart', 'success')
            }
        } catch (error) {
            console.log('error while adding');
        }
    };
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", padding: "12px" }}>
                <Button type="button" variant="light" onClick={handleMycart} style={{}}>{addedToCart ? "Go to Cart" : "Add to Cart"}</Button>
            </div>
        </>
    );
}

export default Mycart;
