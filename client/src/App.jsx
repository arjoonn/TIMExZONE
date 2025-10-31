import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";

import Home from "./Home";
import NavBar from "./NavComponent/NavBar";
import Signup from "./SignUp/Signup";
import Signin from "./SignUp/Signin";
import Verify from "./SignUp/Verify";
import Cart from "./Mycart/Cart";
import Whishlist from "./wishlist/Whishlist";
import View from "./ViewW/View";
import Placeorder from "./BuyNow/Placeorder";
import ConfirmedOrder from "./ViewW/ConfirmedOrder";
import Footer from "./Footer";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <BrowserRouter>
        <NavBar user={user} setUser={setUser} />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/verify"
              element={<Verify user={user} setUser={setUser} />}
            />
            <Route path="/viewmycart" element={<Cart />} />
            <Route path="/products/:id" element={<View />} />
            <Route path="/viewwishlist" element={<Whishlist />} />
            <Route path="/placeorder" element={<Placeorder />} />
            <Route path="/confirmedorder" element={<ConfirmedOrder />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
