import React from "react";
import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function WishButton({ productId,onAlert }) {
  const navigate = useNavigate();
  const [wishpr, setWishpr] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const handleAddToWishlist = async () => {
    try {
      const res = await fetch(
        `http://localhost:9000/wishlist/add/${productId}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      const wish = await res.json();

      if (wish.message === "Login required") {
        navigate("/signin");
        setWishpr(wish.wishlist || []);
        setIsWishlisted(true);
        return;
      }
      if (wish.message === "product already in wishlist") {
        setIsWishlisted(true);
        onAlert("product already in wishlist","danger")
        return;
      }
      if (wish.message === "product added to wishlist") {
        setWishpr(wish.wishlist || []);
        setIsWishlisted(true);
        onAlert('product added to wishlist',"info")
        return;
      }
    } catch (error) {
      console.log("error while adding product", error);
      onAlert("error while adding product","danger")
    }
  };

  return (
    <>
      <div>
        <Button
          type="button"
          variant="light"
          onClick={() => handleAddToWishlist(productId)}
          style={{ border: "none", background: "transparent" }}
        >
          <i
            className={`bi ${
              isWishlisted ? "bi-heart-fill text-danger" : "bi-heart"
            }`}
            style={{ fontSize: "1.5rem" }}
          />{" "}
        </Button>
      </div>
        
    </>
  );
}

export default WishButton;
