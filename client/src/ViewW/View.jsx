import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import WishButton from "../wishlist/WishButton";
import Mycart from "../Mycart/Mycart";
import "../ViewW/View.css";
import { Alert } from "react-bootstrap";

function View() {
  const [watch, setWatch] = useState({ productImage: [], services: [] });
  const [currentImg, setCurrentImg] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("success");
  const { id } = useParams();

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://localhost:9000/product/products/${id}`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await res.json();
      setWatch(body.watch);
    } catch (error) {
      console.log("no product found", error);
    }
  };

  const handleAlert = (message, variant) => {
    setAlertColor(variant);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 500);
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  return (
    <>
      <div className="mainContainer">
        {alertMessage && 
        <div className="alertContainer">
          <Alert variant={alertColor}>{alertMessage}</Alert>
        </div>}
        <div className="productViewContainer">
          <div className="viewTop">
            <div className="thumbnailColumn">
              {watch.productImage?.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:9000/${img}`}
                  alt={`thumb-${index}`}
                  className={`thumbnail ${
                    currentImg === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentImg(index)}
                />
              ))}
            </div>
            <div className="mainImageWrapper">
              {watch.productImage.length > 0 && (
                <img
                  src={`http://localhost:9000/${watch.productImage[currentImg]}`}
                  alt={watch.title}
                  className="mainImage"
                />
              )}
            </div>
          </div>
          <h1 className="productTitle">{watch.title}</h1>
          <div className="priceQuantity">
            <span className="price">₹{watch.price}</span>
            <span className="quantity">Quantity: {watch.quantity}</span>
          </div>
          <div className="services">
            {watch.services.map((service, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
                className="serviceItem"
              >
                <img
                  src={`http://localhost:9000/${service.icon}`}
                  alt={service.type}
                  width={20}
                  height={20}
                />
                <span>{service.type}</span>
              </div>
            ))}
          </div>
          <div className="buttonRow">
            <WishButton productId={watch._id} onAlert={handleAlert} />
            <Mycart productId={watch._id} OnAlert={handleAlert} />
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
