import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import '../ViewW/ConfirmedOrder.css'

function ConfirmedOrder() {
  const [confirm, setConfirm] = useState([]);
  const handleConfirmOrders = async () => {
    const res = await fetch("http://localhost:9000/pay/confirmedorder", {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();
    setConfirm(body.orderDetails || []);
    console.log(body.orderDetails);
  };

  useEffect(() => {
    handleConfirmOrders();
  }, []);

  return (
    <>
      <div className="order-container">
        {confirm.length > 0 ? (
          confirm.map((item, index) => (
            <div className="order-card" key={index}>
              <div key={index} className="order-image">
             {item.products?.[0]?.productId.productImage?.[0] &&(
              <img src={`http://localhost:9000/${item.products[0].productId.productImage[0]}`}
              alt={item.title}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
             )}
              </div>
               <div className="order-details">
              
              <h3>{item.products?.[0]?.productId.title}</h3>
              <p>your Order ID : {item.orderId}</p>
              <p>Status : {item.status}</p>
            </div>
            </div>
          ))
        ) : (
          <h2>No confirmed orders</h2>
        )}
      </div>
    </>
  );
}

export default ConfirmedOrder;
