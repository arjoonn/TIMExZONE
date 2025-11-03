import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import WishButton from "./wishlist/WishButton";
import "./Style/Home.css";
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate();
  const [watch, setWatch] = useState([]);
  //for filtering
  const [allProducts, setAllProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("success");
  const images = [
    "http://localhost:9000/pimages/add.jpg",
    "http://localhost:9000/pimages/Addfs.webp",
  ]
  const [currentIndex, setCurrectIndex] = useState(0)


  const fetchProducts = async() => {
    try {
      const res = await fetch("http://localhost:9000/product/products", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await res.json();
      setWatch(body.products || body);
      setAllProducts(body.products || body);
    } catch (error) {
      console.log("unable to fetch products", error);
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
    const interval = setInterval(() => {
      setCurrectIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1)
    }, 10000)
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="homeWrapper">
        {alertMessage && (
          <div className="alertContainer">
            <Alert variant={alertColor}>{alertMessage}</Alert>
          </div>
        )}
        <div className="add-container">
          <img src={images[currentIndex]}/>
        </div>
        <div className="homeContainer">
          <aside className="filterContainer">
            <div className="filterSidebar">
              <Filter allProducts={allProducts} setWatch={setWatch} />
            </div>
          </aside>
          <div className="productContainer">
            <Row>
              {watch.map((item, index) => (
                <Col key={index} xs={6} sm={6} md={4} className="mb-3">
                  <Card style={{ width: "18rem" }} className="productCard">
                    <Card.Img
                      variant="top"
                      src={`http://localhost:9000/${item.productImage[0]}`}
                      className="productImage"
                    />
                    <div className="cardInfoWrapper">
                      <div className="cardInfo">
                        <Card.Title className="homeTitle">
                          {item.title}
                        </Card.Title>
                        <Card.Text className="homeText">
                          ₹{item.price}
                        </Card.Text>
                      </div>
                      <Button
                        variant="primary"
                        className="viewBtn"
                        onClick={() => navigate(`/products/${item._id}`)}
                      >
                        View
                      </Button>
                    </div>
                    <div className="wishBtn">
                      <WishButton productId={item._id} onAlert={handleAlert} />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
