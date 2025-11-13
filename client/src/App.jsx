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
  //user is for dropdown in navbar
  const [user, setUser] = useState(null);
  //searching products 
  const[searchQuery,setSearchQuery] = useState("")


  //perfect example for prodrilling is searchbar the Navbar is mediator element 
  //step1: pass searchQuery is passed as a prop to Home Component after updating searchQuery to setSerchQuery
  //step2: updated searchQuery or setSearchQuery is passed to Search Component
  //here navbar have no funtion with SearchQuery its only role is to pass it to Search component
  //This step — where data is passed through a middle component just to reach a child — is what we call prop drilling.

  return (
    <>
      <BrowserRouter>
        <NavBar user={user} setUser={setUser} onSearch={setSearchQuery}/>
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery}/>} />
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
