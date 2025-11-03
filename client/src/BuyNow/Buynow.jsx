import React from "react";
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function Buynow({ selectedItems }) {
  const navigate = useNavigate();
  console.log(selectedItems);

  const handleBuy = async () => {
    try {
      const res = await fetch("https://timexzone-server.onrender.com/cart/buynow", {
        credentials: "include",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: selectedItems }),
      });
      const body = await res.json();
      console.log("Buy now response:", body);
      if (body.order) {
        navigate("/placeorder", { state: { order: body.order } });
      }
    } catch (error) {
      console.log("product not found", error);
    }
  };
  return (
    <>
      <Button variant="light" onClick={handleBuy}>
        Buy Now
      </Button>
    </>
  );
}

export default Buynow;
