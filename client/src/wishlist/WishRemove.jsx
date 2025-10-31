import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function WishRemove({ productId,OnAlert,isWishlisted }) {
  const [rmwish,setRmwish] = useState([])

  const handleRemove = async () => {
    const res = await fetch(
      `https://timexzone.onrender.com/wishlist/removefrm/${productId}`,
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const body = await res.json();
    if (body.message === "product removed from wishlist") {
      setRmwish(body.wishlist || [])
      OnAlert("Product removed from wishlist","warning");
    } else {
      OnAlert(body.message,"info");
    }
  };


  return (
    <>
      <Button
        type="button"
        variant="light"
        onClick={handleRemove}
        style={{ border: "none", background: "transparent" }}
      >
        <i
          className={`bi ${
            isWishlisted ? "bi-heart-fill text-danger" : "bi-heart"
          }`}
          style={{ fontSize: "1.5rem" }}
        />{" "}
      </Button>
    </>
  );
}

export default WishRemove;
