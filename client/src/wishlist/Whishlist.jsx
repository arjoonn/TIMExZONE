import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import Mycart from "../Mycart/Mycart";
import WishRemove from "./WishRemove";
import "../wishlist/Wishlist.css";

function Whishlist() {
  const [wish, setWish] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("success");
  const [isWishlisted, setIsWishlisted] = useState(true);

  const handleViewWishlist = async () => {
    const res = await fetch("https://timexzone-server.onrender.com/wishlist/viewwishlist", {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();
    setWish(body);
  };

  const handleAlert = (message, variant) => {
    setAlertMessage(message);
    setAlertColor(variant);
    //to immediately remove from the wishlist
    handleViewWishlist()
    setTimeout(() => {
      setAlertMessage("");
    }, 500);
  };

  useEffect(() => {
    handleViewWishlist();
  }, []);

  return (
    <>
      <div className="homeWrapper">
        {alertMessage && (
          <div className="alertContainer">
            <Alert variant={alertColor}>{alertMessage}</Alert>
          </div>
        )}

        {wish.length > 0 && (
          <div className="wishContainer">
            {wish.map((item, index) => (
              <div key={index} className="wishCard">
                <div className="imageContainer">
                  <img
                    src={`https://timexzone-server.onrender.com/${item.productImage[0]}`}
                    className="wishImage"
                    alt={item.title}
                  />
                  <div className="removeWish">
                    <WishRemove productId={item._id} OnAlert={handleAlert} isWishlisted={true} />
                  </div>
                </div>
                <div className="wishInfoWrapper">
                  <div className="wishInfo">
                    <h5 className="wishTitle">{item.title}</h5>
                    <h6 className="wishPrice">₹{item.price}</h6>
                  </div>
                  <div className="mycartAction">
                    <Mycart productId={item._id} OnAlert={handleAlert} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!wish.length && (
          <div className="empty-wish">
            <h5>EMPTY !!</h5>
          </div>
        )}
      </div>
    </>
  );
}
export default Whishlist;
