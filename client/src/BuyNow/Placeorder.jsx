import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap"
import "../BuyNow/Buynow.css";

function Placeorder() {
  const [address, setAddress] = useState("");
  const [color, setColor] = useState("")
  const [alert, setAlert] = useState("")
  const location = useLocation();
  const { order } = location.state || {};

  const handleAlert = (message, color) => {
    setAlert(message)
    setColor(color)
    setTimeout(() => {
      setAlert("")
    }, 2000)
  }

  const handleBuyNow = async () => {
    if (!address) {
      handleAlert("address required", "danger");
      return;
    }
    
    try {
      const res = await fetch("http://localhost:9000/pay/placeorder", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: order.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          amount: order.totalPrice,
          address,
        }),
      });

      const { razorpayOrder } = await res.json();
      console.log("Place order response:", razorpayOrder);
      if (!razorpayOrder?.id) {
        handleAlert("order creation failed", "danger");
      }

      const options = {
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "TimexZone",
        description: "Payment for product",
        order_id: razorpayOrder.id, // very important
        handler: async function (response) {
          // 3. Verify payment on backend
          await verifyPayment(response);
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const verifyPayment = async (paymentResponse) => {
    try {
      const res = await fetch("http://localhost:9000/pay/verifypayment", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentResponse),
      });
      const data = await res.json();
      if (data.order?.status === "SUCCESS") {
        handleAlert("Payment successful! Order confirmed.", "info");
      } else {
        handleAlert("Payment failed. Please try again.", "warning");
      }
    } catch (error) {
      console.error("Verification error:", error);
      handleAlert("Payment verification failed", "danger");
    }
  };
  return (
    <>
      {alert && (
        <div className="alertContainer">
          <Alert variant={color}>{alert}</Alert>
        </div>
      )}
      <div className="order-container">
        <div className="order-products">
          {order?.items.map((item, index) => (
            <div className="order-item" key={index}>
              <div>
                <img
                  src={`http://localhost:9000/${item.productImage[0]}`}
                  alt={order.title}
                  className="order-img"
                />
              </div>
              <div className="order-info">
                <h3 className="order-title">{item.title}</h3>
                <p className="order-price">Price : <span className="order-value">₹{item.price}</span></p>
                <p className="order-qty">Quantity : <span className="order-value">{item.quantity}</span></p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h3 className="order-total">Total: ₹{order?.totalPrice}</h3>
          <textarea
            className="order-address"
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="order-actions">
            <button className="order-btn" onClick={handleBuyNow}>
              pay now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Placeorder;
