import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Alert } from "react-bootstrap";

import Buynow from "../BuyNow/Buynow";
import RemoveCart from "./RemoveCart";
import "../Mycart/Cart.css";

function Cart() {
  const [viewCart, setViewCart] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("success");
  const [selectedItem, setSelectedItem] = useState([]);
  const [isCarted, SetIsCarted] = useState(true);

  const handleViewCart = async () => {
    try {
      const res = await fetch("https://timexzone.onrender.com/cart/viewmycart", {
        credentials: "include",
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await res.json();
      setViewCart(body);

      //to remove the item from selectedItem when cart item is removed
      setSelectedItem((prevSelected) => (
        prevSelected.filter((selectedItem) => body.some((cartItem) => cartItem.productId === selectedItem.productId))
      ))
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const handleAlert = (message, color) => {
    setAlertMessage(message);
    setAlertColor(color);
    //when a product is removed ,to uncheck the product or refresh the cart page
    handleViewCart()
    setTimeout(() => setAlertMessage(""), 500);
  };

  const handleSelectedItems = (item, checked) => {
    if (checked) {
      setSelectedItem((prev) => [...prev, item]);
    } else {
      setSelectedItem((prev) =>
        prev.filter((i) => i.productId !== item.productId)
      );
    }
  };

  const totalPrice = selectedItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    handleViewCart();
  }, []);

  const handleQuantityUpdate = async (productId, Qnty) => {
    const res = await fetch(`https://timexzone.onrender.com/cart/mycart/${productId}`, {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: Qnty }),
    });
    await res.json();
    handleViewCart();
  };

  return (
    <>
      <div className="homeWrapper">
        <div className="mainCartContainer">
          {alertMessage && (
            <div className="alertContainer">
              <Alert variant={alertColor}>{alertMessage}</Alert>
            </div>
          )}

          {viewCart.length > 0 && (
            <div className="cartContainer">
              <div className="leftcartContaiiner">
                {viewCart.map((item, index) => {
                  const isChecked = selectedItem.some(
                    (i) => i.productId === item.productId
                  );
                  return (
                    <div className="cartItem" key={index}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleSelectedItems(item, e.target.checked)}
                      />
                      <div className="cartHead">
                        <div className="cartImg">
                          {item.productImage?.map((img, i) => (
                            <img
                              key={i}
                              src={`https://timexzone.onrender.com/${img}`}
                              alt={item.title}
                              width="120"
                            />
                          ))}
                        </div>

                        <div className="rmCartBtn">
                          <RemoveCart
                            productId={item.productId}
                            onAlert={handleAlert}
                            isCarted={true}
                          />
                        </div>
                      </div>

                      <div className="titleItem">{item.title}</div>
                      <div className="cartInfo">
                        <span className="cartPrice">₹{item.price}</span>
                        <DropdownButton
                          id="dropdown-basic-button"
                          title={`Qty: ${item.quantity || 1}`}
                          size="sm"
                          variant="secondary"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((qty) => (
                            <Dropdown.Item
                              key={qty}
                              onClick={() =>
                                handleQuantityUpdate(item.productId, qty)
                              }
                            >
                              {qty}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT SIDE - SELECTED ITEMS SUMMARY */}
              <div className="rightSideCard">
                <h2>Selected Item's</h2>
                {selectedItem.length === 0 ? (
                  <p>No item Selected</p>
                ) : (
                  <div className="selected-items-list">
                    {selectedItem.map((item, index) => (
                      <div className="cardTotal" key={index}>
                        <p className="titleRigt">Item : {item.title}</p>
                        <div className="item-details">
                          <span className="totalQnty">Quantity : {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                    <div className="totalPrice">
                      <p>Total Amount : ₹{totalPrice}</p>
                      <Buynow selectedItems={selectedItem} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {!viewCart.length && (
          <div className="empty-cart">
            <h5>EMPTY CART <i className="fas fa-shopping-cart"></i></h5>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
