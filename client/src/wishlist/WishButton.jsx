import React from "react";
import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function WishButton({ productId, onAlert }) {
  const navigate = useNavigate();
  const [wishpr, setWishpr] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToWishlist = async () => {
    try {
      const res = await fetch(
        `https://timexzone-server.onrender.com/wishlist/add/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (res.status === 401) {
        navigate("/signin", { replace: true });
        return;
      }

      const wish = await res.json();

      if (wish.message === "product already in wishlist") {
        setIsWishlisted(true);
        onAlert("product already in wishlist", "danger")
        return;
      }
      if (wish.message === "product added to wishlist") {
        setWishpr(wish.wishlist || []);
        setIsWishlisted(true);
        onAlert('product added to wishlist', "info")
        return;
      }
    } catch (error) {
      console.log("error while adding product", error);
      onAlert("error while adding product", "danger")
    }
  };

  return (
    <>
      <div>
        <Button
          type="button"
          variant="light"
          onClick={handleAddToWishlist}
          style={{ border: "none", background: "transparent" }}
        >
          <i
            className={`bi ${isWishlisted ? "bi-heart-fill text-danger" : "bi-heart"
              }`}
            style={{ fontSize: "1.5rem" }}
          />{" "}
        </Button>
      </div>

    </>
  );
}

export default WishButton;
