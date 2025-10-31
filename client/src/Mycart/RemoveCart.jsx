import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

function RemoveCart({ productId,onAlert,isCarted }) {
  const [rmcart, SetRmCart] = useState();
  const handleRemoveFromCart = async () => {
    const res = await fetch(
      `https://timexzone.onrender.com/cart/removefrm/${productId}`,
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const body = await res.json();

    if (body.message === "product removed from cart") {
      SetRmCart(body.cart || []);
      onAlert("product removed from cart","danger");
    }else{
        onAlert(body.message,"danger")
    }
  };
  return (
    <>
      <Button
        type="button"
        variant="light"
        onClick={handleRemoveFromCart}
        style={{ border: "none", background: "transparent" }}
      >
        <i
          className={`bi ${
             isCarted ? "bi-x-circle-fill text-danger" : "bi-x-circle"
          }`}
          style={{ fontSize: "1.5rem" }}
        />{" "}
      </Button>
    </>
  );
}

export default RemoveCart;
